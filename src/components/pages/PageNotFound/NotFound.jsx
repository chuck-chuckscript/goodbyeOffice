

import FooterUI from "../../footer/FooterUI";
import Header from "../../header/Header";
import Main from "../../main/MainUI";
import notF from './notFound.module.css'

import { Link } from "react-router-dom";
function NotFound() {
    return (<div className='page'>
        <Header social color={'black'} colorBg={'black'} relative={true}>
        <Link to={'/services'}>Услуги</Link>
        <Link to={'/events'}>События</Link>
        <Link to={'/photo'}>Фото</Link>
        <Link to={'/contacts'}>Контакты</Link>
        <Link to={'/uniform'} style={{color: '#FFCF23'}}>Заказ формы</Link>
        </Header>
        <Main>
            <div className={notF.err404}>
                <p>404</p>
                <h1>Упс, этой страницы не существует</h1>
                <Link className={notF.link} to={'/'}>Вернуться на главную</Link>
            </div>
            
        </Main>
        <FooterUI></FooterUI>
    </div>);
}

export default NotFound;