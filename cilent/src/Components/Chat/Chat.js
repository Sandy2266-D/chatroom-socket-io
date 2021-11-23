import React,{useState,useEffect} from 'react'
import queryString from 'query-string'
import io  from "socket.io-client";
import "./Chat.css"
import InfoBar from "../InfoBar/InfoBar"
import Input from "../Input/Input"
import Messages from "../Messages/Messages"
// import TextContainer from "../TextContainer/TextContainer"

let socket;
const Chat = ({location}) => {
    
    const[name,setName] = useState('')
    const[room,setRoom] = useState('')
    const ENDPOINT = 'https://sandy-chatroom.herokuapp.com/'
    const[message,setMessage]=useState('')
    const[messages,setMessages]=useState([])
    const [users, setUsers] = useState('');

    useEffect(()=>{
        const {name,room} = queryString.parse(location.search)
        // console.log(location.search)
        // console.log(name,room)
        socket = io (ENDPOINT)
        setName(name)
        setRoom(room)
        console.log(socket)

        socket.emit('join', {name,room},()=>{

        })

        return ()=>{
            socket.emit('disconnect')

            socket.off()
        }

        },[ENDPOINT, location.search])

    useEffect(()=>{
        socket.on('message',(message)=>{
         setMessages([...messages, message])   
        })
    }, [messages])
        

//For Sending Message
const sendMessage = (event)=>{
    event.preventDefault();

    if(message){
        socket.emit('sendMessage',message, () => setMessage(''));
    }
}
    // console.log(message, messages);
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                {/* <input value={message}
                 onChange={(event)=>setMessage(event.target.value)}
                 onKeyPress={event =>event.key === 'Enter' ? sendMessage(event) : null }
                 /> */}
                 <Messages messages={messages} name={name}/>
                 <Input message={message} setMessage={setMessage}  sendMessage={sendMessage} />
                 {/* <TextContainer users={users}/> */}
            </div>
        </div>
    )
}

export default Chat
