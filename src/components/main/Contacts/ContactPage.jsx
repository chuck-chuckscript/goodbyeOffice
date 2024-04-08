import React from 'react'
import Header from '../../header/Header'
import Main from '../MainUI'
import FooterUI from '../../footer/FooterUI'

import stylePage from './contactPage.module.scss'
import Contacts from './Contacts'

import { Link } from 'react-router-dom'

export const ContactPage = () => {
  return (
    <div className='page'>
        <Header relative={true} color={'black'} social>
        <Link to={'/services'}>Услуги</Link>
        <Link to={'/events'}>События</Link>
        <Link to={'/photo'}>Фото</Link>
        <Link to={'/contacts'}>Контакты</Link>
        <Link to={'/uniform'} style={{color: '#FFCF23'}}>Заказ формы</Link>
        </Header>
        <Main className={stylePage.main}>
            <section className={stylePage.info}>
              <Contacts caption={'Контакты'}></Contacts>
            </section>
        </Main>
        <FooterUI/>
    </div>
  )
}
