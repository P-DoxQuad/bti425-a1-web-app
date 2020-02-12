import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

/****************************************************************************
 * EditVehicle: This is the component for handling everything related to    *
 * editing records. App() calls this component with a Route.                *
 * **************************************************************************/
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
        this.setState({ [e.target.name]: e.target.value});
        console.log([e.target.name], e.target.value);

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

// ************************ When Page Has Finished Loading Components ***********************************/
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

// ************************* Actions When Page Is Submitted *************************************//
    handleSubmit(e) {

        // Turn off default form handling
        e.preventDefault();

        //const url = `https://bti425-a1-web-api.herokuapp.com/api/vehicles/${this.props.id}`;
        const url = `http://localhost:8080/api/vehicles/${this.props.id}`;
        var newVehicle = { };
        console.log("Resubmit Values " + { [e.target.name]: e.target.value});
        
        if ({ [e.target.name]: e.target.value} =="") {

            newVehicle = {
                'id': this.props.id,
                'make': this.props.make,
                'model': this.props.model,
                'colour': this.props.colour,
                'year': this.props.year,
                'vin': this.props.vin,
                'msrp': this.props.msrp,
                'photo': this.props.photo,
                'description': this.props.description,
                'purchaseDate': this.props.purchaseDate,
                'purchaserName': this.props.purchaserName,
                'purchaserEmail': this.props.purchaserEmail,
                'pricePaid': this.props.pricePaid
            };
        } else {
            newVehicle = {
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
        }

// ********************* Update Data with Fetch API ***********************************************//
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

// *************************** This controls the page render ************************************//
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

        /* If "this.input" exists (it will only get rendered if a form exists), set its focus
        if (this.textInput && this.state.make.length === 0 && this.state.model.length === 0) {
            //this.textInput.focus();
        }*/

// ***************************** HTML Markup starts here *********************************************//
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Edit Vehicle</h2>
                        <br />
                            <fieldset>
                                <legend>Vehicle Information</legend>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="make">Make:</label>
                                            <input className="form-control" id="make" name="make" defaultValue={v.make} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="model">Model:</label>
                                            <input className="form-control" id="model" name="model" defaultValue={v.model} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="colour">Colour:</label>
                                            <input className="form-control" id="colour" name="colour" defaultValue={v.colour} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="year">Year:</label>
                                            <input className="form-control" id="year" name="year" defaultValue={v.year} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vin">Vin Number:</label>
                                            <input className="form-control" id="vin" name="vin" defaultValue={v.vin} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="msrp">MSRP:</label>
                                        <input className="form-control" id="msrp" name="msrp" defaultValue={v.msrp} 
                                                   onChange={this.handleChange} type="text" />
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="description">Description:</label>
                                            <textarea className="form-control" id="description" name="description" defaultValue={v.description} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="photo">Photo:</label>
                                        <input className="form-control" id="photo" name="photo" defaultValue={v.photo} 
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
                                            <input className="form-control" id="purchaserName" name="purchaserName" defaultValue={v.purchaserName} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="purchaserEmail">Purchaser Email:</label>
                                            <input className="form-control" id="purchaserEmail" name="purchaserEmail" defaultValue={v.purchaserEmail} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="purchaseDate">Purchase Date:</label>
                                            <input className="form-control" id="purchaseDate" name="purchaseDate" defaultValue={v.purchaseDate} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="pricePaid">Price Paid</label>
                                            <input className="form-control" id="pricePaid" name="pricePaid" defaultValue={v.pricePaid} 
                                                   onChange={this.handleChange} type="text" />
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <div className="form-group">
                                <div className="col-md-offset-10 col-md-3">
                                    <button disabled={isDisabled} onClick={this.handleSubmit} className="btn btn-primary">Save Changes</button>&nbsp;&nbsp;
                                    <Link className='btn btn-default' to='/vehicles'>Cancel</Link>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(EditVehicle);
