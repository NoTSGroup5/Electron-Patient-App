<template>
    <div>
        <div class="row">
            <div class="col-sm-9" v-if="patient.firstName != null">
                <h2>Dossier {{patient.firstName}} {{patient.lastName}}</h2>

                <div>
                    <h4>Doktersbezoeken</h4>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Organisatie</th>
                            <th>Datum bezoek</th>
                            <th>Beschrijving</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-show="medicalFile.visits.length === 0">
                            <td colspan="3">Geen doktersbezoeken gevonden.</td>
                        </tr>
                        <Visit v-for="visit in medicalFile.visits" :visit="visit"></Visit>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h4>Allergieën</h4>

                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Allergie</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-show="medicalFile.allergies.length === 0">
                            <td colspan="1">Geen allergieën gevonden.</td>
                        </tr>
                        <Allergy v-for="allergy in medicalFile.allergies" :allergy="allergy"></Allergy>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h4>Medicatie</h4>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Medicijn</th>
                            <th>Inname op moment</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-show="medicalFile.medicine.length === 0">
                            <td colspan="2">Geen medicatie gevonden.</td>
                        </tr>
                        <Medicine v-for="medicine in medicalFile.medicine" :medicine="medicine"  @showDescription="showDescription"></Medicine>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h4>Behandelingen</h4>

                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Behandeling</th>
                            <th>Datum vn -tot</th>
                            <th>Bewerken</th>
                            <th>Logs</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-show="medicalFile.treatments.length === 0">
                            <td colspan="4">Geen behandelingen gevonden.</td>
                        </tr>
                        <Treatment v-for="treatment in medicalFile.treatments" :treatment="treatment" @showLogs="showLogs"></Treatment>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div id="showDescription" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Medicatie beschrijving</h4>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Reden</th>
                                <th>Dosering</th>
                            </tr>
                            </thead>
                            <tbody>
                            <MedDescription :medicine="activeMedicine"></MedDescription>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div id="ShowLogs" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Behandeling logs van {{activeTreatment.description}}</h4>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>Datum en tijd</th>
                                <th>beschrijving</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-show="activeTreatment.logs.length === 0">
                                <td colspan="2">Geen logs gevonden.</td>
                            </tr>
                            <Log v-for="log in activeTreatment.logs" :log="log"></Log>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
    import Vue from 'vue'

    import BootstrapTextInput from '../Shared/Bootstrap/BootstrapTextInput';
    import BootstrapSelectInput from '../Shared/Bootstrap/BootstrapSelectInput';
    import AddMedicine from './Medication/AddMedication'

    import HttpPatientsService from '../../../services/httpPatientsService';
    import HttpMedicalFileService from '../../../services/httpMedicalFileService';
    import HttpOrganisationService from '../../../services/httpOrganisationService';

    import Treatment from './Dossier/Treatment';
    import Allergy from './Dossier/Allergy';
    import Visit from './Dossier/Visit';
    import Medicine from './Dossier/Medicine';
    import Log from './Dossier/Log'
    import MedDescription from './Dossier/MedicationDescription'

    let httpMedicalFileService = new HttpMedicalFileService();
    let httpPatientService = new HttpPatientsService();
    let httpOrganisationService = new HttpOrganisationService();

    export default {
        components: {
            BootstrapTextInput,
            BootstrapSelectInput,
            Treatment,
            Allergy,
            Visit,
            Medicine,
            AddMedicine,
            Log,
            MedDescription
        },
        data () {
            return {
                patient : {},
                medicalFile: {
                    visits: [],
                    allergies : [],
                    medicine : [],
                    treatments : []
                },
                treatmentInfo: {
                    description : "",
                    startDate: new Date().getTime()
                },
                activeTreatment: {
                    description: "",
                    logs: []
                },
                activeMedicine: {
                    name: "",
                    reason: "",
                    dosage: ""
                }
            }
        },
        created() {
            let medicalFile = {};

            httpPatientService.fetch().then((patient) => {
                this.patient = patient;
            });

            httpMedicalFileService.getMedicalFile().then((pMedicalFile) => {
                medicalFile = pMedicalFile;

                return this.getVisitsWithOrganisation(medicalFile);
            }).then(visits => {
                medicalFile.visits = visits;

                this.medicalFile = medicalFile;
            });
        },
        methods : {
            getVisitsWithOrganisation(medicalFile){
                return Promise.all(medicalFile.visits.map((visit) => {
                    return httpOrganisationService.getById(this.getIdFromReference(visit.organisation)).then(organisation => {
                        let newVisit = Object.assign({}, visit);
                        newVisit.organisation = organisation;

                        return newVisit;
                    });
                }));
            },
            getIdFromReference(reference){
                let index = reference.lastIndexOf('#');

                return reference.substr(index + 1, reference.length - index + 1);
            },
            showDescription(medicine){
                this.activeMedicine.name = medicine.name;
                this.activeMedicine.reason = medicine.reason;
                this.activeMedicine.dosage = medicine.dosage;
                $("#showDescription").modal();
            },
            showLogs(treatment){
                this.activeTreatment.description = treatment.description;
                this.activeTreatment.logs = treatment.logs;
                $("#ShowLogs").modal();
            }
        }
    }
</script>
