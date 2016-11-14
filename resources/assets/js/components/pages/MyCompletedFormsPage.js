import React, { Component } from 'react';
import AuthRedirect from 'app/components/utils/AuthRedirect';
import Paginate from 'app/components/utils/Paginate';
import { fetch } from 'app/actions/myCompletedForms';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class MyCompletedFormsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldRedirect: false,
            page: parseInt(props.params.page) || 0
        };

        this.fetchData();
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.params.page !== nextProps.params.page
            || this.props.location.query.title !== nextProps.location.query.title
        ) {
            this.setState({
                redirectToPage: false,
                page: parseInt(nextProps.params.page) || 0
            }, () => {
                this.fetchData();
            });
        }
    }

    componentWillUnomunt() {
        clearTimeout(this.titleChangeTimeout);
    }

    /**
     * Dispatches an action to the store to fetch posts
     */
    fetchData() {
        this.props.dispatch(fetch({
            page: this.state.page,
            title: ''
        }));
    }

    /**
     * @todo - remove this when implemented
     */
    handlePDFClick(e) {
        e.preventDefault();

        alert('Not implemented yet.');
    }

    /**
     * Handle change of form title change input
     */
    handleTitleChange() {
        // Timeout is throttling, we only should fetch data,
        // when user finished typing
        clearTimeout(this.titleChangeTimeout);

        this.titleChangeTimeout = setTimeout(() => {
            const title = this.refs.title.value;
            
            if (title !== this.state.title) {
                this.setState({
                    shouldRedirect: true,
                    page: 0
                });
            }
        }, 150);
    }

    /**
     * Handle click callback for paginate
     *
     * @param {object} data from react-paginate
     */
    handlePageClick(data) {
        // Change the state and the render method will do the redirect
        this.setState({
            shouldRedirect: true,
            page: data.selected
        });
    }

    render() {
        if (this.state.shouldRedirect) {
            return this.renderRedirect();
        }

        return (
            <div className="container my-forms">
                <AuthRedirect login={true} />

                <h1 className="page-title">My completed forms</h1>

                <table className="table table-striped table-hover my-forms__table">
                    <thead>
                        <tr>
                            <th>
                                <div className="form-group mb-0">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        className="form-control"
                                        id="title"
                                        placeholder="Search for form title"
                                        type="search"
                                        ref="title"
                                        onChange={this.handleTitleChange}
                                    />
                                </div>
                            </th>
                            <th className="my-forms__date" colSpan="2">Date of completion</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderItems() }
                    </tbody>
                </table>

                { this.renderPaginate() }
            </div>
        );
    }

    renderRedirect() {
        const to = {
            pathname: `/my-completed-forms/${this.state.page || ''}`,
            query: {}
        };

        /*if (this.props.location.query.title) {
            to.query.title = this.props.location.query.title;
        }*/

        return <Redirect to={to} />;
    }

    renderItems() {
        if (this.props.items) {
            return this.props.items.data.map(form => (
                <tr key={form.id}>
                    <td>{form.title}</td>
                    <td className="my-forms__date">{form.completed_at}</td>
                    <td className="my-forms__download-pdf">
                        <a
                            href="#"
                            onClick={this.handlePDFClick}
                            className="btn btn-link"
                        >
                            Download PDF
                        </a>
                    </td>
                </tr>
            ));
        }
        else {
            return (
                <tr>
                    <td className="text-xs-center" colSpan="2">Loading...</td>
                </tr>
            );
        }
    }

    renderPaginate() {
        if (this.props.items) {
            return (
                <div className="text-xs-center">
                    <Paginate
                        numberOfPages={this.props.items.last_page}
                        handlePageClick={this.handlePageClick}
                        page={this.state.page}
                    />
                </div>
            );
        }

        return null;
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.myCompletedForms.isLoading,
        items: state.myCompletedForms.data
    }
}

export default connect(mapStateToProps)(MyCompletedFormsPage);