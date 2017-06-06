<template>
    <div>
        <div class="row">
            <div class="col-xs-6 form-group">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="patientscreate-first_name" class="control-label required">Naam </label>
                            <input disabled="disabled" v-model="model.firstName" name="first_name" class="form-control" id="patientscreate-first_name">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="name_prefix" class="control-label">Tussenvoegsel</label>
                            <input disabled="disabled" v-model="model.namePrefix" name="name_prefix" class="form-control" id="name_prefix">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="name_prefix" class="control-label required">Achternaam</label>
                            <input disabled="disabled" v-model="model.lastName" name="last_name" class="form-control" id="last_name">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="patientscreate-birthday-day" class="control-label required">Dag</label>
                            <select disabled="disabled" v-model="model.birthday.day" id="patientscreate-birthday-day" name="birthday_day" class="form-control">
                                <option hidden value="" selected>Kies een dag</option>
                                <option v-for="day in getDays()" :value="day">{{day}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="patientscreate-birthday_month" class="control-label required">Maand</label>
                            <select disabled="disabled" v-model="model.birthday.month" id="patientscreate-birthday_month" name="birthday_month" class="form-control">
                                <option hidden value="" selected>Kies een maand</option>
                                <option v-for="month in getMonths()" :value="month.id">{{month.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="patientscreate-birthday_year" class="control-label required">Jaar</label>
                            <select disabled="disabled" v-model="model.birthday.year" id="patientscreate-birthday_year" name="birthday_year" class="form-control">
                                <option hidden value="" selected>Kies een jaar</option>
                                <option v-for="year in getYears()" :value="year">{{year}}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="form-group" :class="{'has-error': errors.has('gender') }">
                    <label for="patientscreate-gender" class="control-label required">Geslacht</label>
                    <select disabled="disabled" v-model="model.gender" name="gender" id="patientscreate-gender" class="form-control">
                        <option hidden value="" selected>Kies een geslacht</option>
                        <option v-for="gender in getGenders()" :value="gender">{{gender}}</option>
                    </select>
                </div>

                <div class="row">
                    <div class="col-md-8">
                        <div class="form-group">
                            <label for="patientcreate-street" class="control-label required">Straatnaam</label>
                            <input disabled="disabled" v-model="model.streetName" name="street" class="form-control" id="patientcreate-street">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="patientcreate-street_number" class="control-label required">Huisnummer</label>
                            <input disabled="disabled" v-model="model.streetNumber" name="street_number" class="form-control" id="patientcreate-street_number">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="patientcreate-street_number_extra" class="control-label">Toevoeging</label>
                            <input disabled="disabled" v-model="model.streetNumberExtra" name="street_number_extra" class="form-control" id="patientcreate-street_number_extra">
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="patientcreate-zip_code" class="control-label required">Postcode</label>
                    <input disabled="disabled" v-model="model.zipCode" name="zip_code" class="form-control" id="patientcreate-zip_code">
                </div>

                <div class="form-group">
                    <label for="patientcreate-residence" class="control-label required">Woonplaats</label>
                    <input disabled="disabled" v-model="model.residence" name="residence" class="form-control" id="patientcreate-residence">
                </div>

                <div class="form-group">
                    <label for="patientcreate-telephone_number" class="control-label required">Telefoonnummer</label>
                    <input disabled="disabled" v-model="model.telephoneNumber" name="telephone_number" class="form-control" id="patientcreate-telephone_number">
                </div>

                <div class="form-group">
                    <label for="patientcreate-email" class="control-label required">Email</label>
                    <input disabled="disabled" v-model="model.email" name="email" class="form-control" id="patientcreate-email">
                </div>
            </div>

            <div class="col-xs-6 form-group">
                <label>Mentoren</label>
                <div>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>BSN</th>
                            <th>Naam</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="person in model.mentors">
                            <td>{{person.bsn}}</td>
                            <td>{{getFullName(person)}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <label>Organisaties</label>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>Naam organisatie</th>
                        <th>Locatie</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="organisation in model.organisations">
                        <td>{{organisation.name}}</td>
                        <td>{{getOrganisationLocation(organisation)}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

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
                model: {
                    bsn: "",
                    gender: "",
                    firstName: "",
                    namePrefix: "",
                    lastName: "",
                    streetName: "",
                    streetNumber: "",
                    streetNumberExtra: "",
                    zipCode: "",
                    residence: "",
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
            account.bsn = "000000";

            this.loadPatient(account);

            this.getMedicalFile(account).then((medicalFile) => {
                return Promise.all([this.loadMentors(medicalFile), this.loadOrganisations(medicalFile)]);
            }).catch(console.error);
        },
        methods: {
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
                    this.model.bsn = response.bsn;
                    this.model.gender = response.gender;
                    this.model.firstName = response.firstName;
                    this.model.namePrefix = response.namePrefix;
                    this.model.lastName = response.lastName;
                    this.model.streetName = response.street;
                    this.model.streetNumber = response.houseNumber;
                    this.model.birthday = {
                        day: birthday.getDate(),
                        month: birthday.getMonth(),
                        year: birthday.getFullYear()
                    };
                    this.model.streetNumberExtra = response.houseNumberExtra;
                    this.model.zipCode = response.zipCode;
                    this.model.residence = response.city;
                    this.model.telephoneNumber = response.telephoneNumber;
                    this.model.email = response.email;
                });
            },
            loadMentors(medicalFile) {
                return Promise.all(this.getPersons(medicalFile.mentors)).then((mentors) => {
                    this.model.mentors = mentors;
                }).catch((err) => {
                    console.log(err);
                });
            },
            loadOrganisations(medicalFile){
                return Promise.all(medicalFile.permissions.map((permission) => {
                    return httpOrganisationService.getById(this.getIdFromResource(permission.organisation)).then((organisations) => {
                        this.model.organisations = organisations;
                    });
                }));
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
