import React from 'react';
import App from 'next/app';
import { Element, Consumer } from '../modules/portal/index';
import Stack from '../modules/portal/src/sources/stackoverflow.js';
import '../template/resets.scss';
import '../template/navbar.scss';
let sources = {
    stackoverflow: Stack({
        clientId: '',
        site: 'stackoverflow',
        scopes: 'id_token email profile',
        redirectUri: 'http://localhost:3000/test',
        clientId: 16164
    })
};

export default class WrapperApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <Element sources={sources} sessionStore={{}}>
                <Component {...pageProps} />
            </Element>
        );
    }
}