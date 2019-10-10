import React from 'react';
import IframableAuthentication from './iframe.js';
let sessionStore = null;
export default (Provider, Consumer) => {
    return {
        setSessionStore: (store) => {
            sessionStore = store;
            resumeAll();
        },
        Consumer: Consumer,
        Element: class Element extends React.Component {

            constructor(props) {
                super(props);
                this.state = {
                    sessions: {},
                    initiating: true,
                    methods: {
                        start: async (site) => {
                            return this.startSession.bind(this)(site)
                        }
                    },
                    inPageAuthentication: null
                }
            }

            async componentDidMount() {
                return await this.resumeAll();
            }

            async resume(source) {
                if (!this.props.sources[source]) return null;
                let newSession = await this.props.sessionStore.resume({
                    source: this.props.sources[source]
                });
                if (!newSession) return {};
                this.setState({
                    sessions: {
                        [source]: newSession[source]
                    },
                    initiating: false
                });
                return newSession[source];
            }

            async resumeAll() {
                let sessions = await this.resume(Object.entries(this.props.sources).filter(([idx, i]) => {
                    return !i.lazy();
                }));
                this.setState({
                    initiating: false
                });
            }

            async startSession(source) {
                if (!this.state.sessions[source]) {
                    let output = await this.authenticateWith(source);
                    console.log(output);
                    this.setState({
                        sessions: {
                            [source]: output
                        }
                    });
                    return await output.client();
                }

                try {
                    let session = await this.props.sessionStore.resume({
                        source: this.props.sources[source]
                    });
                    if (session) return session.client();
                    return await this.state.sessions[source].client();
                 } catch (e) {
                     return await this.authenticateWith(source, e);
                 }
            }

            async authenticateWith(source) {
                if (!this.props.sources[source]) throw new Error("Source not defined");
                return await this.props.sources[source].authenticate();
            }

            render() {
                return (
                    <>
                        {this.state.inPageAuthentication && <IframableAuthentication source={this.state.inPageAuthentication} sessionCallback={this.startSession} />}
                        <Provider value={this.state}>
                            {this.props.children}
                        </Provider>
                    </>)
            }
        }
    }
};