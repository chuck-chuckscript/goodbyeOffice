

import { useEffect, useMemo, useState } from 'react';
import FooterUI from '../../footer/FooterUI';
import Header from '../../header/Header';
import Main from '../../main/MainUI';
import eventStyle from './events.module.scss'
import Servies from '../../../service/Service';
import { PostPreview } from './PostPreview/PostPreview';

import { Center, Spinner } from '@chakra-ui/react';
import { IoLogoVk } from 'react-icons/io5';
import { BsYoutube } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Events() {

    const [events, setEvents] = useState([]);
    const [isLoading, setLoad] = useState(false);

    const getPost = async () => {
        setLoad(true);
        let response = await Servies.getEvents();

        if(response.status === 200){

            setEvents([...response.data]);
        }

        setLoad(false);
        
    }
    useEffect(() => {
        document.title = 'События'
        
        getPost()

    }, []);


    const allEvents = useMemo(() => {
        return events.map(el => <PostPreview key={el.post_id} id={el.post_id} title={el.post_title}/>)
    }, [events]);

    return (<div className={eventStyle.eventContainer}>
        <Header social={true} connection colorBg={'black'} color={'black'} relative={true}>

        <Link to={'/services'}>Услуги</Link>
        <Link to={'/photo'}>Фото</Link>
        <Link to={'/contacts'}>Контакты</Link>
        <Link to={'/uniform'} style={{color: '#FFCF23'}}>Заказ формы</Link>
        </Header>
        <Main className={eventStyle.main}>
        <h1 className={eventStyle.head}>
            <span>События</span>
        
            <div className={eventStyle.links}>
                <Link to={'https://vk.com/goodbyeofficefootball'}><IoLogoVk color='rgb(77, 132, 252)'/></Link>
                <Link to={'https://www.youtube.com/@fcgoodbyeoffice'}><BsYoutube color='red'/></Link>
            </div>
        </h1>  
        {
            isLoading ? <Center><Spinner size={'lg'}/></Center> : 
            <>
                
                {
                    allEvents.length !== 0 ? allEvents : <Center><h1>Нет событий</h1></Center>
                }
            </>
            
        }

        </Main>
        <FooterUI></FooterUI>
    </div>);
}

export default Events;