import React, { Component } from "react";
import { Link } from "react-router-dom";

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: [],
            pagination: [],
            create: "",
            url: "/masariuman_genre"
        };
        this.loadMore = this.loadMore.bind(this);
    }

    getGenre() {
        axios
            .get(this.state.url === null ? "/masariuman_genre" : this.state.url)
            .then(response => {
                this.setState({
                    genre:
                        this.state.genre.length > 0
                            ? this.state.genre.concat(
                                  response.data.deeta_genre.data
                              )
                            : response.data.deeta_genre.data,
                    url: response.data.next_page
                });
                this.getPagination(response.data.deeta_genre);
            });
    }

    testGenre() {
        axios
            .get("/masariuman_genre")
            .then(response => console.log(response.data.deeta_genre));
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
        this.getGenre();
    }

    componentDidUpdate() {
        this.getGenre();
    }

    renderGenre() {
        return this.state.genre.map(genre => (
            <tr key={genre.id}>
                <th scope="row">{genre.nomor}</th>
                <td>{genre.category}</td>
                <td>Action</td>
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
                                <i className="pe-7s-menu icon-gradient bg-happy-green"></i>
                            </div>
                            <div>
                                GENRE NOVEL
                                <div className="page-title-subheading">
                                    Halaman ini berfungsi untuk memanajemen
                                    genre novel.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <Link
                            to={`/nanael_masariuman_hachiel/genre/new`}
                            className="mb-2 mr-2 btn-square btn-hover-shine btn btn-success"
                        >
                            <a className="pe-7s-plus"></a> Add New Genre
                        </Link>
                        <p></p>
                        <div className="table-responsive">
                            <table className="mb-0 table">
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>GENRE NAME</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>{this.renderGenre()}</tbody>
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

export default Category;
