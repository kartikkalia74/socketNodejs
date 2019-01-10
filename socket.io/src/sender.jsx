import React,{Component} from 'react';


export default class Sender extends Component{
    constructor(props){
        super(props);
        this.state ={
            senderName:''
        }
    }
    handleName =(e)=>{
        this.setState({senderName:e.target.value})
    }

    render(){
        
        return(
            <React.Fragment>
            <h1>message app</h1>
            <label htmlFor="name">your name</label>
            <input type="text" onChange={(e)=>{this.handleName(e)}} placeholder="your name"/>
            <button ><a href="/users">submit</a></button>

            </React.Fragment>

        )
    }
}