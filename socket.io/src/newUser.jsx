import React ,{Component} from 'react';
import {sender} from './connection';

export default class NewUser extends Component{
    constructor(props){
        super(props)
        this.state={
            name:''
        }
    }
    handleName =(e)=>{
        let name = e.target.value;
        console.log(name)
        this.setState({name})
       
    }//sending name og user
    handleClick  =()=>{
        sender(this.state.name)
    }
    render(){
        return(
            <React.Fragment>
            <h1>new user</h1>
            <input type="text" className="name" onChange={(event)=>this.handleName(event)}/>
            <button onClick={(event)=>this.handleClick(event)}><a href="/users">submit</a></button>
            </React.Fragment>
        )
    }
}