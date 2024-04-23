import axios from "axios";
import Endpoints from "./baseurl/EndPoint";

export default class AdverticeNetwork {
static SUPERADMIN_LOGIN_URL = Endpoints.baseURL + "/superadmin/login";

static async superAdminLoginApi(body) {
    let response = await axios.post(this.SUPERADMIN_LOGIN_URL, body, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: false,
    });
    return response.data;
}
}