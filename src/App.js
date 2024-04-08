import './css/App.css';
import './components/header/Header'
import Header from './components/header/Header';

import Main from './components/main/MainUI';
import FooterUI from './components/footer/FooterUI';
import SliderUI from './components/UI/Slider/SliderUI';
import SliderItem from "./components/UI/Slider/SliderItem";
import ConnectWithCompany from './components/main/ConnectWithCompany/ConnectWithCompany';
import Info from './components/main/Info/Info';
import CupInfo from './components/main/CupInfo/CupInfo';

import Partners from './components/main/Partners/Partners';
import Contacts from './components/main/Contacts/Contacts';
import TopButton from './components/UI/TopButton/TopButton';
import Intro from './components/main/Intro/Intro';
import Mission from './components/main/Mission/Misson';


import { observer } from 'mobx-react-lite';

import {useEffect, useMemo } from 'react';



import Servies from './service/Service';


import { ModalForm } from './components/Modals/ModalForm';

import { ModalThanks } from './components/Modals/ModalThanks';
import { EventPrev } from './components/main/EventPrev/EventPrev';
import { ModalTraining } from './components/Modals/ModalTraining';
import { Link } from 'react-router-dom';
import { useFetchData } from './hooks/useFetchData';
import { imageSrc } from './constans/ImageHost';





const App = () => {





  const [data, loading] = useFetchData(Servies.getServices);
  

  useEffect(() => {
    document.title = 'Главная'

  }, [])





  const memoServices = useMemo(() => {
    return data ? data.map(e => <SliderItem alt={e.service_name} id={e.service_id} key={e.service_id} src={imageSrc + '/services/' + e.service_image} text={'Заказать'} caption={e.service_name} dlcCaption={e.service_price}>
      {e.service_desc}
    </SliderItem>) : null
  }, [data])

  return (
    <div className='page'>
      <ModalForm/>
      <ModalTraining/>
      <ModalThanks/>
      <Header color={'white'}

        activeColor={'black'}
        connection={true}
        social={true}
      >
        <Link to={'/services'}>Услуги</Link>
        <Link to={'/events'}>События</Link>
        <Link to={'/photo'}>Фото</Link>
        <Link to={'/contacts'}>Контакты</Link>
        <Link to={'/uniform'} style={{color: '#FFCF23'}}>Заказ формы</Link>

      </Header>
      <Main>
      <TopButton></TopButton>
            <Intro></Intro>
            <Info></Info>
            <Mission></Mission>


            {memoServices ? 
            
            <SliderUI titleText={'Услуги'}>

            {memoServices}

            </SliderUI>
            :
            null
          
            }
            
            <CupInfo></CupInfo>
            <ConnectWithCompany></ConnectWithCompany>
            <div className='eventPrevHome'>
            <EventPrev/>
            </div>
            
            <Partners caption={'Партнеры'}></Partners>
            <Contacts caption={'Контакты'}></Contacts>
      </Main>
      <FooterUI></FooterUI>
    </div>
  )
}

export default observer(App);
