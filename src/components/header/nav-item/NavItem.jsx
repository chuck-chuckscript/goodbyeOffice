
import { Link } from 'react-router-dom';
import itemNav from './nav-item.module.css'



const NavItem = ({children, color, to ,...props}) => {
    
    return (
        <Link to={to} className={itemNav.item} style={{color: color}}>{children}</Link>
    )
}

export default NavItem;