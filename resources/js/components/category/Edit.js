import React, { Component } from "react";
import { Link } from "react-router-dom";

class CategoryEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: [],
            content: "",
            url: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderGenre = this.renderGenre.bind(this);
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
            .put(`/masariuman_genre/${this.props.match.params.url}`, {
                content: this.state.content
            })
            .then(response => {
                this.props.history.push("/admin/genre");
                // console.log("from handle sumit", response);
            })
            .catch(error => {
                console.log(error.message);
            });
        // console.log(this.state.create);
    }

    getGenre() {
        axios
            .get(`/masariuman_genre/${this.props.match.params.url}/edit`)
            .then(response => {
                this.setState({
                    genre: [response.data.deeta_genre],
                    content: response.data.deeta_genre.category
                });
            });
    }

    componentDidMount() {
        this.getGenre();
    }

    renderGenre() {
        return this.state.genre.map(genre => (
            <form onSubmit={this.handleSubmit} key={genre.id}>
                <div className="form-group">
                    <input
                        onChange={this.handleChange}
                        placeholder="Genre"
                        type="text"
                        className="mb-2 form-control-lg form-control"
                        value={this.state.content}
                    />
                    <input
                        type="hidden"
                        className="mb-2 form-control-lg form-control"
                        value={genre.url}
                    />
                </div>
                <button
                    type="submit"
                    className="btn-square btn-hover-shine btn btn-success"
                >
                    <a className="pe-7s-plus"></a> Ubah Genre / Klik Enter
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
                                EDIT Genre
                                <div className="page-title-subheading">
                                    Halaman ini berfungsi untuk mengubah genre
                                    novel.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-card mb-3 card">
                    <div className="card-body">{this.renderGenre()}</div>
                </div>
            </div>
        );
    }
}

export default CategoryEdit;
