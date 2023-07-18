import {FC, useEffect, useRef } from 'react'
import './index.css'
import Message from '../message'
import { IMessages } from '../../types';

interface ChatProps {
  messages: IMessages[];
}

const Chat: FC<ChatProps> = ({messages}) => {
  const chatBlock = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatBlock.current) {
      chatBlock.current.scrollIntoView({block: "end", behavior: "smooth"})
    }
  }, [messages])

  return (
    <div className='room__chat' ref={chatBlock}>
        {
          messages.length > 0 ?
          messages.map((msg, ind) => <Message key={ind} msg={msg} />) :
          <p className='pg-normal'>
            Сообщений пока нет
          </p>
        }
    </div>
  )
}
export default Chat