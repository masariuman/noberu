import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles

class ParentNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: [],
            pagination: [],
            create: "",
            url: "/masariuman_genre"
        };
        this.onImageUpload = this.onImageUpload.bind(this);
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
                                    placeholder="Title"
                                    type="text"
                                    className="mb-2 form-control-lg form-control"
                                />
                                <ReactSummernote
                                    options={{
                                        lang: "ru-RU",
                                        height: 350,
                                        dialogsInBody: true,
                                        toolbar: [
                                            ["style", ["style"]],
                                            [
                                                "font",
                                                ["bold", "underline", "clear"]
                                            ],
                                            ["fontname", ["fontname"]],
                                            ["para", ["ul", "ol", "paragraph"]],
                                            ["table", ["table"]],
                                            [
                                                "insert",
                                                ["link", "picture", "video"]
                                            ],
                                            ["view", ["fullscreen", "codeview"]]
                                        ]
                                    }}
                                    onImageUpload={this.onImageUpload}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ParentNew;
