

import { Link } from 'react-router-dom';
import logoS from './logo.module.scss'






function Logo({color, noRedirect}) {


    return (<Link to={ noRedirect ? '' :'/'} style={{color: color}} className={logoS.logo}>GOOD<span className={logoS.yellow}>BYE</span><br/><span className={logoS.rigth}>OFFICE</span><span className={`${logoS.small} ${logoS.rigth}`}>CITY FOOTBALL PROJECT</span></Link>  );
}

export default Logo;