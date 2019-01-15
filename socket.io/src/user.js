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
            chatId:null
            
        }
    }
        async componentDidMount(){
                await initials((memberNames)=>{ 
                    console.log(memberNames)
                    this.setState({sender:memberNames.sender,reciever:memberNames.reciever,chatId:memberNames.chatId,chat:memberNames.chat})
                })
        }

    handleClick = (e)=>{
       e.preventDefault()
        console.log("kk",this.state.message,'pp',this.state.sender,this.state.reciever)
        /* socket.emit('chat',{name:this.state.name,message:this.state.message}) */
        sendMessage(this.state.sender,this.state.reciever,this.state.message,this.state.chatId,(data)=>{
             console.log(data.res,'klkl')
            this.setState({chat:[...this.state.chat,data.res]})
        })
    }
    
    handleMessage = (e) =>{
       
                 this.setState({message:e.target.value});
    }
    
    render(){
        console.log(this.props.match.params.name)
        console.log('render')
        console.log(this.state.chatId,'sender',this.state.chat)

        return(
            <React.Fragment>
            <h1>Messages</h1>
            <ul className="messageList">{this.state.chat.map((chat,index)=><li key={index}>{chat.sender.name}:{chat.message}</li>)}</ul>
            <form >
                    <h1>{this.state.name}</h1>
                <label htmlFor="message">message</label>
                <input type="text"  className ="message" onChange={(event)=>this.handleMessage(event)}/>
                <button onClick={(e)=>this.handleClick(e)}>send</button>
            </form>
        </React.Fragment>
    )}
}