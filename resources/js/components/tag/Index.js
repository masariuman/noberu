import React, { Component } from "react";

class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: [],
            pagination: [],
            url: null
        };
        this.loadMore = this.loadMore.bind(this);
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
                    url: response.data.next_page
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
    }

    componentDidUpdate() {
        this.getTag();
    }

    renderTag() {
        return this.state.tag.map(tag => (
            <tr key={tag.id}>
                <th scope="row">{tag.nomor}</th>
                <td>{tag.tag}</td>
                <td>Action</td>
            </tr>
        ));
    }

    render() {
        return (
            <div>
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <h5 className="card-title">TAG NOVEL</h5>
                        <div className="table-responsive">
                            <table className="mb-0 table">
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>TAG NAME</th>
                                        <th>ACTION</th>
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
