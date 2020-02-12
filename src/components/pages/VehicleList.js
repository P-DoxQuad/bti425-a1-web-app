import React, { Component } from 'react';
import {Link} from 'react-router-dom';

/****************************************************************************
 * VehicleList: This is the component for handling everything related to    *
 * viewing records. App() calls this component with a Route.                *
 * **************************************************************************/
class VehicleList extends Component {
  // Class properties 

  state = { vehicles: [] };

  componentDidMount() {
    const url = "https://bti425-a1-web-api.herokuapp.com/api/vehicles/";
    //const url = "http://localhost:8080/api/vehicles";

    // Get all
    fetch(url)
      .then(response => {
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
        this.setState({ vehicles: responseData });
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

// *************************** This controls the page render ************************************//
  render() {
    document.title = 'Vehicle List';

    return (
      <div>
        <h4>List of Vehicles, from custom WEB API service</h4>
        <p><Link className='btn btn-default' to='/vehicle/add'>Add a Vehicle</Link></p>
        <table className='table table-striped'>
          <TableHeader />
          <TableBody vehicles={this.state.vehicles} />
        </table>
      </div>
    );
  }
}

export default VehicleList;

// ************* Function component, table header ************************ //
const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>Photo</th>
        <th>Make</th>
        <th>Model</th>
        <th>Colour</th>
        <th>Year</th>
        <th>VIN</th>
        <th>MSRP</th>
      </tr>
    </thead>
  );
}

// ******** Function component to render the HTML table body element ******* //
const TableBody = (props) => {

  // Using the array of objects, create a new array of React elements
  let rows = props.vehicles.map((vehicle, index) => {
    return (
      <TableRow vehicle={vehicle} key={index} />
    );
  });

  return <tbody>{rows}</tbody>
}

// ******** Function component to render a single HTML table row *********** //
const TableRow = props => {

  const v = props.vehicle;

  // Render the row
  return (
    <tr>
      <td>{v._id}</td>
      <td><img src={v.photo} alt='' className="img-thumbnail" width="100px" /></td>
      <td>{v.make}</td>
      <td>{v.model}</td>
      <td>{v.colour}</td>
      <td>{v.year}</td>
      <td>{v.vin}</td>
      <td>${v.msrp}</td>
      <td><Link className='btn btn-default' to={`/vehicle/detail/${v._id}`}>Details</Link>&nbsp;&nbsp;
            <Link className='btn btn-warning' to={`/vehicle/edit/${v._id}`}>Edit</Link>&nbsp;&nbsp;
            <Link className='btn btn-danger' to={`/vehicle/delete/${v._id}`}>Delete</Link></td>
    </tr>
  );
}

