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

    async getUserEvents(username: string, page = 1, perPage = 100) {
        return this.get(
            `https://api.github.com/users/${username}/events/public?page=${page}&per_page=${perPage}`,
        ).then((response) => {
            return response;
        }).catch((error) => {
            throw new Error(error);
        });
    }

    async getUserRepos(username: string, page = 1, perPage = 100) {
        return this.get(
            `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated&direction=desc`,
        ).then((response) => {
            return response;
        }).catch((error) => {
            throw new Error(error);
        });
    }

    async getRepoCommits(owner: string, repo: string, page = 1, perPage = 100, since?: string) {
        let url = `https://api.github.com/repos/${owner}/${repo}/commits?page=${page}&per_page=${perPage}`;
        if (since) {
            url += `&since=${since}`;
        }
        return this.get(url).then((response) => {
            return response;
        }).catch((error) => {
            throw new Error(error);
        });
    }
}
const GitApi = new GitApiClass();

export default GitApi;

