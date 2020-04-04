import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles

class ParentEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            genres: [],
            tags: [],
            thumb: "",
            thumbDesc: "",
        };
        this.onImageUpload = this.onImageUpload.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.inputKeyDown = this.inputKeyDown.bind(this);
        this.removeGenre = this.removeGenre.bind(this);
        this.inputKeyDownGenre = this.inputKeyDownGenre.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        // this.handleChangethumb = this.handleChangethumb.bind(this);
        // this.handleChangethumbDesc = this.handleChangethumbDesc.bind(this);
        // this.fileInput = React.createRef();
    }

    handleChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    handleChangeContent(e) {
        this.setState({
            content: e,
        });
    }

    // handleChangethumb(e) {
    //     this.setState({
    //         thumb: this.fileInput.current.files[0].name,
    //     });
    // }

    // handleChangethumbDesc(e) {
    //     this.setState({
    //         thumbDesc: e.target.value,
    //     });
    // }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`/parent/${this.props.match.params.url}`, {
                title: this.state.title,
                content: this.state.content,
                genres: this.state.genres,
                tags: this.state.tags,
                thumb: this.state.thumb,
                thumbDesc: this.state.thumbDesc,
            })
            .then((response) => {
                this.props.history.push("/admin/parent");
            })
            .catch((error) => {
                console.log(error.message);
            });
        console.log(this.state);
    }

    removeGenre(i) {
        const newGenres = [...this.state.genres];
        newGenres.splice(i, 1);
        this.setState({ genres: newGenres });
    }

    inputKeyDownGenre(e) {
        const val = e.target.value;
        if (e.key === "Enter" && val) {
            if (
                this.state.genres.find(
                    (genre) => genre.toLowerCase() === val.toLowerCase()
                )
            ) {
                return;
            }
            this.setState({ genres: [...this.state.genres, val] });
            this.genreInput.value = null;
        } else if (e.key === "Backspace" && !val) {
            this.removeGenre(this.state.genres.length - 1);
        }
    }

    removeTag(i) {
        const newTags = [...this.state.tags];
        newTags.splice(i, 1);
        this.setState({ tags: newTags });
    }

    inputKeyDown(e) {
        const val = e.target.value;
        if (e.key === "Enter" && val) {
            if (
                this.state.tags.find(
                    (tag) => tag.toLowerCase() === val.toLowerCase()
                )
            ) {
                return;
            }
            this.setState({ tags: [...this.state.tags, val] });
            this.tagInput.value = null;
        } else if (e.key === "Backspace" && !val) {
            this.removeTag(this.state.tags.length - 1);
        }
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

    getNovel() {
        axios
            .get(`/parent/${this.props.match.params.url}/edit`)
            .then((response) => {
                this.setState({
                    title: response.data.data.title,
                    content: response.data.data.content,
                    genres: response.data.data.genre,
                    tags: response.data.data.tags,
                    // thumb: response.data.data.thumbnail,
                    // thumbDesc: response.data.data.thumbnail_desc
                });
            });
    }

    componentDidMount() {
        this.getNovel();
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
                                NEW PARENT NOVEL
                                <div className="page-title-subheading">
                                    Halaman ini berfungsi untuk membuat parent
                                    novel / TOC / Description Novel baru.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
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
                                                "insert",
                                                [
                                                    "link",
                                                    "picture",
                                                    "video",
                                                    "hr",
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
                                <div className="input-tag">
                                    <ul className="input-tag__tags">
                                        {this.state.tags.map((tag, i) => (
                                            <li key={tag}>
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        this.removeTag(i);
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </li>
                                        ))}
                                        <li className="input-tag__tags__input">
                                            <input
                                                type="text"
                                                placeholder="Tags"
                                                onKeyDown={this.inputKeyDown}
                                                ref={(c) => {
                                                    this.tagInput = c;
                                                }}
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <div className="input-tag">
                                    <ul className="input-tag__tags">
                                        {this.state.genres.map((genre, i) => (
                                            <li key={genre}>
                                                {genre}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        this.removeGenre(i);
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </li>
                                        ))}
                                        <li className="input-tag__tags__input">
                                            <input
                                                type="text"
                                                placeholder="Genres"
                                                onKeyDown={
                                                    this.inputKeyDownGenre
                                                }
                                                ref={(c) => {
                                                    this.genreInput = c;
                                                }}
                                            />
                                        </li>
                                    </ul>
                                </div>
                                {/* <div className="thumb">
                                    <input
                                        ref={this.fileInput}
                                        onChange={this.handleChangethumb}
                                        type="file"
                                        placeholder="Thumbnail"
                                        className="thumbinput"
                                    />
                                    <input
                                        onChange={this.handleChangethumbDesc}
                                        type="text"
                                        value={this.state.thumbDesc}
                                        placeholder="Thumbnail Description"
                                        className="form-control-lg form-control desc"
                                    />
                                </div> */}
                            </div>
                            <button
                                type="button"
                                onClick={this.handleSubmit}
                                className="btn-square btn-hover-shine btn btn-warning form-control form-control-lg baton"
                            >
                                <a className="pe-7s-pen"></a> Edit Novel{" "}
                                <a className="pe-7s-pen"></a>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ParentEdit;
