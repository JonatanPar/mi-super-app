import React, { Component } from "react";
import axios from "axios";
import MyForm from "./MyForm";
import CustomerList from "./CustomerList";
import Loader from "./Loader";
import "./app.css";

class App extends Component {
    state = {
        customers: [],
        customer: {},
        loader: false,
        searchQuery: "",
        url: "http://localhost/ambiensa-proyecto/public/api/customers"
    };

    getCustomers = async () => {
        this.setState({ loader: true });

        try {
            let apiUrl = this.state.url;

            if (this.state.searchQuery) {
                apiUrl += `?search=${this.state.searchQuery}`;
            }

            const response = await axios.get(apiUrl);
            this.setState({ customers: response.data });
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            this.setState({ loader: false });
        }
    };

    deleteCustomer = async (id) => {
        this.setState({ loader: true });

        try {
            await axios.delete(`${this.state.url}/${id}`);
            this.getCustomers();
        } catch (error) {
            console.error("Error deleting customer:", error);
        } finally {
            this.setState({ loader: false });
        }
    };

    createOrUpdateCustomer = async (data) => {
        this.setState({ loader: true });

        try {
            if (data.isEdit) {
                // Actualizar cliente existente
                await axios.put(`${this.state.url}/${data.id}`, {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email
                });
            } else {
                // Crear nuevo cliente
                await axios.post(this.state.url, {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email
                });
            }

            // Obtener clientes actualizados después de la operación
            this.getCustomers();
        } catch (error) {
            console.error("Error creating/updating customer:", error);
        } finally {
            this.setState({ loader: false });
        }
    };

    componentDidMount() {
        this.getCustomers();
    }

    onDelete = (id) => {
        this.deleteCustomer(id);
    };

    onEdit = (data) => {
        this.setState({ customer: data });
    };

    onFormSubmit = (data) => {
        if (data.isEdit) {
            this.createOrUpdateCustomer(data);
        } else {
            this.createOrUpdateCustomer(data);
        }
    };

    onSearchClick = () => {
        this.getCustomers();
    };

    render() {
        return (
            <div>
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="/#" className="header item">
                            CRUD Ambiensa
                        </a>
                    </div>
                </div>
                <div className="ui main container">
                    <MyForm
                        customer={this.state.customer}
                        onFormSubmit={this.onFormSubmit}
                        onSearchClick={this.onSearchClick}
                        searchQuery={this.state.searchQuery}
                    />
                    {this.state.loader ? <Loader /> : ""}
                    <CustomerList
                        customers={this.state.customers}
                        onDelete={this.onDelete}
                        onEdit={this.onEdit}
                    />
                </div>
            </div>
        );
    }
}

export default App;
