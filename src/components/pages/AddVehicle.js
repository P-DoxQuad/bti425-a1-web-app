import React from 'react'

function AddVehicle() {
    return (
        <div class="container">
    <div class="row">
        <div class="col-md-12">

            <h2>Add Vehicle</h2>

            <br />

            <form method="post" action="/api/vehicles">

                <fieldset>
                    <legend>Vehicle Information</legend>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="make">Make:</label>
                                <input class="form-control" id="make" name="make" type="text" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="model">Model:</label>
                                <input class="form-control" id="model" name="model" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="colour">Colour:</label>
                                <input class="form-control" id="colour" name="colour" type="text" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="year">Year:</label>
                                <input class="form-control" id="year" name="year" type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="vin">Vin Number:</label>
                                <input class="form-control" id="vin" name="vin" type="text" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="msrp">MSRP:</label>
                            <input class="form-control" id="msrp" name="msrp" type="text" />
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <textarea class="form-control" id="description" name="description" type="text" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <label for="photo">Photo:</label>
                            <input class="form-control" id="photo" name="photo" type="text" />
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
                                <input class="form-control"  id="purchaserName" name="purchaserName" 
                                    type="text"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="purchaserEmail">Purchaser Email:</label>
                                <input class="form-control" id="purchaserEmail" name="purchaserEmail"
                                    type="text" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="purchaseDate">Purchase Date:</label>
                                <input class="form-control" id="purchaseDate" name="purchaseDate"
                                    type="text" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pricePaid">Price Paid</label>
                                <input class="form-control" id="pricePaid" name="pricePaid" type="text" />
                            </div>
                        </div>
                    </div>
                </fieldset>
                
                <input type="submit" class="btn btn-primary pull-right" value="Add Vehicle" /><br /><br /><br />
            </form>
        </div>
    </div>
</div>
    )
}

export default AddVehicle;
