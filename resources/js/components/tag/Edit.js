import React, { Component } from "react";
import { Link } from "react-router-dom";

class TagEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: [],
            content: "",
            url: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTag = this.renderTag.bind(this);
    }

    handleChange(e) {
        this.setState({
            content: e.target.value
        });
        // console.log(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`/masariuman_tag/${this.props.match.params.url}`, {
                create: this.state.create
            })
            .then(response => {
                this, props.history.push("/nanael_masariuman_hachiel/tag");
                // console.log("from handle sumit", response);
            })
            .catch(error => {
                console.log(error.message);
            });
        // console.log(this.state.create);
    }

    getTag() {
        axios
            .get(`/masariuman_tag/${this.props.match.params.url}/edit`)
            .then(response => {
                this.setState({
                    tag: [response.data.deeta_tag],
                    content: response.data.deeta_tag.tag
                });
            });
    }

    componentDidMount() {
        this.getTag();
    }

    renderTag() {
        return this.state.tag.map(tag => (
            <form onSubmit={this.handleSubmit} key={tag.id}>
                <div className="form-group">
                    <input
                        onChange={this.handleChange}
                        placeholder="Tag"
                        type="text"
                        className="mb-2 form-control-lg form-control"
                        value={this.state.content}
                    />
                    <input
                        type="hidden"
                        className="mb-2 form-control-lg form-control"
                        value={tag.url}
                    />
                </div>
                <button
                    type="submit"
                    className="btn-square btn-hover-shine btn btn-success"
                >
                    <a className="pe-7s-plus"></a> Ubah Tag
                </button>
            </form>
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
                                EDIT TAG
                                <div className="page-title-subheading">
                                    Halaman ini berfungsi untuk mengubah tag
                                    novel.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-card mb-3 card">
                    <div className="card-body">{this.renderTag()}</div>
                </div>
            </div>
        );
    }
}

export default TagEdit;
