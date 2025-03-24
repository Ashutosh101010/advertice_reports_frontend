import axios from "axios";
import Endpoints from "./baseurl/EndPoint";

export default class AdverticeNetwork {

    static META_URL_STATE = "https://prodapi.classiolabs.com/getMetaData/state";
    static SUPERADMIN_LOGIN_URL = Endpoints.baseURL + "/superadmin/login";
    static ADMIN_LOGIN_URL = Endpoints.baseURL + "/admin/login";
    static FETCH_SUPER_ADMIN_ORGANISATION_URL = Endpoints.baseURL + "/superadmin/organisation/fetch-all-organisation";
    static FETCH_ADMIN_ORGANISATION_URL = Endpoints.baseURL + "/superadmin/organisation/fetch-admin/";
    static CREATE_ORGANISATION_URL = Endpoints.baseURL + "/superadmin/organisation/create-organisation";
    static CREATE_ADMIN_ORGANISATION_URL = Endpoints.baseURL + "/admin/create";
    static EDIT_ORGANISATION_URL = Endpoints.baseURL + "/superadmin/organisation/edit-organisation/";
    static EDIT_ADMIN_ORGANISATION_URL = Endpoints.baseURL + "/admin/edit-profile";
    static CHANGE_STATUS_ORGANISATION_URL = Endpoints.baseURL + "/superadmin/organisation/change-status/";
    static CHANGE_STATUS_ADMIN_URL = Endpoints.baseURL + "/admin/change-status/";
    static CREATE_CAMPAIGN_URL = Endpoints.baseURL + "/campaign/create";

    static FETCH_CAMPAIGN_URL = Endpoints.baseURL + "/campaign/fetch-all-campaign";
    static EDIT_CAMPAIGN_URL = Endpoints.baseURL + "/campaign/edit-campaign";
    static IMPORT_DASHBOARD_CSV = Endpoints.baseURL + "";
    static FETCH_REPORT_URL = Endpoints.baseURL + "";    


    // static async fetchReportApi(auth) {
    //     let response = await axios.get(this.FETCH_REPORT_URL, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "X-Auth": auth
    //         },
    //         withCredentials: false,
    //     });
    //     return response.data;
    // }
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

    static async adminLoginApi(body, domain) {
        let response = await axios.post(this.ADMIN_LOGIN_URL, body, {
            headers: {
                "Content-Type": "application/json",
                "domain": domain
            },
            withCredentials: false,
        });
        return response.data;
    }

    static async fetchSuperAdminOrganisationApi(body, auth) {
        // console.log('auth======', auth);
        let response = await axios.post(this.FETCH_SUPER_ADMIN_ORGANISATION_URL, body, {
            headers: {
                "Content-Type": "application/json",
                "X-Auth": auth
            },
            withCredentials: false,
        });
        return response.data;
    }
    static async fetchCampaignApi(body, auth) {
        let response = await axios.post(this.FETCH_CAMPAIGN_URL, body, {
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

    static async createAdminOrganisationApi(body, auth) {
        let response = await axios.post(this.CREATE_ADMIN_ORGANISATION_URL, body, {
            headers: {
                "Content-Type": "application/json",
                "X-Auth": auth
            },
            withCredentials: false,
        });
        return response.data;
    }

    static async createCampaignApi(body, auth) {
        let response = await axios.post(this.CREATE_CAMPAIGN_URL , body, {
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

    static async editAdminOrganisationApi(body, auth, organisationId) {
        let response = await axios.post(this.EDIT_ADMIN_ORGANISATION_URL, body, {
            headers: {
                "Content-Type": "application/json",
                "X-Auth": auth
            },
            withCredentials: false,
        });
        return response.data;
    }

    static async editCampaignApi(body, auth) {
        let response = await axios.post(this.EDIT_CAMPAIGN_URL, body, {
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

    static async changeStatusAdminApi(auth, adminId) {
        let response = await axios.get(this.CHANGE_STATUS_ADMIN_URL + adminId, {
            headers: {
                "Content-Type": "application/json",
                "X-Auth": auth
            },
            withCredentials: false,
        });
        return response.data;
    }

    

    static async importCsvDashboard(body, auth) {
        let response = await axios.post(this.IMPORT_DASHBOARD_CSV, body, {
            headers: {
                "Content-Type": "application/json",
                "X-Auth": auth
            },
            withCredentials: false,
        });
        return response.data;
    }

    static async fetchReportListApi(auth) {
        let response = await axios.get(this.FETCH_REPORT_URL, {
            headers: {
                "Content-Type": "application/json",
                "X-Auth": auth
            },
            withCredentials: false,
        });
        return response.data;
    }
    

}