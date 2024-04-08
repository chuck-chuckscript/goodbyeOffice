

import { Link } from 'react-router-dom';
import Logo from '../header/Logo/Logo';

import footerS from './footer.module.scss'
import { FaYoutube, FaWhatsapp} from "react-icons/fa";
import { IoLogoVk } from "react-icons/io5";
function FooterUI() {
    return (<div className={footerS.footer}>
        
        <div className={footerS.logoAndLinks}>
            <Logo color={'white'}></Logo>
            <div>
                <Link to={'/policy'} className={footerS.link}>Политика конфиденциальности</Link>
                <Link to={'/unsubscribe'}className={footerS.link}>Отписка от рассылки</Link>
            </div>
        </div>
        <div className={footerS.linksMenu}>
                <Link to={'https://vk.com/fc_goodbye_office'} style={{color: 'rgb(77, 132, 252)', fill: 'rgb(77, 132, 252)'}} className={footerS.link}><IoLogoVk/></Link>
                <Link to={'https://www.youtube.com/@fcgoodbyeoffice'} style={{color: 'white'}} className={footerS.link}><FaYoutube/></Link>
                <Link to={'https://wa.me/79851399300'} style={{color: 'rgb(59, 199, 59)'}} className={footerS.link}><FaWhatsapp/></Link>
        </div>
    </div>);
}

export default FooterUI;