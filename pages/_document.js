import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class LiveriedDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }
    render() {
        return (<Html>
            <Head />
            <body>
                <div className='site-container'>
                    <Main />
                    <NextScript />
                </div>
            </body>
        </Html>);
    }
}