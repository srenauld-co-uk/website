import React from 'react';
import SearchBox from './search_box.js';
import Link from 'next/link';
import classNames from 'classnames';
// import css from './navbar.scss';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            mobile: false,
            intermediate: false,
            scrolled: false
        };
    }
    static getDerivedStateFromProps(props, oldState = {}) {

    }
    open() {
        this.setState({
            open: true
        });
    }
    close() {
        this.setState({
            open: false
        });
    }
    checkMobile() {
        let toSet = {};
        if (window.innerWidth < 768 && !this.state.intermediate) {
            toSet.intermediate = true;
        }
        if (window.innerWidth >= 768 && this.state.intermediate) {
            toSet.intermediate = false;
        }
        if (window.innerWidth < 576 && !this.state.mobile) {
            toSet.mobile = true;
        }
        if (window.innerWidth >= 576 && this.state.mobile) {
            toSet.mobile = false;
        }
        if (Object.keys(toSet).length) this.setState(toSet);
    }
    isScrolled() {
        var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        if (scrollTop > 600 && !this.state.scrolled) {
            this.setState({scrolled: true})
        }
        if (scrollTop < 600 && this.state.scrolled) {
            this.setState({scrolled: false})
        }
    }
    componentDidMount() {
        this.props.marquee && window.addEventListener('scroll', () => {
            this.isScrolled();
        });
        this.props.marquee && this.isScrolled();
        window.addEventListener('resize', () => {
            this.checkMobile();
        });
        this.checkMobile();
    }
    render() {
        return (
        <><header className="nav-bar">
            <div className={classNames({
                "nav-content": true,
                "nav-mobile": this.state.mobile,
                "nav-open": this.state.open
            })}>
                <div className='menu-button-container' style={{'display': this.state.mobile ? 'block' : 'none'}}>
                    <button className='expand-button' onClick={() => this.open()}>E</button>
                </div>
                <Link href='/'>
                    <a className="logo home-link" style={{
                        opacity: this.state.intermediate || this.state.scrolled ? 1 : 0
                    }}>
                        <img src="/static/logo.png" alt="" className="logo-image" />
                    </a>
                </Link>
                <div className='nav-link-bg' onClick={() => this.close()} style={{'display': this.state.open && this.state.mobile ? 'block' : 'none'}}></div>
                <nav className={classNames({
                    "nav-link-container": true,
                    "nav-link-container-open": this.state.mobile && this.state.open
                 })} >
                    <ul>
                        <li className="nav-link nav-item">
                            <Link href="/foo"><a>Foo</a></Link>
                        </li>
                        <li className="nav-link nav-item">
                            <Link href="/foo"><a>Bar</a></Link>
                        </li>
                        <li className="nav-link nav-item">
                            <Link href="/foo"><a>Baz</a></Link>
                        </li>
                    </ul>
                </nav>
                <SearchBox />
            </div>
        </header>
        <div className="site-content">
            {this.props.children}
        </div></>);
    }
}

export {
    Menu
};