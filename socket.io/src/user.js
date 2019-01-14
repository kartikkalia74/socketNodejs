import React,{Component} from 'react';
/* import io from 'socket.io-client' ;
const socket = io.connect('http://localhost:4001') */
import {sendMessage, initials } from './connection';
export default class User extends Component{
    constructor(props){
        super(props);
        this.state={
            message:'',
            chat:[],
            sender:'',
            reciever:'',
            chatId:''
            
        }
    }
        async componentDidMount(){
                await initials((memberNames)=>{ 
                    console.log(memberNames)
                    this.setState({sender:memberNames.sender,reciever:memberNames.reciever,chatId:memberNames.chatId })
                })
        }

    handleClick = (e)=>{
        e.preventDefault()
        console.log("kk",this.state.message,'pp',this.state.sender,this.state.reciever)
        /* socket.emit('chat',{name:this.state.name,message:this.state.message}) */
        sendMessage(this.state.sender,this.state.reciever,this.state.message,this.state.chatId,(data)=>{
             console.log(data,'klkl')
            this.setState({sender:data.sender,chat:[...this.state.chat]})
        })
    }
    
    handleMessage = (e) =>{
                 let msg =e.target.value;
                 this.setState({message:msg});
    }
    
    render(){
        console.log(this.props.match.params.name)
        console.log('render')
        console.log(this.state.chatId,'sender')

        return(
            <React.Fragment>
            <h1>Messages</h1>
            <ul className="messageList">{this.state.chat.map((message,index)=><li key={index}>{message.sender.name}:{message.message}</li>)}</ul>
            <form  onSubmit={(e)=>this.handleSubmit(e)}>
                    <h1>{this.state.name}</h1>
                <label htmlFor="message">message</label>
                <input type="text"  className ="message" onChange={(event)=>this.handleMessage(event)}/>
                <button  onClick={(e)=>this.handleClick(e)}>send</button>
            </form>
        </React.Fragment>
    )}
}