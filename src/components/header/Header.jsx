import header from './header.module.scss';
import Navigation from './navigation/Navigation';
import Burger from '../UI/burger/Burger';
import { useContext, useState } from 'react';
import Logo from './Logo/Logo';

import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { Link } from 'react-router-dom';
import { IoLogoVk } from 'react-icons/io5';
import { FaWhatsapp } from 'react-icons/fa';


const Header = ({children,color, withoutBurger,social,relative, auth, connection, activeColor}) => {
    let [active, setActive] = useState(false);
    const {store} = useContext(Context);
    // let [isFixed, setFixed] = useState(false);
    const toggleActive = () => {
        setActive(!active);
    }


    // useEffect(() => {
        


    //     window.addEventListener('scroll', () => {
    //         if(window.scrollY > 100){
    //             setFixed(true);
    //         }
    //         else{
    //             setFixed(false);
    //         }
    //     })

    // }, [])

    


    return (
        <header className={header.header} style={ relative ? {position: 'relative'} : {position: 'absolute'}}>
            <div className={header.navAndLogo}>
                <Logo color={color}></Logo>
                <Navigation activeColor={activeColor} active={active} color={color}>{children}</Navigation>
            </div>
            <div className={header.burgerAndButtons}>
            {social ? <>
                <Link target='_blank' className={header.socialLink} to={'https://vk.com/fc_goodbye_office'}><IoLogoVk color='rgb(77, 132, 252)'/></Link>
                <Link target='_blank' className={header.socialLink} to={'https://wa.me/79851399300'}><FaWhatsapp color='rgb(59, 199, 59)'/></Link>
            </> : null}
            {connection ? <button 
                className={header.border} 
                onMouseEnter={(event) => event.target.style.color = 'black'} 
                onMouseLeave={event => event.target.style.color = color === 'white' ? 'white' : 'black'} 
                style={{color: color}}
                onClick={() => store.setModal_Training(true)}
            >
                Запись на тренировку
            </button> : null}
            {auth ? 
                 <>
                    {store.getAuth() ? auth : null}
                 </>
                
                : null
            }   
            {withoutBurger ? null : <>
                {children ? <Burger color={color} active={active} toggleActive={toggleActive}></Burger> : null}
            </>}
            </div>
            
        </header>
    )
}
export default observer(Header);