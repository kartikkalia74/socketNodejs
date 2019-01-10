import React,{Component} from 'react';
/* import io from 'socket.io-client' ;
const socket = io.connect('http://localhost:4001') */
import {sendMessage,senderName} from './connection';
export default class User extends Component{
    constructor(props){
        super(props);
        this.state={
            name:this.props.match.params.name,
            message:'',
            chat:[],
            sender:''
        }
    }
   

    handleClick = (e)=>{
        e.preventDefault()
        console.log("kk",this.state.message,'pp',this.state.sender)
        /* socket.emit('chat',{name:this.state.name,message:this.state.message}) */
        sendMessage(this.state.name,this.state.sender,this.state.message,(data)=>{
                console.log(data,'klkl')
                this.setState({sender:data.sender,chat:'',chat})
            })
    }
    
    handleMessage = (e) =>{
              let msg =e.target.value;
            senderName((senderName)=>{
                console.log(senderName,'handlemessage')
                this.setState({message:msg,sender:senderName})
            })
    }
    
    render(){
        console.log(this.props.match.params.name)
        console.log('render')
        console.log(this.state.sender,'sender')
        return(
            <React.Fragment>
            <h1>Messages</h1>
            <ul className="messageList"></ul>
            <form  onSubmit={(e)=>this.handleSubmit(e)}>
                    <h1>{this.state.name}</h1>
                <label htmlFor="message">message</label>
                <input type="text"  className ="message" onChange={(event)=>this.handleMessage(event)}/>
                <button  onClick={(e)=>this.handleClick(e)}>send</button>
            </form>
            </React.Fragment>
    )}
}