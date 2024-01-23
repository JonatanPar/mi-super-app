import React, { Component } from "react";
import Customer from "./Customer";

class CustomerList extends Component {
    onDelete = (id) => {
        this.props.onDelete(id);
    };

    onEdith = (data) => {
        this.props.onEdith(data);
    };

    render() {
        const { customers, searchQuery } = this.props;

        // Filtrar los resultados según la búsqueda
        const filteredCustomers = customers.filter(
            (customer) =>
                customer.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className="data">
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th style={{ width: "50px", textAlign: "center" }}>#</th>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredCustomers.map((customer) => (
                            <Customer
                                customer={customer}
                                key={customer.id}
                                onDelete={this.onDelete}
                                onEdith={this.onEdith}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CustomerList;
