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
                            <th>Locatie</th>
                            <th>Onderwerp</th>
                            <th>Datum</th>
                        </tr>
                        </thead>
                        <tbody>
                        <Visit v-for="visit in medicalFile.visits" :visit="visit"></Visit>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h4>Allergieen</h4>

                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Allergie</th>
                        </tr>
                        </thead>
                        <tbody>
                        <Allergy v-for="allergy in medicalFile.allergies" :allergy="allergy"
                                 @remove="removeAllergy"></Allergy>
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
                        </tr>
                        </thead>
                        <tbody>
                        <Medicine v-for="medicine in medicalFile.medication" :medicine="medicine"></Medicine>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h4>Behandelingen  </h4>

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
                        <Treatment v-for="treatment in medicalFile.treatments" :treatment="treatment"></Treatment>
                        </tbody>
                    </table>
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

    import Treatment from './Dossier/Treatment';
    import Allergy from './Dossier/Allergy';
    import Visit from './Dossier/Visit';
    import Medicine from './Dossier/Medicine';

    export default {
        components: {
            BootstrapTextInput,
            BootstrapSelectInput,
            Treatment,
            Allergy,
            Visit,
            Medicine,
            AddMedicine
        },

        data () {
            return {
                patient : {},
                medicalFile: {
                    visits: [],
                    allergies : [],
                    medication : [],
                    treatments : []
                }
            }
        },

        created: function () {
            let httpMedicalFileService = new HttpMedicalFileService();
            let httpPatientService = new HttpPatientsService();

            httpPatientService.fetch().then((patient) => {
                this.patient = patient;
            }).catch(console.error);

            httpMedicalFileService.getMedicalFile().then((medicalFile) => {
                this.medicalFile = medicalFile;
            });
        }
    }
</script>
