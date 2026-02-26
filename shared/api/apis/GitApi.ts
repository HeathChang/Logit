import { AxiosRequestConfig } from "axios";
import Http from "../http";

class GitApiClass extends Http {

    async getGitUserInfo(payload: unknown) {
        return this.get(`https://api.github.com/users/${payload}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw new Error(error);
            });
    }
}
const GitApi = new GitApiClass();

export default GitApi;

