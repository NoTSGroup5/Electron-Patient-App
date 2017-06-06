import HttpService from './httpService'

export default class HttpMedicalFileService {

    constructor () {
        this.httpService = new HttpService();
    }

    getMedicalFile() {
        return this.httpService.get("MedicalFile").then((files) => {
            return files.length > 0 ? files[0] : null;
        });
    }

    getMedicalFileByBsn(bsn) {
        return this.httpService.getById("MedicalFile", bsn).then((file) => {
            return file;
        });
    }
}