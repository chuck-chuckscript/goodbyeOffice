import { memo } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import itemStyle from './com.module.scss';
import { Navigation, Zoom } from 'swiper/modules';
import { imageSrc } from '../../../constans/ImageHost';
export const CommentItem = memo(({name, role, text, date, photos}) => {




    return (
      <article className={itemStyle.item}>

            {photos.length > 1
            
            ?
            <Swiper
            modules={[Zoom, Navigation]}
                className={itemStyle.photos}
                breakpoints={
                    {
                        1000: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 5
                        }
                    }
                }
                zoom={
                    {
                        maxRatio: 3
                    }
                }
            >

                {photos.map((el, i) => <SwiperSlide key={i} className={itemStyle.photo}><div className='swiper-zoom-container'><img src={imageSrc + 'comments/'+el}/></div></SwiperSlide>)}
            

            </Swiper>
            : <img src={imageSrc + 'comments/'+photos[0]} style={{height: 500, width: '100%', borderRadius: 10, marginBottom: 10, objectFit: 'contain'}}/>
            
            }
          
        <div className={itemStyle.userInfo}>
            <span>{name ? name : null}</span>
            <span>{role ? role : null}</span>
        </div>

        <pre>
        {text ? text : null}
        </pre>
        <p className={itemStyle.date}>{Intl.DateTimeFormat('ru-Ru', {
            

            hour: 'numeric',
            minute: 'numeric',
            month: '2-digit', 
            day: '2-digit',
            year: 'numeric',

        }).format(date)}</p>
      </article>
    )
  }
  )