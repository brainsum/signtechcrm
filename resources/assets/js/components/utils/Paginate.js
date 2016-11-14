import React from 'react';
import ReactPaginate from 'react-paginate';

export default ({
    numberOfPages,
    handlePageClick,
    page
}) => (
    <ReactPaginate
        pageNum={numberOfPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        breakLabel={<span className="page-link">...</span>}
        breakClassName="page-item"
        clickCallback={handlePageClick}
        forceSelected={page}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
    />
);