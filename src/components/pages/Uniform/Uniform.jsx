import React, { useContext, useRef, useState } from 'react'
import Header from '../../header/Header'
import Main from '../../main/MainUI'
import FooterUI from '../../footer/FooterUI'
import { BsArrowRightShort } from "react-icons/bs";
import style from './uniform.module.scss'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Link } from 'react-router-dom';
import { MdOutlineArrowOutward } from "react-icons/md";
import { Pagination } from 'swiper/modules';
import { useFetchData } from '../../../hooks/useFetchData';
import Servies from '../../../service/Service';
import { imageSrc } from '../../../constans/ImageHost';
import { Input, useToast } from '@chakra-ui/react';
import { ModalThanks } from '../../Modals/ModalThanks';
import { observer } from 'mobx-react-lite';
import { Context } from '../../..';
import validator from 'validator';






export const Uniform = observer(() => {
  const {store} = useContext(Context);
  const priceRef = useRef(null); 
  const [data, loading] = useFetchData(Servies.getLastComment);
  
  const [form, setForm] = useState({
    fio: '',
    phone: '',
    email: ''
  })
  const toast = useToast();

  const changeHandler = (e) => {
    setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
  }
  return (
    <div className='page'>
        <ModalThanks/>
        <Header color={'black'} relative={true}
           social
        >
            <button onClick={() => {
                window.scrollTo({
                    "behavior": 'smooth',
                    top: priceRef.current.offsetTop
                })
            }}>Цены</button>
            <Link to={'/comments'}>Отзывы</Link>
        </Header>
        <Main className={style.formPageMain}>


            <article className={style.introBlock}>
                <img src="./images/Закажи форму.png" alt=""/>
                <div>
                    <h1>Закажите форму<br/>для своей<br/>футбольной<br/>команды!</h1>
                    <p>ФОРМА БЕЗ ЛИШНИХ ЛОГОТИПОВ<br/>ОТ ПРОИЗВОДИТЕЛЕЙ</p>
                </div>
            </article>
            <article className={style.exampleUniform}>
                <div className={style.exText}>
                    <h1>Изготовим форму <br/>для вас</h1>
                    <p>
                    Брендированная форма помогает почувствовать свою причастность к команде и осознать свой вклад в победу
                    </p>
                    <article ref={priceRef}>
                        <span>1 комплект</span>
                        <span>{Intl.NumberFormat('ru-Ru', {
                            style: 'currency',
                            currency: 'RUB',
                            maximumFractionDigits: 0
                        }).format(2000)}</span>
                        <span>Заказ</span>
                        <span>от 10 комплектов</span>
                        <span>Дозаказ</span>
                        <span>от 5 комплектов</span>
                    </article>
                    <Swiper


                    modules={[Pagination]}
                    pagination
                    className={style.slider}

                    >
                    <SwiperSlide><img src='./images/photoSliderUniform_1.png' alt=''/></SwiperSlide>
                    <SwiperSlide><img src='./images/photoSliderUniform_2.png' alt=''/></SwiperSlide>
                </Swiper>
                <img src="./images/sizes.png" alt="" className={style.sizes}/>
                <Link><b>Таблица размеров для точного подбора формы</b> <MdOutlineArrowOutward /></Link>
                </div>
                
                <div className={style.exPlus}>
                    <article>
                        <img src='./images/printer_120px.png' alt=''/>
                        <p>Разработаем макет вашей будушей формы</p>
                    </article>
                    <article>
                        <img src='./images/shirt_120px.png' alt=''/>
                        <p>Подберем размер под каждого игрока</p>
                    </article>
                    <article>
                        <img src='./images/truck_120px.png' alt=''/>
                        <p>Доставим комплекты бесплатно</p>
                    </article>
                </div>
            </article>
            <article className={style.formUniform}>
                <img src="./images/Оставить заявку.png" alt=""/>
                <form onSubmit={(e) => {
                    e.preventDefault();
                }}>
                        <h1><span>Оставить&nbsp;</span><span>заявку</span></h1>
                        <p>Получи каталог цветов лучших<br/>футбольных команд мира</p>
                        <Input variant={'flushed'} value={form.fio} onChange={changeHandler} autoComplete='on' type="text" placeholder='ФИО' name='fio'/>
                        <Input variant={'flushed'} value={form.phone} onChange={changeHandler} autoComplete='on' type="text" placeholder='Номер телефона' name='phone'/>
                        <Input variant={'flushed'} value={form.email} onChange={changeHandler} autoComplete='on' type="email" placeholder='Email' name='email'/>
                        <div className={style.btn} onClick={async () => {
                            try{
                                if(!form.fio || !form.email | !form.phone){
                                    throw new Error('Заполните поля до конца');
                                }

                                if(!validator.isEmail(form.email)){
                                    throw new Error('Некорретная почта');
                                }

                                let response = await Servies.sendUniform(form);

                                if(response.status !== 200){
                                    throw new Error(response.response.data?.message);
                                }
                                setForm({
                                    fio: '',
                                    phone: '',
                                    email: ''
                                })
                                store.setModal_Thanks(true);
                                
                            }
                            catch(e){
                                toast({
                                    status: 'error',
                                    description: e.message,
                                    duration: 5000,
                                    isClosable: true
                                })
                            }


                        }}>
                            <span>Отправить заявку</span>
                            <button type='submit'><BsArrowRightShort/></button>
                        </div>
                </form>
            </article>
            
            <article className={style.review}>
                <h1>Отзывы</h1>
                
                <div>
                    {
                        data ? 
                        <>
                        {
                            data.path ? <img src={imageSrc + data.path} alt=""/> : null
                        }
                        </>
                         : null
                    }
                    
                   
                    <p>
                        <span className={style.captainName}>{data ? data.comment_user : null}</span>
                        <span className={style.captainDesc}>{data ? data.comment_user_role : null}</span>
                        <span className={style.reviewText}>{data ? data.comment_desc : null}</span>
                        <Link to={'/comments'}>Все отзывы <MdOutlineArrowOutward /></Link>
                    </p>
                    
                </div>

            </article>

        </Main>
        <FooterUI></FooterUI>
    </div>
  )
})
