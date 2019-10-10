export default function(extractor) {
    this.authenticate = async () => {
        if (this.discover) await this.discover();
        let token = await this.prompt(this.settings.authorizeUrl, (frame, r) => {
            if (r && r.access_token) return r.access_token;
        });
        return await this.session(token);
    }
};