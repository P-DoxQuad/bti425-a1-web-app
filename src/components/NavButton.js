import React, { Component } from 'react'
import { Link } from "react-router-dom";


class NavButton extends Component {
    render(props) {
        return (
                <li class="active"><Link to={this.props.page}>{this.props.name}</Link></li>
        )
    }
}

export default NavButton
