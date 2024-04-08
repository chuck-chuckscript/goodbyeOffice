



import slideS from'./slider.module.scss';


import 'react-multi-carousel/lib/styles.css';

import {Swiper, SwiperSlide} from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { memo, useRef } from 'react';

const breakpoints = {

        

        1200: {
            slidesPerView: 3,
            spaceBetween: 5
        },

        900: {
            slidesPerView: 2,
            spaceBetween: 5
        },
        // when window width is >= 480px
        768: {
            slidesPerView: 2,
            spaceBetween: 5
        },

        320: {
            slidesPerView: 1,
            spaceBetween: 5
        }
}


function SliderUI({children, titleText}) {
    



    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const swiperRef = useRef(null);
    return (<div className={slideS.window}>
        
        <h1>{titleText} 
        
            <div>
                <button ref={navigationPrevRef} onClick={() => swiperRef.current.slidePrev()}><BsArrowLeft/></button>
                <button ref={navigationNextRef} onClick={() => swiperRef.current.slideNext()}><BsArrowRight/></button>
            </div>
        </h1>

            <Swiper
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                    disabledClass: slideS.disabled
                }}
                onBeforeInit={(swiper) => {
                    swiper.navigation.nextEl = navigationNextRef.current
                    swiper.navigation.prevEl = navigationPrevRef.current
                    swiperRef.current = swiper
                }}
                breakpoints={breakpoints}
                direction='horizontal'
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                slidesPerView={3}
                updateOnWindowResize
                effect='flip'  
                className={slideS.wrapper}
            >
              {children.map((e, i)=> <SwiperSlide className={slideS.item} key={i}>{e}</SwiperSlide>)}


        </Swiper>
        
        
    </div>);
}

export default memo(SliderUI);

