import Config from '../../../config'
import Vue from 'vue'

export default class HttpService {

    get(url) {
        return this._doAjaxRequest(Config.apiUrl + url, 'GET').then((results) => {
            return this._stripRestrictedValues(results);
        });
    }

    getById(url, id) {
        return this._doAjaxRequest(Config.apiUrl + url + '/' + id, 'GET').then((response) => {
            return response;
        });
    }

    post(url, data) {
        return this._doAjaxRequest(Config.apiUrl + url, 'POST', data);
    }

    put(url, data) {
        this._doAjaxRequest(Config.apiUrl + url, 'PUT', data);
    }

    del(url) {
        return this._doAjaxRequest(Config.apiUrl + url, 'DELETE');
    }

    _doAjaxRequest(url, method, data){
        return $.ajax({
            url: url,
            cache : false,
            data : data,
            method : method,
            // send cross domain cookies, for da lulz
            xhrFields: {
                withCredentials: true
            }
        });
    }

    _stripRestrictedValues(items) {
        items.forEach(item => {
            this.restrictedFields.forEach(field => delete item[field])
        });

        return items;
    }

    get restrictedFields() {
        return ['$class'];
    }
}
