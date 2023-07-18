import { NavLink } from 'react-router-dom'
import { HOME_ROUTE } from '../routers/routers'
import '../styles/notFound.css'

export default function NotFound() {
  return (
    <div>
      <p className='pg-normal'>Страница не найдена</p>
      <NavLink to={HOME_ROUTE} className='nav-link'>Вернуться на главную</NavLink>
    </div>
  )
}