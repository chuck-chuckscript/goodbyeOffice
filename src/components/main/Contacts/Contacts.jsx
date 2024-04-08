

import { FaYoutube, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { IoLogoVk } from "react-icons/io5";
import { BsFillTelephoneFill, BsFillEnvelopeFill } from "react-icons/bs";

import contacts from './contacts.module.scss'
import { Link } from "react-router-dom";
function Contacts({caption}) {


    return (<div className={contacts.container}>
        <h1>{caption}</h1>
        <div className={contacts.contactInfo}>
            <ul>
                <li><BsFillTelephoneFill className={contacts.icon}/><Link to={'tel:+79851399300'}>+7 (985) 139-93-00</Link></li>
                <li><BsFillEnvelopeFill className={contacts.icon}/><Link to={'mailto:cityfootballprogect@gmail.com'}>cityfootballprogect@gmail.com</Link></li>
                <li><FaMapMarkerAlt className={contacts.icon}/>г. Москва,  улица Коминтерна, д. 15</li>
                
                <div className={contacts.social}>
                    <p>Наши социальные сети</p>
                    <div>
                        <Link to={'https://vk.com/fc_goodbye_office'} style={{color: 'rgb(77, 132, 252)', fill: 'rgb(77, 132, 252)'}}><IoLogoVk/></Link>
                        <Link to={'https://www.youtube.com/@fcgoodbyeoffice'} style={{color: 'white'}}><FaYoutube/></Link>
                        <Link to={'https://wa.me/79851399300'} style={{color: 'rgb(59, 199, 59)'}}><FaWhatsapp/></Link>
                    </div>
                </div>
            </ul>

            <iframe title="Карта" src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad7e2f1a98c78fbc5d1f0a9197a776b5321f268b0c6f3eed7dfb1c53de079f243&amp;source=constructor"></iframe>
        </div>


    </div>);
}

export default Contacts;