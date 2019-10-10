import React from 'react';
import Provider from './src/provider.js';

let ctx = React.createContext();
let elements = Provider(ctx.Provider, ctx.Consumer);
let Element = elements.Element;
let Consumer = elements.Consumer;
let CGeneratorClass = (props) => {
    let Element = props.item;
    return (<Consumer>
        {(session) => {
            if (session && !session.initiating) {
                if (props.site) return (<Element session={session && session.sessions && session.sessions[props.site]} initiate={async () => session.methods.start(props.site)} />);
                return (<Element session={session && session.sessions} initiate={async (site) => session.methods.start(site)}></Element>);
            } else {
                return null;
            }
        }}
    </Consumer>);
};
export {
    Element,
    CGeneratorClass as Consumer
};