import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { resolve } from 'dns';

class AddVehicle extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        //id: '',
        make: '',
        model: '',
        colour: '',
        year: '',
        vin: '',
        msrp: '',
        photo: '',
        description: '',
        purchaseDate: '',
        purchaserName: '',
        purchaserEmail: '',
        pricePaid: ''
    };

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(` 
                     Make: ${this.state.make},
                     Model: ${this.state.model}, 
                     Colour: ${this.state.colour},
                     Year: ${this.state.year}, 
                     VIN: ${this.state.vin},
                     MSRP: ${this.state.msrp}, 
                     Photo: ${this.state.photo},
                     Description: ${this.state.description}, 
                     Purchase Date: ${this.state.purchaseDate},
                     Purchaser Name: ${this.state.purchaserName}, 
                     Purchaser Email: ${this.state.purchaserEmail},
                     Price Paid: ${this.state.pricePaid} 
                    `);

        // Can also do data validation in here
    }

    componentDidMount() {
        //this.input.focus();
    }

    handleSubmit(e) {

        // Turn off default form handling
        e.preventDefault();

        //const url = "https://bti425-a1-web-api.herokuapp.com/api/vehicle";
        const url = "http://localhost:8080/api/vehicle";

        const newVehicle = {
            //'id': 202,
            'make': this.state.make,
            'model': this.state.model,
            'colour': this.state.colour,
            'year': this.state.year,
            'vin': this.state.vin,
            'msrp': this.state.msrp,
            'photo': this.state.photo,
            'description': this.state.description,
            'purchaseDate': this.state.purchaseDate,
            'purchaserName': this.state.purchaserName,
            'purchaserEmail': this.state.purchaserEmail,
            'pricePaid': this.state.pricePaid
        };

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: { 
                //"Content-Type": 'application/x-www-form-urlencoded'
                "Content-Type": 'application/json' 
            },
            body: JSON.stringify(newVehicle)
        })
            .then(response => {
                console.log("Posting Vehicle from Form");
                if (response.ok) {
                    // Parse the response body as JSON
                    return response.json();
                } else if (response.status >= 400 && response.status < 500) {
                    // Error caused by the requestor
                    throw Error(`HTTP ${response.status}, ${response.statusText}`);
                } else {
                    // Some other situation
                    throw Error(`HTTP ${response.status}, ${response.statusText}`);
                }
            })
            .then(responseData => {
                // "responseData" is an object
                // Study the shape of the data in the reqres.in service
                // Optional...
                console.log(responseData);
                // The identifier "id" can be used to redirect
                this.props.history.push(`/vehicles`);
            })
            .catch(error => {
                // Handles an error thrown above, as well as network general errors
                console.log(error.message)
            });

    }

    render() {
        document.title = `Add New Vehicle`;

        // If "this.input" exists (it will only get rendered if a form exists), set its focus
        if (this.textInput && this.state.make.length === 0 && this.state.model.length === 0) {
            //this.textInput.focus();
        }

        return (
            <div class="container">
                <div class="row">
                    <div class="col-md-12">

                        <h2>Add Vehicle</h2>

                        <br />

                        <form onSubmit={this.handleSubmit}>
                            <fieldset>
                                <legend>Vehicle Information</legend>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="make">Make:</label>
                                            <input class="form-control" id="make" name="make" ref={(i) => { this.input = i; }} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="model">Model:</label>
                                            <input class="form-control" id="model" name="model" ref={(i) => { this.input = i; }}
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="colour">Colour:</label>
                                            <input class="form-control" id="colour" name="colour" ref={(i) => { this.input = i; }}
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="year">Year:</label>
                                            <input class="form-control" id="year" name="year" ref={(i) => { this.input = i; }}
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="vin">Vin Number:</label>
                                            <input class="form-control" id="vin" name="vin" onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="msrp">MSRP:</label>
                                        <input class="form-control" id="msrp" name="msrp" onChange={this.handleChange} type="text" />
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="description">Description:</label>
                                            <textarea class="form-control" id="description" name="description" onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <label for="photo">Photo:</label>
                                        <input class="form-control" id="photo" name="photo" onChange={this.handleChange} type="text" />
                                    </div>
                                </div>
                            </fieldset>
                            <hr />
                            <fieldset>
                                <legend>Purchase Information</legend>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="purchaserName">Purchaser Name:</label>
                                            <input class="form-control" id="purchaserName" name="purchaserName" onChange={this.handleChange}
                                                type="text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="purchaserEmail">Purchaser Email:</label>
                                            <input class="form-control" id="purchaserEmail" name="purchaserEmail" onChange={this.handleChange}
                                                type="text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="purchaseDate">Purchase Date:</label>
                                            <input class="form-control" id="purchaseDate" name="purchaseDate" onChange={this.handleChange}
                                                type="text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="pricePaid">Price Paid</label>
                                            <input class="form-control" id="pricePaid" name="pricePaid" onChange={this.handleChange} 
                                                type="text" />
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <div className="form-group">
                                <div className="col-md-offset-10 col-md-3">
                                    <button onClick={this.props.handleSubmit} className="btn btn-primary">Add Vehicle</button>&nbsp;&nbsp;
                                    <Link className='btn btn-default' to='/vehicles'>Cancel</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddVehicle);
