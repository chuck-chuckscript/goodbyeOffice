
import { Swiper, SwiperSlide } from 'swiper/react'
import event from './eventPrev.module.scss'

import { Navigation } from 'swiper/modules'
import { Link } from 'react-router-dom'
import Servies from '../../../service/Service'
import { imageSrc } from '../../../constans/ImageHost'
import { useFetchData } from '../../../hooks/useFetchData'
import { Center, Spinner } from '@chakra-ui/react'
import { memo, useMemo } from 'react'

export const EventPrev = memo(({filterId, wihoutTitle}) => {


  
  const [data, loading] = useFetchData(Servies.getEventsPreview);

  const dataMemo = useMemo(() => {

    if(filterId){
      return data ? data.filter(el => el.post_id !== filterId).map(el => <SwiperSlide key={el.post_id} className={event.mainSlides}>
        <img src={imageSrc + el.post_prev} alt={el.post_title} loading='lazy'/>
        <div className={event.inf}>
          <h1>{el.post_title}</h1>
          
          <Link target='_blank' to={'/post/'+el.post_id}>Подробнее</Link>
        </div>
      </SwiperSlide>) : null
    }




    return data ? data.map(el => <SwiperSlide key={el.post_id} className={event.mainSlides}>
      <img src={imageSrc + el.post_prev} alt={el.post_title} loading='lazy'/>
      <div className={event.inf}>
        <h1>{el.post_title}</h1>
        
        <Link target='_blank' to={'/post/'+el.post_id}>Подробнее</Link>
      </div>
    </SwiperSlide>) : null

  }, [data, filterId])
  return (
    <section className={event.container}>
      {wihoutTitle ? null : <h1>События</h1>}
      <div className={event.content}>

      {

        loading ? <Center><Spinner/></Center> :

        <>
        {
          data ? <Swiper
          modules={[Navigation]}
          breakpoints={{
            768:{
              slidesPerView: dataMemo?.length > 1 ? 2 : 1
            },
            320:{
              slidesPerView: 1
            }
          }}

          spaceBetween={5}
          updateOnWindowResize
          grabCursor
          className={event.mainSlider}
        >
          {
           dataMemo
          }
          <SwiperSlide className={event.slideMore}><Link to={'/events'}>Посмотреть всё</Link></SwiperSlide>
      </Swiper> : <Center>Нет событий</Center>
        }

        
        </>
      }
     
        
      </div>

    </section>
  )
})
