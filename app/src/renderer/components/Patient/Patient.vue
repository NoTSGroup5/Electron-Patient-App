<template>
    <div>
        <div class="row">
            <div class="col-xs-6 form-group">

                <form @submit.prevent="validateForm()">

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="patientscreate-first_name" class="control-label required">Naam </label>
                                <input  v-model="model.firstName" name="first_name" class="form-control" id="patientscreate-first_name">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="name_prefix" class="control-label">Tussenvoegsel</label>
                                <input  v-model="model.namePrefix" name="name_prefix" class="form-control" id="name_prefix">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="name_prefix" class="control-label required">Achternaam</label>
                                <input  v-model="model.lastName" name="last_name" class="form-control" id="last_name">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="patientscreate-birthday-day" class="control-label required">Dag</label>
                                <select  v-model="model.birthday.day" id="patientscreate-birthday-day" name="birthday_day" class="form-control">
                                    <option hidden value="" selected>Kies een dag</option>
                                    <option v-for="day in getDays()" :value="day">{{day}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="patientscreate-birthday_month" class="control-label required">Maand</label>
                                <select  v-model="model.birthday.month" id="patientscreate-birthday_month" name="birthday_month" class="form-control">
                                    <option hidden value="" selected>Kies een maand</option>
                                    <option v-for="month in getMonths()" :value="month.id">{{month.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="patientscreate-birthday_year" class="control-label required">Jaar</label>
                                <select  v-model="model.birthday.year" id="patientscreate-birthday_year" name="birthday_year" class="form-control">
                                    <option hidden value="" selected>Kies een jaar</option>
                                    <option v-for="year in getYears()" :value="year">{{year}}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="form-group" :class="{'has-error': errors.has('gender') }">
                        <label for="patientscreate-gender" class="control-label required">Geslacht</label>
                        <select  v-model="model.gender" name="gender" id="patientscreate-gender" class="form-control">
                            <option hidden value="" selected>Kies een geslacht</option>
                            <option v-for="gender in getGenders()" :value="gender">{{gender}}</option>
                        </select>
                    </div>

                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="patientcreate-street" class="control-label required">Straatnaam</label>
                                <input  v-model="model.street" name="street" class="form-control" id="patientcreate-street">
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label for="patientcreate-street_number" class="control-label required">Huisnummer</label>
                                <input  v-model="model.houseNumber" name="street_number" class="form-control" id="patientcreate-street_number">
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label for="patientcreate-street_number_extra" class="control-label">Toevoeging</label>
                                <input  v-model="model.houseNumberExtra" name="street_number_extra" class="form-control" id="patientcreate-street_number_extra">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="patientcreate-zip_code" class="control-label required">Postcode</label>
                        <input  v-model="model.zipCode" name="zip_code" class="form-control" id="patientcreate-zip_code">
                    </div>

                    <div class="form-group">
                        <label for="patientcreate-residence" class="control-label required">Woonplaats</label>
                        <input  v-model="model.city" name="residence" class="form-control" id="patientcreate-residence">
                    </div>

                    <div class="form-group">
                        <label for="patientcreate-telephone_number" class="control-label required">Telefoonnummer</label>
                        <input  v-model="model.telephoneNumber" name="telephone_number" class="form-control" id="patientcreate-telephone_number">
                    </div>

                    <div class="form-group">
                        <label for="patientcreate-email" class="control-label required">Email</label>
                        <input  v-model="model.email" name="email" class="form-control" id="patientcreate-email">
                    </div>

                    <button type="submit" class="btn btn-default">Gegevens opslaan</button>
                </form>
            </div>

            <div class="col-xs-6 form-group">
                <label>Mentoren</label>
                <div>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>BSN</th>
                            <th>Naam</th>
                            <th>
                                <span class="glyphicon glyphicon-plus pull-right" type="button" data-toggle="modal"
                                      data-target="#addMentorModal"></span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-show="mentors.length === 0">
                            <td colspan="2">Geen mentoren gevonden.</td>
                        </tr>
                        <tr v-for="mentor in mentors">
                            <td>{{ mentor.bsn }}</td>
                            <td>{{ getFullName(mentor) }}</td>
                            <td><span @click="removeMentor(mentor)" class="glyphicon glyphicon-remove pull-right"></span></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <label>Organisaties</label>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Locatie</th>
                        <th>
                            <span class="glyphicon glyphicon-plus pull-right" type="button" data-toggle="modal"
                                  data-target="#organisatietoevoegen"> </span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-show="organisations.length === 0">
                        <td colspan="2">Geen organisaties gevonden.</td>
                    </tr>
                    <tr v-for="organisation in organisations">
                        <td>{{organisation.name}}</td>
                        <td>{{getOrganisationLocation(organisation)}}</td>
                        <td><span @click="removeOrganisation(organisation)" class="glyphicon glyphicon-remove pull-right"></span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="addMentorModal" class="modal fade" role="dialog">
            <div class="modal-dialog" role="document">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Mentoren toevoegen</h4>
                    </div>

                    <div class="modal-body">
                        <div>
                            <div class="input-group">
                                <input v-model="searchMentorInput" type="text" class="form-control" placeholder="Zoek mentor...">
                                <span class="input-group-btn">
                                    <button class="btn btn-default" type="button" v-on:click="findMentor(searchMentorInput)">Zoek</button>
                                </span>
                            </div>

                            <table class="table" id="table">
                                <thead>
                                <tr>
                                    <th>BSN</th>
                                    <th>Naam</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{{ mentor.bsn }}</td>
                                    <td>{{ mentor.name }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="addMentor()">
                            Toevoegen
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div id="organisatietoevoegen" class="modal fade" role="dialog">
            <div class="modal-dialog" role="document">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Organisatie toevoegen</h4>
                    </div>

                    <div class="modal-body">
                        <div>
                            <div class="input-group">
                                <input v-model="searchOrganisationInput" type="text" class="form-control"
                                       placeholder="Zoek organisatie op naam...">
                                <span class="input-group-btn">
                                    <button class="btn btn-default" type="button"
                                            v-on:click="findOrganization(searchOrganisationInput)">Zoek</button>
                                </span>
                            </div>

                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Naam</th>
                                    <th>Locatie</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="organisation in searchOrganisations">
                                    <td> {{organisation.name}}</td>
                                    <td> {{organisation.city}} </td>
                                    <td><button class="btn btn-default" type="button" data-dismiss="modal" v-on:click="addOrganisation(organisation)">Toevoegen</button></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import _ from 'lodash'
    import BootstrapTextInput from '../Shared/Bootstrap/BootstrapTextInput'
    import BootstrapSelectInput from '../Shared/Bootstrap/BootstrapSelectInput'
    import MentorToevoegenModal from './Mentor/MentorsOverview/MentorToevoegenModal'
    import BootstrapModal from '../Shared/Bootstrap/BootstrapModal'

    import HttpPatientsService from '../../../services/httpPatientsService'
    import HttpMedicalFileService from '../../../services/httpMedicalFileService'
    import HttpOrganisationService from '../../../services/httpOrganisationService'

    let httpPatientService = new HttpPatientsService();
    let httpMedicalService = new HttpMedicalFileService();
    let httpOrganisationService = new HttpOrganisationService();

    export default {
        components: {
            BootstrapTextInput,
            MentorToevoegenModal,
            BootstrapSelectInput,
            BootstrapModal
        },

        data ()  {
            return {
                searchMentorInput: "",
                searchOrganisationInput : "",
                mentor: {
                    bsn: "",
                    name: "",
                },
                mentors : [],
                organisations : [],
                searchOrganisations : [],
                medicalFile : {
                    organisations : [],
                    mentors : []
                },
                model: {
                    bsn: "",
                    gender: "",
                    firstName: "",
                    namePrefix: "",
                    lastName: "",
                    street: "",
                    houseNumber: "",
                    houseNumberExtra: "",
                    zipCode: "",
                    city: "",
                    telephoneNumber: "",
                    email: "",
                    birthday: {
                        day: "",
                        month: "",
                        year: ""
                    },
                    mentors : [],
                    organisations : []
                }
            }
        },

        created: function () {
            let account = JSON.parse(localStorage.getItem("account"));

            this.loadPatient(account);

            this.getMedicalFile(account).then((medicalFile) => {
                this.medicalFile = medicalFile;
                return Promise.all([this.loadMentors(medicalFile), this.loadOrganisations(medicalFile)]);
            }).catch(() => {
                alert('An error occurred while loading data from the patient.');
            });
        },
        methods: {
            addOrganisation(organisation)
            {
                if (_.findIndex(this.organisations, {id : organisation.id}) === -1) {
                    this.organisations.push(organisation);
                    this.medicalFile.organisations.push("resource:nl.epd.blockchain.Organisation#" + organisation.id);
                    this.searchOrganisationInput = "";
                }
                else {
                    alert('Organisatie is al toegevoegd');
                }

                $('#organisatietoevoegen').modal('hide')

            },
            removeMentor(mentor){
                let index = _.findIndex(this.mentors, {
                    bsn : mentor.bsn
                });

                this.mentors.splice(index, 1);
                this.medicalFile.mentors.splice(index, 1);
            },
            removeOrganisation(organisation){
                let index = _.findIndex(this.organisations, {
                    id : organisation.id
                });

                this.organisations.splice(index, 1);
                this.medicalFile.organisations.splice(index, 1);
            },
            findOrganization(name)
            {
                httpOrganisationService.findByName(name).then(response => {
                    this.searchOrganisations = response;
                }).catch(e => {
                    console.log(e);
                });
            },
            findMentor(bsn){
                if (bsn !== "") {
                    httpPatientService.getPatientbyBsn(bsn).then(response => {
                        if (response.bsn !== this.model.bsn) {
                            this.mentor.bsn = response.bsn;
                            this.mentor.name = this.getFullName(response);
                        }
                        else {
                            alert('U kunt niet uzelf toevoegen.');
                        }
                    }).catch(e => {
                        console.log(e);
                        alert("Geen patient gevonden met de gegeven BSN.");
                    })
                }
                else {
                    alert("Voer een BSN nummer in.")
                }
            },
            validateForm(){
                this.$validator.validateAll().then(() => {
                    delete this.medicalFile.bsn;

                    Promise.all([
                        httpMedicalService.saveMedicalFile(this.model.bsn, this.medicalFile),
                        httpPatientService.updatePatient(this.model.bsn, this.model)
                    ]).catch(() => {
                        alert('An error occurred while updating the patient.')
                    });
                }).catch();
            },
            addMentor(){
                if (this.mentor.bsn !== "") {
                    httpPatientService.getPatientbyBsn(this.mentor.bsn).then(patient => {
                        this.medicalFile.mentors.push(`resource:nl.epd.blockchain.Patient#${patient.bsn}`);
                        this.mentors.push(patient)
                    });

                    this.mentor.bsn = "";
                    this.mentor.name = "";
                }
            },
            getOrganisationLocation(organisation){
                let address = organisation.street + ' ' + organisation.houseNumber;

                if(organisation.houseNumberExtra){
                    address += ' ' + organisation.houseNumberExtra;
                }

                address += ', ' + organisation.zipCode + ' ' + organisation.city;

                return address;
            },
            loadPatient(account){
                httpPatientService.getPatientbyBsn(account.bsn).then((response) => {
                    let birthday = new Date(response.birthday);
                    this.model = response;
                    this.model.birthday = {
                        day: birthday.getDate(),
                        month: birthday.getMonth(),
                        year: birthday.getFullYear()
                    };
                });
            },
            loadMentors(medicalFile) {
                return Promise.all(this.getPersons(medicalFile.mentors)).then((mentors) => {
                    this.mentors = mentors;
                });
            },
            loadOrganisations(medicalFile){
                return Promise.all(medicalFile.organisations.map((organisationReference) => {
                    return httpOrganisationService.getById(this.getIdFromResource(organisationReference));
                })).then((organisations) => {
                    this.organisations = organisations;
                });
            },
            getMedicalFile(account){
                return httpMedicalService.getMedicalFileByBsn(account.bsn)
            },
            getPersons(persons){
                return persons.map((personReference) => {
                    return httpPatientService.getPatientbyBsn(this.getIdFromResource(personReference));
                });
            },
            getIdFromResource(resourceReference){
                let bsnIndex = resourceReference.indexOf("#");
                return resourceReference.substr(bsnIndex + 1, resourceReference.length - bsnIndex + 1);
            },
            getFullName(person){
                let name = person.firstName;

                if(person.namePrefix){
                    name += " " + person.namePrefix;
                }

                name += " " + person.lastName;

                return name;
            },
            getGenders(){
                return ['Man', 'Vrouw', 'Apache Helicopter']
            },
            getYears(){
                let years = [];
                let yearNow = new Date().getFullYear();
                let yearTo = yearNow - 200;

                for (let year = yearNow; year >= yearTo; year--) {
                    years.push(year);
                }

                return years;
            },
            getDays: function () {
                let days = [];

                for (let day = 1; 31 >= day; day++) {
                    days.push(day);
                }

                return days;
            },
            getMonths(){
                return [
                    {
                        id: 0,
                        name: 'Januari'
                    },
                    {
                        id: 1,
                        name: 'Februari'
                    },
                    {
                        id: 2,
                        name: 'Maart'
                    },
                    {
                        id: 3,
                        name: 'April'
                    },
                    {
                        id: 4,
                        name: 'Mei'
                    },
                    {
                        id: 5,
                        name: 'Juni'
                    },
                    {
                        id: 6,
                        name: 'Juli'
                    },
                    {
                        id: 7,
                        name: 'Augustus'
                    },
                    {
                        id: 8,
                        name: 'September'
                    },
                    {
                        id: 9,
                        name: 'Oktober'
                    },
                    {
                        id: 10,
                        name: 'November'
                    },
                    {
                        id: 11,
                        name: 'December'
                    }
                ]
            },
            getTimeStamp(day, month, year){
                return new Date(year, month, day, 0, 0, 0, 0);
            }
        }
    }
</script>
