import React, { Component } from 'react';
import { Link } from "react-router-dom";

/****************************************************************************
 * VehicleDetail: This is the component for handling everything related to  *
 * viewing details of records. App() calls this component with a Route.     *
 * **************************************************************************/
class VehicleDetail extends Component {

  // Class properties 

  state = { vehicles: {}, httpStatusCode: 0, httpStatus: false };

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
        console.log(error);
      });

  }

// *************************** This controls the page render ************************************//
  render() {
    document.title = `Vehicle ${this.props.id} Details`;

    const v = this.state.vehicles;

    return (
      <div>
        <h4>Details About Vehicle #{this.props.id} - {v.make} {v.model} (VIN:{v.vin}) from Database</h4>

        {this.state.httpStatusOk ? (
          <div className="row">
            <div className="col-md-6">
              <dl className="dl-horizontal">
                <dt>Make</dt><dd>{v.make}</dd>
                <dt>Model</dt><dd>{v.model}</dd>
                <dt>Colour</dt><dd>{v.colour}</dd>
                <dt>Year</dt><dd>{v.year}</dd>
                <dt>VIN</dt><dd>{v.vin}</dd>
                <dt>MSRP</dt><dd>${v.msrp}</dd>
                <dt>Description</dt><dd>{v.description}</dd>
                <br />
                <dt>Purchaser Name</dt><dd>{v.purchaserName}</dd>
                <dt>Purchaser Email</dt><dd>{v.purchaserEmail}</dd>
                <dt>Purchase Date</dt><dd>{v.purchaseDate}</dd>
                <dt>Price Paid</dt><dd>${v.pricePaid}</dd>
              </dl>
            </div>
            <div className="col-md-2">
              <img src={v.photo} alt="" className='imgInTable' width="700px" />
            </div>
          </div>

        ) : (
            <p>Requested Vehicle was not found</p>
          )}

        <hr />
        <p><Link className='btn btn-warning' to={`/vehicle/edit/${this.props.id}`}>Edit</Link>&nbsp;&nbsp;
        <Link className='btn btn-default' to='/vehicles'>Show list of Vehicles</Link></p>
      </div>
    );
  }
}

export default VehicleDetail;
