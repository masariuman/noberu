import React, { Component } from "react";

class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: [],
            pagination: []
        };
    }

    getTag() {
        axios.get("/deeta_tag").then(response =>
            this.setState({
                tag: response.data.deeta_tag.data
            })
        );
    }

    testTag() {
        axios
            .get("/deeta_tag")
            .then(response => console.log(response.data.deeta_tag));
    }

    componentDidMount() {
        this.getTag();
    }

    renderTag() {
        return this.state.tag.map(tag => (
            <tr>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tag;
