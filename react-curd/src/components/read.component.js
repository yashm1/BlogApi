import React, { Component } from "react";
import blogservice from "../service/blog.service";
import { Link } from "react-router-dom";
export default class read extends Component {
    constructor(props) {
        super(props);
        // this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangebody = this.onChangebody.bind(this);
        this.getblog = this.getblog.bind(this);
        // this.updatePublished = this.updatePublished.bind(this);
        this.updateblog = this.updateblog.bind(this);
        this.deleteblog = this.deleteblog.bind(this);

        this.state = {
            currentblog:
            {
                id: 0,
                body: ""
            },
            message: ""
        };
    }
    componentDidMount() {
        this.getblog(this.props.match.params.id);
    }
    onChangebody(e) {
        const body = e.target.value;
        this.setState(function (prevState) {
            return {
                currentblog: {
                    ...prevState.currentblog,
                    body: body
                }
            };
        });
    }
    getblog(id) {
        blogservice.get(id).then(
            response => {
                this.setState({
                    currentblog: response.data
                });
                console.log(response.data);
            }
        ).catch(e => {
            console.log(e);
        });
    }
    updateblog() {
        console.log("This is id" + this.state.currentblog[0].id);
        console.log(this.state.currentblog[0].id, this.state.currentblog.body);
        blogservice.update(
            this.props.match.params.id,
            this.state.currentblog
        ).then(response => {
            console.log(response.data);
            this.setState({
                message: "Update Successfully"
            });
        }).catch(e => {
            console.log(e);
        });
    }
    deleteblog() {
        blogservice.delete(this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/read')
            }).catch(e => {
                console.log(e);
            })
    }
    render() {
        const { currentblog } = this.state;
        const data = currentblog.body;
        console.log("This is from the render");
        console.log(currentblog.body);
        return (
            <div>
                {currentblog ? (
                    <div className="edit-form">
                        <h4>Blogs</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="body">body</label>
                                <input type="text"
                                    className="form-control"
                                    id="body"
                                    value={currentblog.body}
                                    onChange={this.onChangebody}
                                />
                            </div>
                        </form>
                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteblog}
                        >
                            Delete
                    </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateblog}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Click on the blog</p>
                        </div>

                    )
                }
            </div>
        );
    }
}