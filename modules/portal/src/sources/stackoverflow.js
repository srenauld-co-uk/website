import Builder from './builder.js';
import OAuth2Token from './oauth2_token.js';
import NewWindow from './new_window.js';
import axios from 'axios';
class SOClient {
    constructor(key, token) {
        this.key = key;
        this.token = token;
    }
    async get(url) {
        return await this.request({
            url: url,
            method: 'GET'
        });
    }

    async post(url, data) {
        return await this.request({
            url: url,
            method: 'POST',
            data: data
        });
    }

    async put(url, data) {
        return await this.request({
            url: url,
            method: 'POST',
            data: data
        });
    }

    async delete(url) {
        return await this.request({
            url: url,
            method: 'DELETE'
        })
    }

    async request(settings) {
        settings.url = settings.url.indexOf("?") >= 0 ? settings.url + `&key=${this.key}&access_token=${this.token}` : settings.url + `?key=${this.key}&access_token=${this.token}`;
        return await axios.request(settings);
    }
}
export default (settings) => {
    return new Builder()
        .with(OAuth2Token)
        .with(NewWindow)
        .with(function(obj) {
            var wrapped = this.settings.wrapRequest;
            this.settings.wrapRequest = (request, token) => {
                if (wrapped) request = wrapped(request, token);
                request.url = request.url.indexOf("?") >= 0 ? request.url + "&access_token=" + token : request.url + "?access_token=" + token;
                return request;
            },
            this.settings.authorizeUrl = `https://stackoverflow.com/oauth/dialog?scopes=${settings.scopes}&client_id=${settings.clientId}&redirect_uri=${settings.redirectUri}`;
            this.client = (token) => {
                return new SOClient(settings.key, token);
            };
            this.session = async (token) => {
                let result = await this.client(token).get(`https://api.stackexchange.com/2.2/me?site=${settings.site}&order=desc&sort=reputation&filter=default`);
                if (!result || !result.data || !result.data.items || !result.data.items.length) throw Error("Authentication failure - no profile retrieved");
                result = result.data;
                result.items[0].sub = result.items[0].account_id;
                let output = {
                    sub: result.items[0].account_id,
                    name: result.items[0].display_name,
                    picture: result.items[0].profile_image
                };
                return {
                    profile: output,
                    client: () => new SOClient(settings.key, token)
                };
            }
        })
        .build();
}