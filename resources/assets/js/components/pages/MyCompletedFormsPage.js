import React, { Component } from 'react';

export default class MyCompletedFormsPage extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="page-title">My completed forms</h1>

                <table className="table table-striped table-hovered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th colspan="2">Date of completin</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        );
    }
}