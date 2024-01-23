import React, { Component } from "react";

class Customer extends Component {
    onDelete = () => {
        if (this.props.customer) {
            const { id } = this.props.customer;
            this.props.onDelete(id);
        }
    };

    onEdit = () => {
        this.props.onEdit(this.props.customer);
    };

    render() {
        if (!this.props.customer) {
            return null;
        }

        const { id, first_name, last_name, email } = this.props.customer;

        return (
            <tr>
                <td style={{ textAlign: "center" }}>{id}</td>
                <td>{`${first_name} ${last_name}`}</td>
                <td>{email}</td>
                <td>
                    <button className="mini ui blue button" onClick={this.onEdit}>Edit</button>
                    <button className="mini ui red button" onClick={this.onDelete}>Delete</button>
                </td>
            </tr>
        );
    }
}

export default Customer;

