import React, { Component, Fragment } from 'react'
import { Table, Button, Label, Icon } from 'semantic-ui-react';
import { UserContext } from '../../contexts/UserContext';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';

class EntretienRow extends Component {

    state={
        _id:this.props.entretien._id
    }

    navigateToEntretien = () => {
        this.props.history.push("/entretien/"+this.state._id);
    }

    getOrderState = state => {
        if(state == 1){
            let q = this.props.entretien.commandes.filter(c=>c.status == 1).length;
            if(q>0){
                return (
                    <Table.Cell textAlign="center">
                        <Label color="grey" image>
                            <Icon style={{margin:"0"}} name='clipboard' />
                            <Label.Detail>{q}</Label.Detail>
                        </Label>
                    </Table.Cell>
                )
            }else{
                return(
                    <Table.Cell textAlign="center">
                        <Label image>
                            <Icon style={{margin:"0"}} name='clipboard' />
                            <Label.Detail>{q}</Label.Detail>
                        </Label>
                    </Table.Cell>
                )
            }
        }
        if(state == 2){
            let q = this.props.entretien.commandes.filter(c=>c.status == 2).length;
            if(q>0){
                return(
                    <Table.Cell textAlign="center">
                        <Label color="orange" image>
                            <Icon style={{margin:"0"}} name='truck' />
                            <Label.Detail>{q}</Label.Detail>
                        </Label>
                    </Table.Cell>
                )
            }else{
                return(
                    <Table.Cell textAlign="center">
                        <Label image>
                            <Icon style={{margin:"0"}} name='truck' />
                            <Label.Detail>{q}</Label.Detail>
                        </Label>
                    </Table.Cell>
                )
            }
        }
        if(state == 3){
            let q = this.props.entretien.commandes.filter(c=>c.status == 3).length;
            if(q>0){
                return(
                    <Table.Cell textAlign="center">
                        <Label color="green" image>
                            <Icon style={{margin:"0"}} name='check' />
                            <Label.Detail>{q}</Label.Detail>
                        </Label>
                    </Table.Cell>
                )
            }else{
                return(
                    <Table.Cell textAlign="center">
                        <Label image>
                            <Icon style={{margin:"0"}} name='check' />
                            <Label.Detail>{q}</Label.Detail>
                        </Label>
                    </Table.Cell>
                )
            }
        }
    }

    getSocieteCell = () => {
        if(!this.props.hideSociete){
            return <Table.Cell textAlign="center">{this.props.entretien.societe.name}</Table.Cell>
        }
    }

    render() {
        return (
            <Fragment>
                <Table.Row>
                    {this.getSocieteCell()}
                    <Table.Cell textAlign="center">{this.props.entretien.vehicle.registration}</Table.Cell>
                    <Table.Cell>{this.props.entretien.title}</Table.Cell>
                    <Table.Cell>{this.props.entretien.description.substring(0,128)}</Table.Cell>
                    {this.getOrderState(1)}
                    {this.getOrderState(2)}
                    {this.getOrderState(3)}
                    <Table.Cell style={{textAlign:"center"}}>
                        <Button circular style={{color:"#2980b9"}} inverted icon icon='arrow right' onClick={this.navigateToEntretien}/>
                    </Table.Cell>
                </Table.Row>
            </Fragment>
        )
    }
}

const withUserContext = WrappedComponent => props => (
    <UserContext.Consumer>
        {ctx => <WrappedComponent {...ctx} {...props}/>}
    </UserContext.Consumer>
  )
  
export default wrappedInUserContext = withRouter(withUserContext(EntretienRow));