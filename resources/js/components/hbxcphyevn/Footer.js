import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="app-wrapper-footer">
                <div className="app-footer">
                    <div className="app-footer__inner">
                        <div className="app-footer-left">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        Rumah Sakit Universitas Tanjungpura Pontianak
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        Bank BTN
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="app-footer-right">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        Copyright &copy; 2020
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <div className="badge badge-warning mr-1 ml-0">
                                            <small>IT</small>
                                        </div>
                                        RSUNTAN
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
