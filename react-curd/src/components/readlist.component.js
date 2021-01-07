import React, { Component } from "react";
import blogservice from "../service/blog.service";
import { Link } from "react-router-dom";
export default class readlist extends Component {
    constructor(props) {
        super(props);
        this.retrieveblogs = this.retrieveblogs.bind(this);

        this.state = {

            blogs: [],
            currentblogs: null,
            currentIndex: -1,
        };
    }
    componentDidMount() {
        this.retrieveblogs();
    }
    onChangebody(e) {
        const body = e.target.value;
        this.setState(prevState => ({
            currentblog:
            {
                ...prevState.currentblog,
                body: body
            }
        }));
    }
    retrieveblogs() {
        blogservice.getAll()
            .then(response => {
                this.setState({
                    blogs: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    setActiveblog(blog, index) {
        this.setState({
            currentblogs: blog,
            currentIndex: index
        });
    }

    render() {
        const { blogs, currentblogs, currentIndex } = this.state;

        return (
            <div className="list row">

                <div className="col-md-6">
                    <h4>Blogs List</h4>

                    <ul className="list-group">
                        {blogs &&
                            blogs.map((blogs, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveblog(blogs, index)}
                                    key={index}
                                >
                                    {blogs.body}
                                </li>
                            ))}
                    </ul>

                </div>
                <div className="col-md-6">
                    {currentblogs ? (
                        <div>
                            <h4>Blogs</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentblogs.id}
                            </div>
                            <h4>Content</h4>
                            <div>
                                <label>
                                    <strong>Body:</strong>
                                </label>{" "}
                                {currentblogs.body}
                            </div>


                            <Link
                                to={"/read/" + currentblogs.id}
                                className="badge badge-warning"
                            >
                                Edit
              </Link>
                        </div>
                    ) : (
                            <div>
                                <br />
                                <p>Please click on a Tutorial...</p>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}
