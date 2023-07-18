import { useEffect, useState, useRef } from 'react'
import Chat from '../components/chat';
import { NavLink } from 'react-router-dom';
import {io} from 'socket.io-client';
import { HOME_ROUTE } from '../routers/routers';
import { IMessages } from '../types';

import '../styles/room.css'
import BtnBack from '../components/button-back';

const Room = () => {
  const [socket, setSockect] = useState<{[key: string]: any}>({});
  const [inputText, setInputText] = useState('')

  const [_messages, setMessages] = useState<IMessages[]>([]);
  const [_msg, setMsg] = useState<[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const socket = io("https://anonym-chat.svetlanael12.repl.co", { query: {
      'roomName': sessionStorage.getItem('idRoom'),
      'connectionType': sessionStorage.getItem('type')
    } })
    setSockect(socket)
    socket.on('connect', () => {
      console.log('socket connected');
    });
    socket.on("connect_error", err => {
      if (err.message === 'rooms none') {
        setError(true)
      }
    });
    socket.on("message-to-room", (msg) => {
      setMsg(msg)
      setInputText('')
    });
    return () => {
      socket.close()
    };
  }, [])

  useEffect(() => {
    console.log(!Array.isArray(_msg))
    if (!Array.isArray(_msg)) {
      setMessages([..._messages, _msg])
    }
  }, [_msg])

  const SubmitSocket = () => {
    socket.emit("message-to-room", {
      username: sessionStorage.getItem('nameUser'),
      text: inputText.trim(),
    });
  }

  const clickEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter') {
      SubmitSocket()
    }
  }

  return (
    <div className='room'>
      <BtnBack />
      <div className='room__header'>
        <p>Номер комнаты</p>
        <p className='room__num-room'>{sessionStorage.getItem('idRoom')}</p>
      </div>
        {
        !error ? 
          <>
            <Chat messages={_messages} />
            <div className='room__container-input'>
              <textarea className='room__input' value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={clickEnter}/>
              <button className='room__btn_submit' onClick={SubmitSocket} disabled={inputText ? false : true}></button>
            </div>
          </> :
          <p className='pg-normal'>Похоже, вы неправильно ввели номер комнаты...<NavLink to={HOME_ROUTE} className='nav-link'> Попробуйте еще раз</NavLink></p>
        } 
    </div>
  )
}

export default Room;