import { Consumer } from '../index.js';

export default (props) => {
    let listElement = (props) => {
        if (!props.session) return null;
        let session = props.session || {};
        return (<aside className="session-list">
            <h1>Active sessions:</h1>
            <ul>
                {Object.entries(session).map(
                    ([siteName, session]) => {
                        return (<li key="session session-entry session-entry-{siteName}">{session && session.profile && session.profile.picture && <img src={session.profile.picture} />}</li>)
                    })
                }
            </ul>
        </aside>)
    };
    return <Consumer item={listElement}></Consumer>
};