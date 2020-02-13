import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

/****************************************************************************
 * AddVehicle: This is the component for handling everything related to     *
 * adding to the records. App() calls this component with a Route.          *
 * **************************************************************************/
class AddVehicle extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputMake = React.createRef();
        this.inputModel = React.createRef();
        this.inputColour = React.createRef();
        this.inputYear = React.createRef();
        this.inputVIN = React.createRef();
        this.inputMSRP = React.createRef();
        this.inputPhoto = React.createRef();
        this.inputDesc = React.createRef();
        this.inputPurchaseDate = React.createRef();
        this.inputPurchaseName = React.createRef();
        this.inputPurchaseEmail = React.createRef();
        this.inputPricePaid = React.createRef();
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

// *************************** This controls the page render ************************************//
    handleSubmit(e) {

        // Turn off default form handling
        e.preventDefault();

        const url = "https://bti425-a1-web-api.herokuapp.com/api/vehicle";
        //const url = "http://localhost:8080/api/vehicle";

        
        var setError = 0;

        if (!this.inputMake.current.value) {
            alert("'Make' is empty!");
        } else if (!this.inputModel.current.value) {
            alert("'Model' is empty!");
        } else if (!this.inputColour.current.value) {
            alert("'Colour' is empty!");
        } else if (isNaN(this.inputYear.current.value)) {
            alert("'Year' must be a number, like - 1999");
        } else if (!this.inputYear.current.value) {
            alert("'Year' is empty!");
        } else if (!this.inputVIN.current.value) {
            alert("'VIN Number' is empty!");
        } else if (!this.inputMSRP.current.value) {
            alert("'MSRP' is empty!");
        } else if (isNaN(this.inputMSRP.current.value)) {
            alert("Must be a number, no commas, like - 2000");
        } else if (!this.inputPhoto.current.value) {
            alert("'Photo' is empty!");
        } else {

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

    }

// *************************** This controls the page render ************************************//
    render() {
        document.title = `Add New Vehicle`;

        // If "this.input" exists (it will only get rendered if a form exists), set its focus
        if (this.textInput && this.state.make.length === 0 && this.state.model.length === 0) {
            //this.textInput.focus();
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <h2>Add Vehicle</h2>

                        <br />
                            <fieldset>
                                <legend>Vehicle Information</legend>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="make">Make:</label>
                                            <input className="form-control" id="make" name="make" ref={this.inputMake} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="model">Model:</label>
                                            <input className="form-control" id="model" name="model" ref={this.inputModel}
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="colour">Colour:</label>
                                            <input className="form-control" id="colour" name="colour" ref={this.inputColour}
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="year">Year:</label>
                                            <input className="form-control" id="year" name="year" ref={this.inputYear}
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vin">Vin Number:</label>
                                            <input className="form-control" id="vin" name="vin" ref={this.inputVIN}
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="msrp">MSRP:</label>
                                        <input className="form-control" id="msrp" name="msrp" ref={this.inputMSRP}
                                               onChange={this.handleChange} type="text" />
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="description">Description:</label>
                                            <textarea className="form-control" id="description" name="description" ref={this.inputDesc}
                                                      onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="photo">Photo:</label>
                                        <input className="form-control" id="photo" name="photo" ref={this.inputPhoto}
                                               onChange={this.handleChange} type="text" />
                                    </div>
                                </div>
                            </fieldset>
                            <hr />
                            <fieldset>
                                <legend>Purchase Information</legend>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="purchaserName">Purchaser Name:</label>
                                            <input className="form-control" id="purchaserName" name="purchaserName" onChange={this.handleChange}
                                                type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="purchaserEmail">Purchaser Email:</label>
                                            <input className="form-control" id="purchaserEmail" name="purchaserEmail" onChange={this.handleChange}
                                                type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="purchaseDate">Purchase Date:</label>
                                            <input className="form-control" id="purchaseDate" name="purchaseDate" onChange={this.handleChange}
                                                type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="pricePaid">Price Paid</label>
                                            <input className="form-control" id="pricePaid" name="pricePaid" onChange={this.handleChange} 
                                                type="text" />
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <div className="form-group">
                                <div className="col-md-offset-10 col-md-3">
                                    <button onClick={this.handleSubmit} className="btn btn-primary">Add Vehicle</button>&nbsp;&nbsp;
                                    <Link className='btn btn-default' to='/vehicles'>Cancel</Link>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddVehicle);
