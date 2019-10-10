import { Consumer } from '../index.js';

let LoginGate = (props) => {
    return (<div className="login-splash">
        <div className="login-splash-inner">
            <p>This component requires an active session with {props.site}.</p>
            <p><button className="btn" onClick={async (e) => {
                e.preventDefault();
                await props.initiate();
            }}>Log in</button></p>
        </div>
    </div>)
}

export default (props) => {
    let component = (gateProps) => {
        if (gateProps.session) return props.children;
        else return (<LoginGate site={props.site} initiate={gateProps.initiate}></LoginGate>);
    };
    return (<Consumer site={props.site} item={component}></Consumer>)
};