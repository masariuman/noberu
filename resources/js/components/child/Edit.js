import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles

class ChildNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            parents: [],
            parenturl: "",
            parentcontent: "",
            thumb: "",
            thumbDesc: "",
            url: "",
        };
        this.onImageUpload = this.onImageUpload.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeParent = this.handleChangeParent.bind(this);
        this.handleChangethumb = this.handleChangethumb.bind(this);
        this.handleChangethumbDesc = this.handleChangethumbDesc.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
        this.ifSelected = this.ifSelected.bind(this);
    }

    handleChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    handleChangeContent(e) {
        this.setState({
            content: e.target.value,
        });
    }

    handleChangeParent(e) {
        this.setState({
            parenturl: e.target.value,
        });
    }

    handleChangethumb(e) {
        this.setState({
            thumb: e.target.value,
        });
    }

    handleChangethumbDesc(e) {
        this.setState({
            thumbDesc: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`/child/${this.props.match.params.url}`, {
                title: this.state.title,
                content: this.state.content,
                parent: this.state.parenturl,
                thumb: this.state.thumb,
                thumbDesc: this.state.thumbDesc,
            })
            .then((response) => {
                this.props.history.push("/admin/child");
            })
            .catch((error) => {
                console.log(error.message);
            });
        // console.log(this.state);
        // console.log(this.fileInput);
    }

    onImageUpload(images, insertImage) {
        console.log("onImageUpload", images);
        /* FileList does not support ordinary array methods */
        for (let i = 0; i < images.length; i++) {
            /* Stores as bas64enc string in the text.
             * Should potentially be stored separately and include just the url
             */
            const reader = new FileReader();

            reader.onloadend = () => {
                insertImage(reader.result);
            };

            reader.readAsDataURL(images[i]);
        }
    }

    getParent() {
        axios
            .get(`/child/${this.props.match.params.url}/edit`)
            .then((response) => {
                // console.log(response);
                this.setState({
                    parents: response.data.data.parents.novel_parent,
                    parenturl: response.data.data.parent.url,
                    parentcontent: response.data.data.parent.title,
                    title: response.data.data.child.title,
                    content: response.data.data.child.content,
                    thumb: response.data.data.child.thumbnail,
                    thumbDesc: response.data.data.child.thumbnail_sidebar,
                    url: response.data.data.child.url,
                });
            });
    }

    componentDidMount() {
        this.getParent();
    }

    renderSelect() {
        return this.state.parents.map((par) => {
            if (this.state.parenturl == par.url) {
                return (
                    <option value={par.url} key={par.url} selected>
                        {par.title}
                    </option>
                );
            } else {
                return (
                    <option value={par.url} key={par.url}>
                        {par.title}
                    </option>
                );
            }
        });
    }

    ifSelected(x) {
        if (this.state.parenturl == x) {
            return (
                <option value={x} key={x} selected>
                    {par.title}
                </option>
            );
        } else {
            return (
                <option value={x} key={x}>
                    {par.title}
                </option>
            );
        }
    }

    render() {
        // console.log(this.state);
        return (
            <div>
                <div className="app-page-title">
                    <div className="page-title-wrapper">
                        <div className="page-title-heading">
                            <div className="page-title-icon">
                                <i className="pe-7s-notebook icon-gradient bg-happy-green"></i>
                            </div>
                            <div>
                                NEW CHILD NOVEL
                                <div className="page-title-subheading">
                                    Halaman ini berfungsi untuk membuat child
                                    novel / Chapter Novel baru.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <div>
                                    <span className="parents-line">
                                        Novel Parent :
                                    </span>
                                    <select
                                        onChange={this.handleChangeParent}
                                        className="form-control parents"
                                    >
                                        {this.renderSelect()}
                                    </select>
                                </div>
                                <input
                                    onChange={this.handleChangeTitle}
                                    value={this.state.title}
                                    placeholder="Title"
                                    type="text"
                                    className="mb-2 form-control-lg form-control"
                                />
                                <ReactSummernote
                                    value={this.state.content}
                                    options={{
                                        lang: "ru-RU",
                                        height: 350,
                                        dialogsInBody: true,
                                        toolbar: [
                                            ["style", ["style"]],
                                            [
                                                "font",
                                                [
                                                    "bold",
                                                    "underline",
                                                    "clear",
                                                    "strikethrough",
                                                    "superscript",
                                                    "subscript",
                                                    "clear",
                                                ],
                                            ],
                                            [
                                                "fontname",
                                                [
                                                    "fontname",
                                                    "fontsize",
                                                    "color",
                                                ],
                                            ],
                                            [
                                                "para",
                                                [
                                                    "ul",
                                                    "ol",
                                                    "paragraph",
                                                    "height",
                                                ],
                                            ],
                                            ["table", ["table"]],
                                            [
                                                "add",
                                                [
                                                    "addRowDown",
                                                    "addRowUp",
                                                    "addColLeft",
                                                    "addColRight",
                                                ],
                                            ],
                                            [
                                                "delete",
                                                [
                                                    "deleteRow",
                                                    "deleteCol",
                                                    "deleteTable",
                                                ],
                                            ],
                                            [
                                                "insert",
                                                [
                                                    "link",
                                                    "unlink",
                                                    "picture",
                                                    "removeMedia",
                                                    "video",
                                                    "hr",
                                                ],
                                            ],
                                            [
                                                "image",
                                                [
                                                    "resizeFull",
                                                    "resizeHalf",
                                                    "resizeQuarter",
                                                    "resizeNone",
                                                ],
                                            ],
                                            [
                                                "view",
                                                ["fullscreen", "codeview"],
                                            ],
                                        ],
                                    }}
                                    onChange={this.handleChangeContent}
                                    onImageUpload={this.onImageUpload}
                                />
                                <div className="thumb">
                                    <input
                                        onChange={this.handleChangethumb}
                                        value={this.state.thumb}
                                        type="text"
                                        placeholder="Thumbnail Home"
                                        className="form-control-lg form-control thumbdesc"
                                    />
                                    <input
                                        onChange={this.handleChangethumbDesc}
                                        type="text"
                                        value={this.state.thumbDesc}
                                        placeholder="Thumbnail Sidebar"
                                        className="form-control-lg form-control desc"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={this.handleSubmit}
                                className="btn-square btn-hover-shine btn btn-warning form-control form-control-lg baton"
                            >
                                <a className="pe-7s-pen"></a> Ubah Chapter{" "}
                                <a className="pe-7s-pen"></a>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChildNew;
