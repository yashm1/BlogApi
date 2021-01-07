import React, { Component } from "react";
import blogservice from "../service/blog.service";

export default class addblog extends Component {
    constructor(props) {
        super(props);
        this.addblog = this.addblog.bind(this);
        this.onChangebody = this.onChangebody.bind(this);
        this.onChangeid = this.onChangeid.bind(this);
        this.state = {
            id: null,
            body: "",
            submitted: false
        };

    }
    onChangebody(e) {
        this.setState({
            body: e.target.value
        });
    }
    onChangeid(e) {
        this.setState({
            id: e.target.value
        });
    }
    addblog() {
        var data = {
            id: this.state.id,
            body: this.state.body
        };
        blogservice.create(data).then(response => {
            this.setState({
                id: this.data.id,
                body: this.body.id,
                submitted: true
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        })
    }
    newblog() {
        this.setState({
            id: null,
            body: ""
        });

    }
    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You have submitted the form successfully</h4>
                        <button className="btn btn-success" onClick={this.newblog}>
                            Add
                        </button>
                    </div>

                ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="id">Id for the blog</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    required
                                    value={this.state.id}
                                    onChange={this.onChangeid}
                                    name="id"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">body</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="body"
                                    required
                                    value={this.state.body}
                                    onChange={this.onChangebody}
                                    name="body"
                                />
                            </div>
                            <button onClick={this.addblog} className="btn btn-success">
                                Submit
            </button>
                        </div>
                    )
                }
            </div>
        );
    }


}