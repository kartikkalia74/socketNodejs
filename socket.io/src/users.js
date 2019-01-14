import React ,{Component} from 'react';
import  {users,recieverName} from './connection';

export default class Users extends Component{
    constructor(props){
        super(props);
        this.state={
            userList:[]
        }
    }
         async componentDidMount(){
         await users('kar',(list)=>{
            this.setState({userList:list})
        })
    }
    handleUser =(reciever)=>{
        console.log(reciever,'klk')
        recieverName(reciever)

    }

    render(){  
        return (
          <React.Fragment>
            <h1>users</h1>
          {this.state.userList.map((user)=><li key={user._id}><a onClick={()=>this.handleUser(user.name)} href={`/chat/${user.name}`}>{user.name}</a></li>)}
          </React.Fragment>  
        )
    }
}