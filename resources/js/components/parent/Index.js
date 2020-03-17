import React, { Component } from "react";
import { Link } from "react-router-dom";

class Parent extends Component {
    render() {
        return (
            <div>
                <div className="app-page-title">
                    <div className="page-title-wrapper">
                        <div className="page-title-heading">
                            <div className="page-title-icon">
                                <i className="pe-7s-notebook icon-gradient bg-happy-green"></i>
                            </div>
                            <div>
                                PARENT NOVEL
                                <div className="page-title-subheading">
                                    Halaman ini berfungsi untuk memanajemen
                                    parent novel / TOC / Description Novel.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <Link
                            to={`/admin/parent/new`}
                            className="mb-2 mr-2 border-0 btn-transition btn btn-shadow btn-outline-success"
                        >
                            <span className="pe-7s-plus"> </span> Add New Novel
                        </Link>
                        <div className="table-responsive">
                            <table className="mb-0 table">
                                <thead>
                                    <tr>
                                        <th className="width50px">NO</th>
                                        <th>Title</th>
                                        <th className="width250px">ACTION</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Parent;
