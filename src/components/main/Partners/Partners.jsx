


import {Swiper, SwiperSlide} from 'swiper/react';
import partners from './partnets.module.scss'
import { Autoplay } from 'swiper/modules';

function Partners({caption}) {


    return (<div className={partners.container}>
        <h1>{caption}</h1>
        <Swiper

            breakpoints={{

              1400:{
                slidesPerView: 4
              },
              1000:{
                slidesPerView: 3
              },
              560:{
                slidesPerView: 2
              },

              320:{
                slidesPerView: 1
              }
            }}
            className={partners.slider}
            modules={[Autoplay]}  
            allowTouchMove={false}
            loop={true}
            speed={2000}
            updateOnWindowResize
            autoplay={{

              pauseOnMouseEnter: false,
              disableOnInteraction: false
            }}
        > 

          <SwiperSlide className={partners.slide}><img src="/images/adidas.png" alt="" style={{transform: 'scale(0.4)'}}/></SwiperSlide>
          <SwiperSlide className={partners.slide}><img src="/images/pochta_rossii.png" alt="" style={{transform: 'scale(0.6)'}}/></SwiperSlide>
          <SwiperSlide className={partners.slide}><img src="/images/rosneft.png" alt="" style={{transform: 'scale(0.6)'}}/></SwiperSlide>
          <SwiperSlide className={partners.slide}><img src="/images/vtb_new_logo_2018.png" alt="" style={{transform: 'scale(0.6)'}}/></SwiperSlide>
          <SwiperSlide className={partners.slide}><img src="/images/tele2 1 (1).png" alt="" style={{transform: 'scale(0.6)'}}/></SwiperSlide>
          <SwiperSlide className={partners.slide}><img src="/images/mkb 1.png" alt="" style={{transform: 'scale(0.6)'}}/></SwiperSlide>
          <SwiperSlide className={partners.slide}><img src="/images/lukoil.png" alt="" style={{transform: 'scale(0.6)'}}/></SwiperSlide>
          <SwiperSlide className={partners.slide}><img src="/images/uralsib.png" alt="" style={{transform: 'scale(0.6)'}}/></SwiperSlide>
          <SwiperSlide className={partners.slide}><img src="/images/gazprombank.png" alt="" style={{transform: 'scale(0.65)'}}/></SwiperSlide>
        </Swiper>
        
    </div>);
}

export default Partners;