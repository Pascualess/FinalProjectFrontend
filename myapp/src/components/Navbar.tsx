import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'reactstrap';
import { Authentication } from './Authentication';
import '../css/Navbar.css';

//this creates our MenuItems - map is used below
export const MenuItems = [
  {
    title: "Home",
    url: "/home",
    cName: "nav-links",
    icon: "fa-solid fa-house"
  },
  {
    title: "About",
    url: "/about",
    cName: "nav-links",
    icon: "fa-solid fa-circle-info"
  },
  {
    title: "Contact Us",
    url: "/contactus",
    cName: "nav-links",
    icon: "fa-solid fa-address-book"
  },
  {
    title: "My Itineraries",
    url: "/itinerary",
    cName: "nav-links",
    icon: "fa-solid fa-clipboard-list"
  },
  {
    title: "Login In/Sign Up",
    url: "/login",
    cName: "nav-links-mobile",
  }
]

class Navbar extends Component {

  //this is creating our click state for the Menu bar (hamburger) icon
  //when false: menu bar icon is shown, when clicked (true) - the X icon is shown
  state = {clicked: false};
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked})
  }
  render (){

    return (
      <div className="Navbar">
            <Nav className="NavbarItems">
              <h1 className="navbar-logo">Trippin'</h1>

              <div className="menu-icons" onClick = {this.handleClick}>
                <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
              </div>
              {/* menu items are hidden on mobile devices unless menu bar is clicked. */}
              <ul className={this.state.clicked ? "nav-menu active" : "nav-menu "}>
                {MenuItems.map((item, index) => {
                  return (
                  <li key={index}><Link className={item.cName} to={item.url}><i className={item.icon}></i>{item.title}</Link></li>
                  );
                })}
                <Authentication />
              </ul>
            </Nav>
      </div>
    );
  }
}

  export default Navbar;