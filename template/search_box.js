import React from 'react';
import classNames from 'classnames';

export default class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            mobile: true,
            value: ''
        };
    }
    open() {
        if (this.state.mobile) {
            this.setState({
                open: true
            });
        }
    }
    checkMobile() {
        if (window.innerWidth < 768 && !this.state.mobile) {
            return this.setState({
                mobile: true
            });
        }
        if (window.innerWidth >= 768 && this.state.mobile) {
            this.setState({
                mobile: false
            });
        }
    }
    componentDidMount() {
        window.addEventListener('resize', () => {
            this.checkMobile();
        });
        this.checkMobile();
    }

    render() {
        return (<div className={classNames({
            'search-box': true,
            'search-box-mobile': this.state.mobile
        })}>
            <input type="text" placeholder="Search..." className={classNames({
                
                'search-box-open': this.state.open
            })} />
            <button className="icon" onClick={() => this.open()}>
                <i className="fa fa-search"></i>
            </button>
            <ul className="suggestions"></ul>
        </div>);
    }
}