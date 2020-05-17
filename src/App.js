import React from 'react';
import './App.css';
import Chatkit from '@pusher/chatkit'
import MessageList from './component/MessageList'
import SendMessageForm from './component/SendMessageForm'
import RoomList from './component/RoomList'
import NewRoomForm from './component/NewRoomForm'

import { tokenUrl, instanceLocator } from './config'
 class App extends React.Component {

  constructor(){
    super()
    this.state = {
      messages: []

    }
  }

  componentDidMount() {
    const chatManager =  new Chatkit.chatManager({
        instanceLocator, 
        userId: 'zikyel',
        tokenProvider: new Chatkit.TokenProvider({
          url: tokenUrl
        })
    })

    chatManager.connect()
    .then(currentUser => {
      currentUser.subscribeToRoom({
        roomdId: 'd3597227-79be-493a-a961-a8f223ddefd3',
        hooks: {
            onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            })
            }
        }
      })
    })
  }
  render(){
    return (
      <div>
        <RoomList />
        <SendMessageForm />
        <MessageList />
        <NewRoomForm />
      </div>
    );
  }
}
export default App;
