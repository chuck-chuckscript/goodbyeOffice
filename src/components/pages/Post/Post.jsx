

import { useEffect, useMemo, useRef, useState } from 'react';
import FooterUI from '../../footer/FooterUI';
import Header from '../../header/Header';
import Main from '../../main/MainUI';
import postPageStyle from './postPage.module.scss'
import Servies from '../../../service/Service';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Navigation, Thumbs, Zoom } from 'swiper/modules';
import {BsYoutube, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import { IoLogoVk } from 'react-icons/io5';

import { Center, Divider, Spinner } from '@chakra-ui/react';
import { imageSrc } from '../../../constans/ImageHost';
import { useFetchData } from '../../../hooks/useFetchData';
import { EventPrev } from '../../main/EventPrev/EventPrev';





function Post() {
    const [content, setContent] = useState([]);
    const sliderRef = useRef(null);

    const nextRef = useRef(null);
    const prevRef = useRef(null);
    const params = useParams();

    const [data, loading] = useFetchData(Servies.getPostById, params.id);
    
    useEffect(() => {

        let content = data?.post_content ? JSON.parse(data.post_content) : null;

        if(content){
            setContent(content)
        }
        console.log(content)
        // console.log(content);
        
    }, [data])
    const convert = useMemo(() => {
        return content.map(el => {
            if(el?.image){
                return <pre key={el.id}>
                    {el.text}
                    <img src={el.image} alt={el.fileName} loading='lazy'/>
                 </pre>
            }

            return <pre key={el.id}>
                {el.text}
            </pre>
            
        })
  }, [content])
    

    return (<div className={postPageStyle.container}>
        <Header social colorBg={'black'} color={'black'} relative={true}>

            <Link to={'/services'}>Услуги</Link>
            <Link to={'/events'}>События</Link>
            <Link to={'/photo'}>Фото</Link>
            <Link to={'/contacts'}>Контакты</Link>
            <Link to={'/uniform'} style={{color: '#FFCF23'}}>Заказ формы</Link>
        </Header>
        <Main className={postPageStyle.main}>


        
        {loading ? <Center><Spinner/></Center> : 
        
        <>
            <h1 className={postPageStyle.title}>
                <span>{data ? data.post_title : null}</span> 
                <div>
                    <Link><IoLogoVk color='rgb(77, 132, 252)'/></Link>
                    <Link><BsYoutube color='red'/></Link>
                </div>
            </h1>
            {convert}

            
        </>
        
        }
         <Divider borderColor={'grey'} margin={'10px 0'}/>
         <EventPrev filterId={params.id} wihoutTitle/>
        </Main>
        <FooterUI></FooterUI>
    </div>);
}

export default Post;