let source = () => {
    return {
        settings: {},
        client: (token) => {
            throw Error("A client generator was not defined");
        },
        lazy: () => false,
        prompt: async (url, verifier) => {
            throw Error("A prompt method was not defined.");
        },
        authenticate: async () => {
            throw Error("An authentication mechanism was not defined.");
        },
        session: async (token) => {
            throw Error("A session validation function was not defined.");
        }
    };
}
class Builder {
    constructor() {
        this.modules = [];
    }
    with(module) {
        this.modules.push(module);
        return this;
    }
    build(settings) {
        let baseSource = source();
        for (let o of this.modules) {
            o.bind(baseSource)(baseSource);
            // , []);
        }
        return baseSource;
    }
}
export default Builder;