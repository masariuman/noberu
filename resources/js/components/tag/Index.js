import React, { Component } from "react";
import { Link } from "react-router-dom";

class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: [],
            pagination: [],
            create: "",
            url: "/masariuman_tag"
        };
        this.loadMore = this.loadMore.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTag = this.renderTag.bind(this);
    }

    handleChange(e) {
        this.setState({
            create: e.target.value
        });
        // console.log(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/masariuman_tag/store", {
                create: this.state.create
            })
            .then(response => {
                this.setState({
                    tag: [response.data.deeta_tag, ...this.state.tag],
                    create: ""
                });
                // console.log("from handle sumit", response);
            })
            .catch(error => {
                console.log(error.message);
            });
        // console.log(this.state.create);
    }

    getTag() {
        axios
            .get(this.state.url === null ? "/masariuman_tag" : this.state.url)
            .then(response => {
                this.setState({
                    tag:
                        this.state.tag.length > 0
                            ? this.state.tag.concat(
                                  response.data.deeta_tag.data
                              )
                            : response.data.deeta_tag.data,
                    url: response.data.deeta_tag.next_page_url
                });
                this.getPagination(response.data.deeta_tag);
            });
    }

    testTag() {
        axios
            .get("/masariuman_tag")
            .then(response => console.log(response.data.deeta_tag));
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
        this.getTag();
        // console.log(this.state.tag);
    }

    componentDidUpdate() {
        // this.getTag();
    }

    renderTag() {
        return this.state.tag.map(tag => (
            <tr key={tag.id}>
                <th scope="row">{tag.nomor}</th>
                <td>{tag.tag}</td>
                <td>
                    <Link className="mb-2 mr-2 border-0 btn-transition btn btn-shadow btn-outline-warning">
                        <a className="pe-7s-pen"> </a> Edit
                    </Link>
                    <Link className="mb-2 mr-2 border-0 btn-transition btn btn-shadow btn-outline-danger">
                        <a className="pe-7s-trash"> </a> Delete
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
                                <i className="pe-7s-pin icon-gradient bg-happy-green"></i>
                            </div>
                            <div>
                                TAG NOVEL
                                <div className="page-title-subheading">
                                    Halaman ini berfungsi untuk memanajemen tag
                                    novel.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        {/* <Link
                            to={`/nanael_masariuman_hachiel/tag/new`}
                            className="mb-2 mr-2 btn-square btn-hover-shine btn btn-success"
                        >
                            <a className="pe-7s-plus"></a> Add New Tag
                        </Link> */}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    onChange={this.handleChange}
                                    value={this.state.create}
                                    className="form-control-lg form-control"
                                    placeholder="Add New Tag"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-square btn-hover-shine btn btn-success"
                            >
                                <a className="pe-7s-plus"></a> Add New Tag
                            </button>
                        </form>
                        <hr />
                        <p></p>
                        <div className="table-responsive">
                            <table className="mb-0 table">
                                <thead>
                                    <tr>
                                        <th className="width50px">NO</th>
                                        <th>TAG NAME</th>
                                        <th className="width250px">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>{this.renderTag()}</tbody>
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

export default Tag;
