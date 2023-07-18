import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { HOME_ROUTE, REG_ROUTE } from '../routers/routers'
import ButtonConnect from '../components/button-connect'

import '../styles/home.css'

export default function Home() {
  const location = useLocation()
  const isReg = location.pathname === REG_ROUTE

  const [ID, setID] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [btnIsActive, setBtnIsActive] = useState<boolean>(true)

  const homeID = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (name.length < 1 || ID.length < 1) {
      return setBtnIsActive(true)
    }
    return setBtnIsActive(false)
  }, [name, ID])

  const uuid = () => {
    return Date.now().toString(16)
  }
  function GenerateId() {
    const id: string = uuid()
    setID(id)
  }

  return (
    <>
      {
        isReg ?
        <>
          <button className='btn__uniq-id' onClick={GenerateId}>Создать уникальный id</button>
          <p className={ID && 'input-custom home__id'}>
            {ID}
            {ID && <button className='home__copy-id' onClick={() => window.navigator.clipboard.writeText(ID)}></button>}
          </p>
        </> :
        <>
          <p className='pg-normal'>Для подключения необходимо ввести идентификатор комнаты и ваше имя</p>
          <input className='input-custom' type="text" placeholder='Идентификатор' value={ID} onChange={(e) => setID(e.target.value)} />
        </>
      }
      <input className='input-custom' placeholder='Введите имя' value={name} onChange={(e) => setName(e.target.value)} />
      <ButtonConnect type={isReg ? 'create' : 'connect'} userName={name} idRoom={ID} isActive={btnIsActive} />
      {
        isReg ?
        <>
          <p className='pg-normal'>Если вам уже прислали идентификатор - <NavLink to={HOME_ROUTE} className='nav-link'>перейдите на страницу подключения</NavLink></p>
        </> :
        <>
          <p className='pg-normal'>Если нет идентификатора - <NavLink to={REG_ROUTE} className='nav-link'>перейдите на страницу его создания</NavLink></p>
        </>
      }
    </>
  )
}
