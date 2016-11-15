import React, { Component } from 'react';
import AuthRedirect from 'app/components/utils/AuthRedirect';
import Paginate from 'app/components/utils/Paginate';
import { fetch } from 'app/actions/myCompletedForms';
import { connect } from 'react-redux';
import { propTypes } from 'react-router';
import isEqual from 'lodash/isEqual';

class MyCompletedFormsPage extends Component {
    constructor(props, context) {
        super(props);

        this.state = this.getStateFromsProps(props);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    /**
     * Get state from router props
     */
    getStateFromsProps(props) {
        return {
            page: parseInt(props.params.page) || 0,
            filters: Object.assign({
                title: ''
            }, props.location.query)
        }
    }

    /**
     * Redirect after page or filters change
     */
    transitionTo() {
        this.context.router.transitionTo({
            pathname: `/my-completed-forms/${this.state.page || ''}`,
            query: this.state.filters || {}
        });
    }

    /**
     * Dispatches an action to the store to fetch posts
     */
    fetch(transitionTo = false, delay = 0) {
        transitionTo && this.transitionTo();

        clearTimeout(this.fetchTimeout);
        this.fetchTimeout = setTimeout(() => {
            const { page, filters } = this.state; 
            this.props.dispatch(fetch({ page, filters }));
        }, delay);
    }

    componentDidMount() {
        this.fetch();
    }

    /**
     * Handles when the user click on the My completed forms menu item
     * by resetting the state
     */
    componentWillReceiveProps(nextProps) {
        const state = this.getStateFromsProps(nextProps);
        if (!isEqual(state, this.state)) {
            this.setState(state, this.fetch);
        }
    }

    componentWillUnomunt() {
        clearTimeout(this.fetchTimeout);
    }

    /**
     * @todo - remove this when implemented
     */
    handlePDFClick(e) {
        e.preventDefault();
    }

    /**
     * Handle change of form title change input
     */
    handleTitleChange() {
        const title = this.refs.title.value;
        const filters = Object.assign({}, this.state.filters, { title });

        this.setState({
            page: 0,
            filters
        }, () => this.fetch(true, 150));
    }

    /**
     * Handle click callback for paginate
     *
     * @param {object} data from react-paginate
     */
    handlePageClick(data) {
        const page = data.selected;
        this.setState({ page }, () => this.fetch(true));
    }

    render() {
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
                                        value={this.state.filters.title}
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

    renderItems() {
        if (this.props.items && this.props.items.data.length) {
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
            let message;

            if (this.props.isLoading) {
                message = 'Loading...';
            }
            else if(this.state.filters.title) {
                message = 'No matches found for your criteria.'
            }
            else {
                message = 'You have no completed forms yet.'
            }

            return (
                <tr>
                    <td className="text-xs-center" colSpan="2">{message}</td>
                </tr>
            );
        }
    }

    renderPaginate() {
        if (this.props.items && this.props.items.data.length) {
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

MyCompletedFormsPage.contextTypes = {
    router: propTypes.routerContext
}

function mapStateToProps(state) {
    return {
        isLoading: state.myCompletedForms.isLoading,
        items: state.myCompletedForms.data
    }
}

export default connect(mapStateToProps)(MyCompletedFormsPage);