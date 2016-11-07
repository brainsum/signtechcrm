import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { fetch, filter } from 'app/actions/myforms';
import ReactPaginate from 'react-paginate';

/**
 * @todo: refactor
 *
 * move pagniation entirely to redux store
 * export pagination to a seperate component (Paginated?), so other pages can use it
 */

const PAGE_SIZE=15;

class MyFormsPage extends Component {
    constructor(props) {
        super(props);

        props.dispatch(fetch(props.user.companyId));

        this.state = {
            page: 0
        };

        this.handleKeywordChange = this.handleKeywordChange.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handleKeywordChange() {
        const value = this.refs.keyword.value;
        this.props.dispatch(filter(value || null));
    }

    handlePageClick(data) {
        this.setState({
            page: data.selected
        });
    }

    render() {
        if (!this.props.loggedIn) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="container">
                <h1 className="page-title">My Forms</h1>
                {this.renderForms()}
            </div>
        );
    }

    renderForms() {
        if (this.props.isLoading) {
            return <div className="text-xs-center">Loading forms...</div>
        }

        if (this.props.error) {
            return <div className="alert alert-danger">An error occured while loading your forms, please try again.</div>
        }

        if (!this.props.keyword && !this.props.forms.length) {
            return <div className="alert alert-info">You don't have any forms yet.</div>
        }

        const numberOfPages = Math.ceil(this.props.forms.length / PAGE_SIZE);
        const forms = this.props.forms.slice(this.state.page * PAGE_SIZE, (this.state.page + 1) * PAGE_SIZE);

        return (
            <div>
                <div className="form-group">
                    <input
                        type="search"
                        placeholder="Type here to search for forms"
                        className="form-control form-control-lg"
                        ref="keyword"
                        onChange={this.handleKeywordChange}
                    />
                </div>
                <table className="table table-striped table-hovered">
                    <thead>
                        <tr>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forms.map(form => (
                            <tr key={form.form_id}>
                                <td>{form.form_title}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-xs-center">
                    <ReactPaginate
                       pageNum={numberOfPages}
                       pageRangeDisplayed={5}
                       marginPagesDisplayed={1}
                       breakLabel={<span className="page-link">...</span>}
                       breakClassName="page-item"
                       clickCallback={this.handlePageClick}
                       forceSelected={this.state.page}
                       containerClassName="pagination"
                       pageClassName="page-item"
                       pageLinkClassName="page-link"
                       activeClassName="active"
                       previousClassName="page-item"
                       nextClassName="page-item"
                       previousLinkClassName="page-link"
                       nextLinkClassName="page-link"
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn, user } = state.auth;
    const { isLoading, keyword, filteredForms, error } = state.myforms;

    return {
        loggedIn,
        user,
        isLoading,
        keyword,
        forms: filteredForms,
        error
    };
}

export default connect(mapStateToProps)(MyFormsPage);