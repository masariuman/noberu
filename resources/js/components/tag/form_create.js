import React, { Component } from "react";
import { Link } from "react-router-dom";

class TagNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: [],
            pagination: [],
            url: null
        };
    }

    render() {
        return (
            <div>
                <div className="app-page-title">
                    <div className="page-title-wrapper">
                        <div className="page-title-heading">
                            <div className="page-title-icon">
                                <i className="pe-7s-pin icon-gradient bg-happy-green"></i>
                            </div>
                            <div>
                                TAG NOVEL BARU
                                <div className="page-title-subheading">
                                    Halaman ini berfungsi untuk menambah tag
                                    novel.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-card mb-3 card">
                    <div className="card-body">
                    <input placeholder="Tag" type="text" class="mb-2 form-control-lg form-control">
                    </div>
                </div>
            </div>
        );
    }
}

export default Tag;
