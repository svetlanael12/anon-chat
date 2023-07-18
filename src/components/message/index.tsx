import { FC, useEffect, useState } from 'react';
import './index.css'
import { IMsg } from '../../types';

const Message: FC<IMsg> = ({msg}) => {
  const {username, text} = msg
  const nameUser = sessionStorage.getItem('nameUser')

  const myName = nameUser === username

  const [date, setDate] = useState('')

  useEffect(() => {
    const date = new Date(Date.now())
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    // setDate(`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${hours}:${minute}`)
    setDate(`${hours}:${minute}`)
  }, [msg])

  return (
    <div className={`message ${myName ? 'right' : 'left'}`}>
      <span className={`message__username ${myName && 'me'}`}>{username}</span>
      <p className='message__text'>{text}</p>
      <small className='message__date'>{date}</small>
    </div>
  )
}

export default Message;