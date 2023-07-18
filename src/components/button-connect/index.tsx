import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROOM_ROUTE } from '../../routers/routers'
import { IButtonConnect } from '../../types'

const ButtonConnect: FC<IButtonConnect> = ({type, userName, idRoom, isActive}) => {
  const navigate = useNavigate()

  function Connection() {
    sessionStorage.setItem('nameUser', userName.trim())
    sessionStorage.setItem('idRoom', idRoom.trim())
    sessionStorage.setItem('type', type)
    navigate(ROOM_ROUTE + `/${idRoom}`)
  }

  return (
    <button onClick={Connection} disabled={ isActive } className='neon'>Войти в комнату</button>
  )
}

export default ButtonConnect