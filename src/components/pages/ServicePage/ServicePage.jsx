import {useMemo} from 'react'
import FooterUI from "../../footer/FooterUI";
import Header from "../../header/Header";
import Main from "../../main/MainUI";

import serviceStyle from './servicePage.module.scss';
import SliderItem from '../../UI/Slider/SliderItem.jsx';
import Servies from '../../../service/Service.js';
import { Center, Spinner } from '@chakra-ui/react';



import { observer } from 'mobx-react-lite';
import { ModalForm } from '../../Modals/ModalForm.jsx';
import { ModalThanks } from '../../Modals/ModalThanks.jsx';
import { Link } from 'react-router-dom';
import { IoLogoVk } from 'react-icons/io5';
import { FaYoutube } from 'react-icons/fa';
import { useFetchData } from '../../../hooks/useFetchData.jsx';
export const ServicePage = observer(() => {

       
    const [data, loading] = useFetchData(Servies.getServices);
    
    const memoServices = useMemo(() => {
        return data ? data.map(e => <div key={e.service_id} className={serviceStyle.item}>
            <SliderItem id={e.service_id} src={'http://fcgoodod.beget.tech/server/assets/services/' + e.service_image} text={'Заказать'} caption={e.service_name} dlcCaption={e.service_price}>
            {e.service_desc}
            </SliderItem>
        </div>) : null
    }, [data])  
  return (
    <div className='page'>
        <ModalForm/>
        <ModalThanks/>
        <Header social colorBg={'black'} color={'black'} relative={true}>
            <Link to={'/events'}>События</Link>
            <Link to={'/photo'}>Фото</Link>
            <Link to={'/contacts'}>Контакты</Link>
            <Link to={'/uniform'} style={{color: '#FFCF23'}}>Заказ формы</Link>
        </Header>
        <Main className={serviceStyle.main}>
            
            <h1 className={serviceStyle.title}><span>Услуги</span>
            
                <div>
                    <Link to={'https://vk.com/fc_goodbye_office'} style={{color: 'rgb(77, 132, 252)'}}><IoLogoVk/></Link>
                    <Link to={'https://www.youtube.com/@fcgoodbyeoffice'} style={{color: 'red'}} ><FaYoutube/></Link>
                </div>
            </h1>

            {loading ? <Center><Spinner size={'lg'}/></Center> : <>
                
                {data 
                    ? 
                    <section className={serviceStyle.services}>
                        {memoServices}
                    </section>
                
                    : <Center><h1>Нету услуг</h1></Center>}
                
                </>}
            

            

        

        </Main>
        <FooterUI></FooterUI>
    </div>
  )
})
