/*BASICS*/
import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom';
/*CONTEXT*/
import { UserContext } from '../../contexts/UserContext';
/*ELEMENTS*/
import { DuoIcon } from '../elements/DuoIcon';
import { FAFree } from '../elements/FAFree';
/*COMPONENTS*/
import NavbarItemList from './NavbarItemList';
import NavbarSocietePicker from '../atoms/NavbarSocietePicker';

class Menu extends Component {

  state={
    selectingSociete:false,
    menuItems:[
      {
        name:"home",
        active:"home",
        label:"Accueil",
        display:true,
        icon:"fas fa-home",
        color:"blue"
      },
      {
        name:"parc/vehicles",
        active:"parc",
        label:"Parc",
        display:true,
        icon:"fas fa-truck",
        color:"blue"
      },
      {
        name:"entretiens",
        active:"entretiens",
        label:"Entretiens",
        display:true,
        icon:"fas fa-tools",
        color:"blue"
      },
      {
        name:"planning/"+new Date().getFullYear()+"/"+parseInt(new Date().getMonth()+1),
        active:"planning",
        label:"Planning",
        display:true,
        icon:"fas fa-calendar-alt",
        color:"blue"
      },
      {
        name:"accidentologie",
        active:"accidentologie",
        label:"Accidentologie",
        display:true,
        icon:"fas fa-car-crash",
        color:"blue"
      },
      {
        name:"export/vehicles",
        active:"export",
        label:"Exports",
        display:true,
        icon:"far fa-file-excel",
        color:"blue"
      },
      {
        name:"batiments",
        active:"batiments",
        label:"Batiments",
        display:true,
        icon:"fas fa-warehouse",
        color:"blue"
      },
      {
        name:"fournisseurs",
        active:"fournisseurs",
        label:"Fournisseurs",
        display:true,
        icon:"far fa-address-book",
        color:"blue"
      },
      {
        name:"compte",
        active:"compte",
        label:"Compte",
        display:true,
        icon:"fas fa-id-card",
        color:"blue"
      }
    ],
    menuItemsAdmin:[
      {
        name:"administration/accounts",
        active:"administration",
        label:"Administration",
        display:true,
        icon:"fas fa-shield-alt",
        color:"gold"
      }
    ]
  }

  handleSocieteFilterChange = (e, { value }) => this.props.setSocieteFilter(value)

  logout = () => {
    Meteor.logout();
    this.props.client.resetStore();
    this.props.history.push("/")
  }

  getMenuItemsList = () =>{
   return (this.state.menuItems);
  }

  getAdminMenuItemsList = () =>{
    if(this.props.user.isAdmin){
      return (this.state.menuItemsAdmin);
    }else{
      return ([]);
    }
  }

  showFilter = () => {
    this.setState({
      selectingSociete:true
    })
  }
  
  closeFilter = () => {
    this.setState({
      selectingSociete:false
    })
  }

  getFilterNavbarRow = () => {
    if(this.props.user.isOwner){
      return(
        <li className="nav-item" name="filter">
          <a href="#" className="nav-link" onClick={this.showFilter}>
            <FAFree code="fas fa-layer-group" color="gold"/>
            <span className="link-text">{this.props.getSocieteName(this.props.societeFilter).toUpperCase()}</span>
          </a>
        </li>
      )
    }else{
      if(this.props.user.isAdmin && this.props.user.visibility == "noidthisisgroupvisibility"){
        return(
          <li className="nav-item" name="filter">
            <a href="#" className="nav-link" onClick={this.showFilter}>
              <FAFree code="fas fa-layer-group" color="blue"/>
              <span className="link-text">{this.props.getSocieteName(this.props.societeFilter).toUpperCase()}</span>
            </a>
          </li>
        )
      }else{
        return(
          <li className="nav-item" name="filter">
            <a href="#" className="nav-link">
              <FAFree code="fas fa-layer-group" color="blue"/>
              <span className="link-text">{this.props.getSocieteName(this.props.societeFilter).toUpperCase()}</span>
            </a>
          </li>
        )
      }
    }
  }

  getNavbarItems = () => {
    return(
      <Fragment>
        <hr/>
        <NavbarItemList menuItems={this.getMenuItemsList()}/>
      </Fragment>
    )
  }

  getAdminNavbarItems = () => {
    if(this.props.user.isAdmin){
      return(
        <Fragment>
          <hr/>
          <NavbarItemList menuItems={this.getAdminMenuItemsList()}/>
        </Fragment>
      )
    }else{
      return("")
    }
  }

  render() {
    return (
      <Fragment>
        <div className="navbar">
          <ul className="navbar-nav">
            <li className="logo" >
              <a className="nav-link nav-link-logo" key={"logout"}>
                <span className="link-text">WG Logistique</span>
                <DuoIcon name="double-chevron-right" color="blue"/>
              </a>
            </li>
            {this.getFilterNavbarRow()}
            {this.getNavbarItems()}
            {this.getAdminNavbarItems()}
            <li className="nav-item" name={"logout"}>
              <a href="#" className="nav-link" key={"logout"} onClick={this.logout}>
                <FAFree code="fas fa-power-off" color="red"/>
                <span className="link-text">SE DÉCONNECTER</span>
              </a>
            </li>
          </ul>
        </div>
        <NavbarSocietePicker opened={this.state.selectingSociete} close={this.closeFilter} onChange={this.handleSocieteFilterChange} groupAppears={true} value={this.props.societeFilter}/>
      </Fragment>
    )
  }
}

const withUserContext = WrappedComponent => props => (
  <UserContext.Consumer>
      {ctx => <WrappedComponent {...ctx} {...props}/>}
  </UserContext.Consumer>
)

export default wrappedInUserContext = withUserContext(withRouter(Menu));