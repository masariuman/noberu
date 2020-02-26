import React, { Component } from "react";
import { Link } from "react-router-dom";

class TagEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: [],
            content: []
        };
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
                    <div className="card-body">
                        <input
                            placeholder="Tag"
                            type="text"
                            className="mb-2 form-control-lg form-control"
                            value={this.state.content}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default TagEdit;
