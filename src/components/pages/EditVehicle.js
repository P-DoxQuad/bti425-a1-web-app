import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

class EditVehicle extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        vehicles: {},
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
        this.setState({vehicles: e.target.value});
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
        
        const url = `https://bti425-a1-web-api.herokuapp.com/api/vehicles/${this.props.id}`;
        //const url = `http://localhost:8080/api/vehicles/${this.props.id}`;

        // Get all
        fetch(url)
            .then(response => {
                // Optional...
                this.setState({ httpStatusCode: response.status, httpStatusOk: response.ok });
                if (response.ok) {
                    // Parse the response body as JSON
                    return response.json();
                } else if (response.status === 404) {
                    // Not found 
                    throw Error('HTTP 404, Not found');
                } else {
                    // Some other situation
                    throw Error(`HTTP ${response.status}, ${response.statusText}`);
                }
            })
            .then(responseData => {
                // "responseData" is an object; here, we're interested in its "data" property
                // Study the shape of the data in the reqres.in service
                this.setState({ vehicles: responseData });
                // Optional...
                //console.log(responseData.data);
            })
            .catch(error => {
                // Handles an error thrown above, as well as network general errors
                console.log(error)
            });



    };

    handleSubmit(e) {

        // Turn off default form handling
        e.preventDefault();

        //const url = `https://bti425-a1-web-api.herokuapp.com/api/vehicles/${this.props.id}`;
        const url = `http://localhost:8080/api/vehicles/${this.props.id}`;

        const newVehicle = {
            'id': this.props.id,
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
            method: 'PUT',
            headers: { "Content-Type": 'application/json' },
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
                this.props.history.push(`/vehicle/detail/${this.props.id}`);
            })
            .catch(error => {
                // Handles an error thrown above, as well as network general errors
                console.log(error)
            });

    };

    render() {
        document.title = `Edit Vehicle ${this.props.id}`;

        var v = this.state.vehicles;
        var isDisabled = 0;

        // Determine the button state
        if (v.make === "" && v.model === "" && v.colour === "" && v.year === "" && v.vin === "" && v.msrp === "" ) {
            isDisabled = true;
            console.log(isDisabled);
        } else {
            isDisabled = false;
        }

        // If "this.input" exists (it will only get rendered if a form exists), set its focus
        if (this.textInput && this.state.make.length === 0 && this.state.model.length === 0) {
            //this.textInput.focus();
        }

        return (
            <div class="container">
                <div class="row">
                    <div class="col-md-12">

                        <h2>Edit Vehicle</h2>

                        <br />

                        <form onSubmit={this.handleSubmit}>
                            <fieldset>
                                <legend>Vehicle Information</legend>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="make">Make:</label>
                                            <input class="form-control" id="make" name="make" value={v.make} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="model">Model:</label>
                                            <input class="form-control" id="model" name="model" value={v.model} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="colour">Colour:</label>
                                            <input class="form-control" id="colour" name="colour" value={v.colour} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="year">Year:</label>
                                            <input class="form-control" id="year" name="year" value={v.year} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="vin">Vin Number:</label>
                                            <input class="form-control" id="vin" name="vin" value={v.vin} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="msrp">MSRP:</label>
                                        <input class="form-control" id="msrp" name="msrp" value={v.msrp} 
                                                   onChange={this.handleChange} type="text" />
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="description">Description:</label>
                                            <textarea class="form-control" id="description" name="description" value={v.description} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <label for="photo">Photo:</label>
                                        <input class="form-control" id="photo" name="photo" value={v.photo} 
                                                   onChange={this.handleChange} type="text" />
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
                                            <input class="form-control" id="purchaserName" name="purchaserName" value={v.purchaserName} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="purchaserEmail">Purchaser Email:</label>
                                            <input class="form-control" id="purchaserEmail" name="purchaserEmail" value={v.purchaserEmail} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="purchaseDate">Purchase Date:</label>
                                            <input class="form-control" id="purchaseDate" name="purchaseDate" value={v.purchaseDate} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="pricePaid">Price Paid</label>
                                            <input class="form-control" id="pricePaid" name="pricePaid" value={v.pricePaid} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <div className="form-group">
                                <div className="col-md-offset-10 col-md-3">
                                    <button disabled={isDisabled} onClick={this.props.handleSubmit} className="btn btn-primary">Save Changes</button>&nbsp;&nbsp;
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

export default withRouter(EditVehicle);
