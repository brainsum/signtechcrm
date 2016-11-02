import React, { Component } from 'react';

export default class MyFormsPage extends Component {
    render() {
        const forms = [
            { title: 'A Flat in Time Short Term Company Booking Form' },
            { title: 'AAISP / IPS TAG Change Delete Request (.uk domains) and this is my new headers name just for Mate to test and play with this shi' },
            { title: 'AXA PPP International - International self-certification form' },
            { title: 'Account Card' },
            { title: 'Account Switching Form' },
            { title: 'Adatmódosító nyilatkozat' },
            { title: 'Adult Application' },
            { title: 'Advantage Learning Course Participant Booking Form' },
            { title: 'Affiliate Relations Department' },
            { title: 'Allianz - Property General Claim Form' }
        ];

        return (
            <div className="container">
                <h1 className="page-title">My Forms</h1>

                <div className="form-group">
                    <input type="search" placeholder="Type here to search for forms" className="form-control form-control-lg" />
                </div>

                <table className="table table-striped table-hovered">
                    <thead>
                        <tr>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forms.map(form => (
                            <tr>
                                <td>
                                    <a href="">{form.title}</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-sm-center">
                    <ul className="pagination">
                        <li className="page-item disabled">
                            <a href="#" className="page-link">&laquo;</a>
                        </li>
                        <li className="page-item">
                            <a href="#" className="page-link">1</a>
                        </li>
                        <li className="page-item">
                            <a href="#" className="page-link">2</a>
                        </li>
                        <li className="page-item">
                            <a href="#" className="page-link">3</a>
                        </li>
                        <li className="page-item">
                            <a href="#" className="page-link">4</a>
                        </li>
                        <li className="page-item">
                            <a href="#" className="page-link">5</a>
                        </li>
                        <li className="page-item disabled">
                            <a href="#" className="page-link">&raquo;</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}