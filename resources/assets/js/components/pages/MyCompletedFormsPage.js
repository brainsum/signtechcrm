import React, { Component } from 'react';
import AuthRedirect from 'app/components/utils/AuthRedirect';

export default class MyCompletedFormsPage extends Component {
    render() {
        return (
            <div className="container">
                <AuthRedirect login={true} />

                <h1 className="page-title">My completed forms</h1>

                <table className="table table-striped table-hovered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th colSpan="2">Date of completin</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        );
    }
}