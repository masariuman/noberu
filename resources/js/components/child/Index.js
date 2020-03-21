import React, { Component } from "react";
import { Link } from "react-router-dom";

class Child extends Component {
    constructor(props) {
        super(props);
        this.state = {
            novel: [],
            pagination: [],
            url: "/child"
        };
        this.loadMore = this.loadMore.bind(this);
        this.renderNovel = this.renderNovel.bind(this);
    }

    getNovel() {
        axios
            .get(this.state.url === null ? "/child" : this.state.url)
            .then(response => {
                // console.log(response);
                this.setState({
                    novel:
                        this.state.novel.length > 0
                            ? this.state.novel.concat(response.data.data.data)
                            : response.data.data.data,
                    url: response.data.data.next_page_url
                });
                this.getPagination(response.data.data);
            });
    }

    getPagination(data) {
        let pagination = {
            current_page: data.current_page,
            last_page: data.last_page,
            next_page_url: data.next_page_url,
            prev_page_url: data.prev_page_url
        };

        this.setState({
            pagination: pagination
        });
    }

    loadMore() {
        this.setState({
            url: this.state.pagination.next_page_url
        });

        this.componentDidMount();
    }

    componentDidMount() {
        this.getNovel();
    }

    componentDidUpdate() {
        // this.getGenre();
    }

    renderNovel() {
        return this.state.novel.map(novel => (
            <tr key={novel.id}>
                <th scope="row">{novel.nomor}</th>
                <td>{novel.title}</td>
                <td>
                    <Link
                        to={`/admin/child/${novel.url}/edit`}
                        className="mb-2 mr-2 border-0 btn-transition btn btn-shadow btn-outline-warning"
                    >
                        <span className="pe-7s-pen"> </span> Edit
                    </Link>
                    <Link
                        to={`/admin/child/${novel.url}/delete`}
                        className="mb-2 mr-2 border-0 btn-transition btn btn-shadow btn-outline-danger"
                    >
                        <span className="pe-7s-trash"> </span> Delete
                    </Link>
                </td>
            </tr>
        ));
    }

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
                            to={`/admin/child/new`}
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
                                <tbody>{this.renderNovel()}</tbody>
                            </table>
                            {this.state.pagination.next_page_url ? (
                                <button
                                    className="btn-wide mb-2 mr-2 btn-icon btn-icon-right btn-shadow btn-pill btn btn-outline-success"
                                    onClick={this.loadMore}
                                >
                                    More
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Child;
