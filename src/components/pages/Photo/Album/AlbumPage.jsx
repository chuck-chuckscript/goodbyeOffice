import { useMemo, useState, useRef } from 'react'
import Header from '../../../header/Header'
import FooterUI from '../../../footer/FooterUI'
import Main from '../../../main/MainUI'

import { Link, useParams } from 'react-router-dom'
import stylePage from './page.module.scss'
import { BsChevronLeft, BsYoutube } from "react-icons/bs";
import { IoLogoVk } from 'react-icons/io5'
import { Center, Modal, ModalCloseButton, ModalContent, ModalOverlay, Spinner } from '@chakra-ui/react'
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Servies from '../../../../service/Service'
import { useFetchData } from '../../../../hooks/useFetchData'


export const AlbumPage = () => {
  
    let params = useParams();
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const swiperRef = useRef(null);
    const [forModal, setParamsForModal] = useState({
        isOpen: false,
        idSlide: 0
    })
    
    const [data, loading] = useFetchData(Servies.getAlbumsById, params.id);
   

    const closingFunc = (prev) => {
        (setParamsForModal({...prev, isOpen: false}));
    }


    const photosSlidesArray = useMemo(() => {
        return data ? data.path.map((e, index) => <SwiperSlide className={stylePage.sliderItem} key={index}><img alt={'photo ' + index} data-id={index} src={'http://fcgoodod.beget.tech/server/assets/albums'+e}/></SwiperSlide>) : null

    }, [data]);

    const photosImageArray = useMemo(() => {
        return data ? data.path.map((e, index) => <img alt={'photo ' + index} onClick={(prev) => {
            setParamsForModal({idSlide: index, isOpen: true});}} key={index} data-id={e.id} src={'http://fcgoodod.beget.tech/server/assets/albums'+e}/>) : null

    }, [data])
    return (
    <div className='page'>
        {loading ? null :
            <>
        
                {data ? <Modal isOpen={forModal.isOpen} isCentered onClose={closingFunc}>
            <ModalOverlay/>
            
            <ModalContent bg={'transparent'} maxW={'fit-content'} maxH={'fit-content'}>
                
                <ModalCloseButton position={'fixed'} bg={'black'} zIndex={3} color={'white'} size={'lg'}/>
                <div className={stylePage.buttons}>
                    <button ref={navigationPrevRef} onClick={() => swiperRef.current.slidePrev()}><SlArrowLeft/></button>
                    <button ref={navigationNextRef} onClick={() => swiperRef.current.slideNext()}><SlArrowRight/></button>
                </div>
                <Swiper

                    className={stylePage.container}
                    slidesPerView={1}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                        disabledClass: stylePage.disabled
  
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.navigation.nextEl = navigationNextRef.current
                        swiper.navigation.prevEl = navigationPrevRef.current
                        swiperRef.current = swiper
                    }}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}

                    initialSlide={forModal.idSlide}
                    autoHeight
                    updateOnWindowResize

                >
                    {photosSlidesArray}
                </Swiper>


                
            </ModalContent>
        </Modal> : null}
        
            </>
        
    
    
        }
        
        <Header relative={true} social>

            <Link to={'/services'}>Услуги</Link>
            <Link to={'/events'}>События</Link>
            <Link to={'/photo'}>Фото</Link>
            <Link to={'/contacts'}>Контакты</Link>
            <Link to={'/uniform'} style={{color: '#FFCF23'}}>Заказ формы</Link>
        </Header>
        <Main className={stylePage.main}>
            <Link className={stylePage.back} to={'/photo'}><BsChevronLeft className={stylePage.icon}/>Фото</Link>
            {
                loading ? <Center><Spinner/></Center> : <>
                
                    {
                        data ? <section className={stylePage.album}>
                        <h1>
                            <span>{data ? data.name : null}</span>
                            
                            <div>
                                <Link to={'https://vk.com/goodbyeofficefootball'}><IoLogoVk color='rgb(77, 132, 252)'/></Link>
                                <Link to={'https://www.youtube.com/@fcgoodbyeoffice'}><BsYoutube color='red'/></Link>
                            </div>
                        </h1>
                        <div className={stylePage.albumPhotos}>
                            {photosImageArray}
                        </div>
                    </section> : null
                    }
                
                </>
            }
        </Main>
        <FooterUI/>
    </div>
  )
}
