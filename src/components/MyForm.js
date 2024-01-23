import React, { Component } from "react";

class MyForm extends Component {
    state = {
        form: { first_name: '', last_name: '', email: '', isEdit: false },
        btnName: "Save",
        btnClass: "ui primary button submit-button",
        validationError: ""
    };

    isEmpty(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props && !this.isEmpty(this.props.customer)) {
            this.setState({
                form: { ...this.props.customer, isEdit: true },
                btnName: "Update",
                btnClass: "ui primary button submit-button",
                validationError: ""
            });
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        let form = this.state.form;
        form[name] = value;
        this.setState({ form });
    };

    onFormSubmit = event => {
        event.preventDefault();

        // Validación del formulario
        if (this.formValidation()) {
            this.props.onFormSubmit(this.state.form);
            this.clearFormFields();
        }
    };

    formValidation = () => {
        const { first_name, last_name, email } = this.state.form;

        // Validación del nombre
        if (!first_name.trim()) {
            this.setValidationError('Enter first name');
            return false;
        }

        // Validación de apellidos
        if (!last_name.trim()) {
            this.setValidationError('Enter last name');
            return false;
        }

        // Validación de correo electrónico
        if (!email.trim()) {
            this.setValidationError('Enter email');
            return false;
        }

        // Restablece el mensaje de error si la validación es exitosa
        this.setValidationError('');
        return true;
    };

    setValidationError = message => {
        this.setState({ validationError: message });
    };

    clearFormFields = () => {
        // Estado del formulario (cambio)
        this.setState({
            form: { first_name: '', last_name: '', email: '', isEdit: false }
        });

        this.setState({
            btnName: "Save",
            btnClass: "ui primary button submit-button"
        });

        // Limpiar el formulario
        document.querySelector(".ui.form").reset();
    };

    render() {
        return (
            <form className="ui form" onSubmit={this.onFormSubmit}>
                <div className="fields">
                    <div className="four wide field">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            placeholder="first_name"
                            onChange={this.handleChange}
                            value={this.state.form.first_name}
                        />
                    </div>

                    <div className="four wide field">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            placeholder="last_name"
                            onChange={this.handleChange}
                            value={this.state.form.last_name}
                        />
                    </div>

                    <div className="four wide field">
                        <label>E-mail</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="joe@gmail.com"
                            onChange={this.handleChange}
                            value={this.state.form.email}
                        />
                    </div>

                    <div className="four wide field">
                        <button className={this.state.btnClass}>
                            {this.state.btnName}
                        </button>
                    </div>

                    {/* Botón de búsqueda */}
                    <div className="four wide field">
                        <button className="ui primary button" onClick={this.props.onSearchClick}>
                            Search
                        </button>
                    </div>
                </div>

                {this.state.validationError && (
                    <div className="ui red message">
                        {this.state.validationError}
                    </div>
                )}
            </form>
        );
    }
}

export default MyForm;

