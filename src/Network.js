import axios from "axios";
import Endpoints from "./baseurl/EndPoint";

export default class AdverticeNetwork {

    static META_URL_STATE = "https://prodapi.classiolabs.com/getMetaData/state";
    static SUPERADMIN_LOGIN_URL = Endpoints.baseURL + "/superadmin/login";
    static FETCH_SUPER_ADMIN_ORGANISATION_URL = Endpoints.baseURL + "/superadmin/organisation/fetch-all-organisation";
    static FETCH_ADMIN_ORGANISATION_URL = Endpoints.baseURL + "/superadmin/organisation/fetch-admin/";
    static CREATE_ORGANISATION_URL = Endpoints.baseURL + "/superadmin/organisation/create-organisation";
    static EDIT_ORGANISATION_URL = Endpoints.baseURL + "/superadmin/organisation/edit-organisation/";
    static CHANGE_STATUS_ORGANISATION_URL = Endpoints.baseURL + "/superadmin/organisation/change-status/";

    static async fetchCity() {
        let response = await axios.get(this.META_URL_STATE, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: false,
        });

        return response.data;
    }

    static async superAdminLoginApi(body) {
        let response = await axios.post(this.SUPERADMIN_LOGIN_URL, body, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: false,
        });
        return response.data;
    }

    static async fetchSuperAdminOrganisationApi(body, auth) {
        let response = await axios.post(this.FETCH_SUPER_ADMIN_ORGANISATION_URL, body, {
            headers: {
                "Content-Type": "application/json",
                "X-Auth": auth
            },
            withCredentials: false,
        });
        return response.data;
    }

    static async fetchAdminOrganisationApi(body, auth, organisationId) {
        let response = await axios.post(this.FETCH_ADMIN_ORGANISATION_URL + organisationId, body, {
            headers: {
                "Content-Type": "application/json",
                "X-Auth": auth
            },
            withCredentials: false,
        });
        return response.data;
    }

    static async createOrganisationApi(body, auth) {
        let response = await axios.post(this.CREATE_ORGANISATION_URL, body, {
            headers: {
                "Content-Type": "application/json",
                "X-Auth": auth
            },
            withCredentials: false,
        });
        return response.data;
    }

    static async editOrganisationApi(body, auth, organisationId) {
        let response = await axios.post(this.EDIT_ORGANISATION_URL + organisationId, body, {
            headers: {
                "Content-Type": "application/json",
                "X-Auth": auth
            },
            withCredentials: false,
        });
        return response.data;
    }

    static async changeStatusApi(auth, organisationId) {
        let response = await axios.get(this.CHANGE_STATUS_ORGANISATION_URL + organisationId, {
            headers: {
                "Content-Type": "application/json",
                "X-Auth": auth
            },
            withCredentials: false,
        });
        return response.data;
    }

}