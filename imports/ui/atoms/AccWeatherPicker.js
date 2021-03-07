
import React, { Component} from 'react'
import { Dropdown } from 'semantic-ui-react';
import { UserContext } from '../../contexts/UserContext';
import { gql } from 'apollo-server-express'

class AccWeatherPicker extends Component {

    state = {
        value:"",
        accWeathersRaw:[],
        accWeathersQuery : gql`
            query accWeathers{
                accWeathers{
                    _id
                    name
                }
            }
        `,
    }

    loadAccWeathers = () => {
        this.props.client.query({
            query:this.state.accWeathersQuery,
            fetchPolicy:"network-only"
        }).then(({data})=>{
            this.setState({
                accWeathersRaw:data.accWeathers
            })
            if(this.props.didRefresh != undefined){
                this.props.didRefresh()
            }
        })
    }
    
    componentDidMount = () => {
        this.loadAccWeathers();
    }

    componentDidUpdate = () => {
        if(this.props.needToRefresh){
            this.loadAccWeathers();
        }
    }

    render() {
        return (
            <Dropdown 
                error={this.props.error}
                disabled={this.props.disabled}
                size={(this.props.size != null ? this.props.size : "")}
                style={this.props.style}
                placeholder='Choisir une condition météo'
                search
                selection
                onChange={(this.props.returnRaw ? (e, { value }) => this.props.onChange(value) : this.props.onChange)}
                defaultValue={this.props.defaultValue}
                options={this.state.accWeathersRaw.map(x=>{return{key:(this.props.returnRaw ? x.name : x._id),text:x.name,value:(this.props.returnRaw ? x.name : x._id)}})}
            />
        )
    }
}

const withUserContext = WrappedComponent => props => (
    <UserContext.Consumer>
        {ctx => <WrappedComponent {...ctx} {...props}/>}
    </UserContext.Consumer>
)

export default wrappedInUserContext = withUserContext(AccWeatherPicker);