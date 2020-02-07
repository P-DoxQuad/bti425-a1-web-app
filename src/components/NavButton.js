import React, { Component } from 'react'
import { Link } from "react-router-dom";


class NavButton extends Component {
    render(props) {
        return (
                <li class="active"><Link to={this.props.page}>{this.props.name}</Link></li>
        )
    }
}


/*<li><a href="#">About</a></li>
  <li><a href="#">Projects</a></li>
  <li><a href="#">Contact</a></li>*/

export default NavButton
