


import { Link } from "react-router-dom";

import albumCss from './album.module.scss'



import { memo, useRef } from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { BsLink, BsArrowLeft, BsArrowRight } from "react-icons/bs";



function Album({album, id, title}) {
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
  };


      

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const swiperRef = useRef(null);
    return (
        <div className={albumCss.albumContrainer} key={id}>

                <div className={albumCss.title}>
                    <Link to={'/album/'+id}>{title}<BsLink style={{marginLeft: 10}}/></Link>
                
                    <div>
                      <button ref={navigationPrevRef} onClick={() => swiperRef.current.slidePrev()}><BsArrowLeft/></button>
                      <button ref={navigationNextRef} onClick={() => swiperRef.current.slideNext()}><BsArrowRight/></button>
                    </div>
                </div>
                
            {/* <img src="http:\\localhost\\assets\\albums\\Бытовые предметы\\облога2.jpg" alt="" /> */}
                
            <div className={albumCss.photoContainer}>
              <Swiper 

                breakpoints={breakpoints}
                direction='horizontal'
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                slidesPerView={3}
                updateOnWindowResize
                className={albumCss.slider}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                  disabledClass: albumCss.disabled

                }}
                onBeforeInit={(swiper) => {
                    swiper.navigation.nextEl = navigationNextRef.current
                    swiper.navigation.prevEl = navigationPrevRef.current
                    swiperRef.current = swiper
                }}

              >
                  {album.map((src, index) => <SwiperSlide className={albumCss.photoCard} key={index}><img src={'http://fcgoodod.beget.tech/server/assets/albums'+src} alt="" /></SwiperSlide>)}

              </Swiper>
                    
            </div>
          </div>
    );
}

export default memo(Album);