import React, { Component } from "react";

class Footer extends Component {
    render() {
        return (
            <div className="app-wrapper-footer">
                <div className="app-footer">
                    <div className="app-footer__inner">
                        <div className="app-footer-left">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a
                                        href="http://masariuman.xyz/"
                                        className="nav-link"
                                    >
                                        Arif Setiawan
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="http://masariuman.xyz/"
                                        className="nav-link"
                                    >
                                        MasariuMan
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="app-footer-right">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a
                                        href="http://masariuman.xyz/"
                                        className="nav-link"
                                    >
                                        Copyright &copy; 2020
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="http://masariuman.xyz/"
                                        className="nav-link"
                                    >
                                        MasariuMan
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
