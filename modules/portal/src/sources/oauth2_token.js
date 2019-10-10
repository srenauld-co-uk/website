import generator from './oauth2.js';
export default function() {
    return generator.apply(this, [async (frame, result) => {
        if (!result.access_token) throw new Error("No access token was returned by the remote server.");
        return result.access_token;
    }]);
};