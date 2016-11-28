import React, { Component } from 'react';
import auth from 'app/components/utils/auth';
import Paginate from 'app/components/utils/Paginate';
import { fetch } from 'app/ducks/completedForms';
import { connect } from 'react-redux';
import { propTypes } from 'react-router';
import isEqual from 'lodash/isEqual';
import clone from 'lodash/clone';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class CompletedFormsPage extends Component {
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
        const filters = Object.assign({
            title: '',
            from: null,
            to: null
        }, props.location.query);

        if (filters.from) filters.from = moment(filters.from);
        if (filters.to) filters.to = moment(filters.to);

        return {
            page: parseInt(props.params.page) || 0,
            filters
        }
    }

    /**
     * Redirect after page or filters change
     */
    transitionTo() {
        const filters = clone(this.state.filters || {});

        if (filters.from) filters.from = filters.from.format('YYYY-MM-DD');
        if (filters.to) filters.to = filters.to.format('YYYY-MM-DD');

        this.context.router.transitionTo({
            pathname: `/completed-forms/${this.state.page || ''}`,
            query: filters
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
            this.props.fetch({ page, filters });
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

    handleChangeDate(type, date) {
        if (!date.isValid()) {
            date = null;
        }

        const filters = Object.assign({}, this.state.filters, { [type]: date });

        this.setState({
            page: 0,
            filters
        }, () => this.fetch(true));
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
        console.log(this.state.filters.from);
        return (
            <div className="container my-forms">
                <h1 className="page-title">{this.props.isAdmin ? 'Completed forms' : 'My completed forms'}</h1>

                <table className="table table-striped table-hover table--responsive my-forms__table">
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
                            <th className="my-forms__date" colSpan="2">
                                Date of completion

                                <DatePicker
                                    className="form-control"
                                    dateFormat="YYYY-MM-DD"
                                    selected={this.state.filters.from}
                                    onChange={date => this.handleChangeDate('from', date)}
                                    placeholderText="From"
                                />
                                <DatePicker
                                    className="form-control"
                                     dateFormat="YYYY-MM-DD"
                                    selected={this.state.filters.to}
                                    onChange={date => this.handleChangeDate('to', date)}
                                    placeholderText="To"
                                />
                            </th>
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
                    <td data-title="Title">{form.title}</td>
                    <td className="my-forms__date" data-title="Date of completion">{form.created_at}</td>
                    <td className="my-forms__download-pdf">
                        <a
                            href={form.file}
                            className="btn btn-link"
                            target="_blank"
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

CompletedFormsPage.contextTypes = {
    router: propTypes.routerContext
}

function mapStateToProps(state) {
    return {
        isAdmin: state.auth.user && state.auth.user.isAdmin,
        isLoading: state.completedForms.isLoading,
        items: state.completedForms.data
    }
}

CompletedFormsPage = connect(mapStateToProps, { fetch })(CompletedFormsPage);
CompletedFormsPage = auth(CompletedFormsPage);
export default CompletedFormsPage;