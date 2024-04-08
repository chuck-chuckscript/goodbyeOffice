import React from 'react'
import { navLinks } from '../../../utils/navLinks'
import Header from '../../header/Header'
import Main from '../../main/MainUI'
import FooterUI from '../../footer/FooterUI'
import { PeopleCard } from '../../UI/PeopleCard/PeopleCard'
import aboutStyle from './aboutTeam.module.scss'

import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay, EffectCoverflow} from 'swiper/modules'
import 'swiper/scss';
import 'swiper/scss/effect-coverflow';
import Marquee from 'react-fast-marquee'

export const AboutTeam = () => {
  return (
    <div className='page'>
        <Header navLinks={navLinks} color={'white'} relative={false}></Header>
        <Main className={aboutStyle.main}>
            
            <section className={aboutStyle.team}>
                <Swiper
                    breakpoints={{
                        1000:{
                            slidesPerView: 3
                        },
                        320:{
                            slidesPerView: 1
                        }
                    }}
                    modules={[Autoplay]}
                    // effect={'coverflow'}
                    
                    autoplay={{
                        pauseOnMouseEnter: false,
                        
                    }}
                    
                    slideActiveClass={aboutStyle.active}
                    loop={true}
                    
                    speed={1000}
                    grabCursor

                    className={aboutStyle.slider}
                    slidesPerView={3}
                >

                    
                <SwiperSlide className={aboutStyle.card}><PeopleCard src={'./images/Член_Команды_1.png'}/></SwiperSlide>
                <SwiperSlide className={aboutStyle.card}><PeopleCard src={'./images/Член_Команды_2.png'}/></SwiperSlide>
                <SwiperSlide className={aboutStyle.card}><PeopleCard src={'./images/Член_Команды_3.png'}/></SwiperSlide>
                <SwiperSlide className={aboutStyle.card}><PeopleCard src={'./images/Член_Команды_4.png'}/></SwiperSlide>
                <SwiperSlide className={aboutStyle.card}><PeopleCard src={'./images/Член_Команды_5.png'}/></SwiperSlide>
                <SwiperSlide className={aboutStyle.card}><PeopleCard src={'./images/Член_Команды_6.png'}/></SwiperSlide>
                <SwiperSlide className={aboutStyle.card}><PeopleCard src={'./images/Член_Команды_7.png'}/></SwiperSlide>
                <SwiperSlide className={aboutStyle.card}><PeopleCard src={'./images/Член_Команды_8.png'}/></SwiperSlide>
                <SwiperSlide className={aboutStyle.card}><PeopleCard src={'./images/Член_Команды_9.png'}/></SwiperSlide>
                <SwiperSlide className={aboutStyle.card}><PeopleCard src={'./images/Член_Команды_10.png'}/></SwiperSlide>
                <SwiperSlide className={aboutStyle.card}><PeopleCard src={'./images/Член_Команды_11.png'}/></SwiperSlide>
                <SwiperSlide className={aboutStyle.card}><PeopleCard src={'./images/Член_Команды_12.png'}/></SwiperSlide>

                </Swiper>
                <div className={aboutStyle.marks}>
                    <Marquee className={aboutStyle.marq} direction={"right"} speed={100}><h1>&nbsp;GOOD<span>BYE</span>OFFICE GOOD<span>BYE</span> OFFICE&nbsp;GOOD<span>BYE</span>OFFICE&nbsp;</h1></Marquee>
                    <Marquee className={aboutStyle.marq} direction={"left"} speed={100}><h1>&nbsp;GOOD<span>BYE</span>OFFICE GOOD<span>BYE</span> OFFICE&nbsp;GOOD<span>BYE</span>OFFICE&nbsp;</h1></Marquee>
                    <Marquee className={aboutStyle.marq} direction={"right"} speed={100}><h1>&nbsp;GOOD<span>BYE</span>OFFICE GOOD<span>BYE</span> OFFICE&nbsp;GOOD<span>BYE</span>OFFICE&nbsp;</h1></Marquee>
                    <Marquee className={aboutStyle.marq} direction={"left"} speed={100}><h1>&nbsp;GOOD<span>BYE</span>OFFICE GOOD<span>BYE</span> OFFICE&nbsp;GOOD<span>BYE</span>OFFICE&nbsp;</h1></Marquee>
                    <Marquee className={aboutStyle.marq} direction={"right"} speed={100}><h1>&nbsp;GOOD<span>BYE</span>OFFICE GOOD<span>BYE</span> OFFICE&nbsp;GOOD<span>BYE</span>OFFICE&nbsp;</h1></Marquee>
                    <Marquee className={aboutStyle.marq} direction={"left"} speed={100}><h1>&nbsp;GOOD<span>BYE</span>OFFICE GOOD<span>BYE</span> OFFICE&nbsp;GOOD<span>BYE</span>OFFICE&nbsp;</h1></Marquee>
                </div>
            </section>
        </Main>
        {/* <FooterUI/> */}
    </div>
  )
}
