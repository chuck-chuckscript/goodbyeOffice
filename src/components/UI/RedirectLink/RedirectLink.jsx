import { Link } from "react-router-dom";


import rl from './redirectLink.module.css'

function RedirectLink({to,style,children, ...props}) {
    return (<Link className={rl.link} to={to}>{children}</Link>);
}

export default RedirectLink;