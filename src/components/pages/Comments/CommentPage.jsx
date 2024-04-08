import {useMemo, useState } from 'react'
import comStyle from './com.module.scss'
import Header from '../../header/Header'
import Main from '../../main/MainUI'
import FooterUI from '../../footer/FooterUI'
import { AiOutlinePicture } from "react-icons/ai";
import { Box, Button, Center, Input, Spinner, Stack, Textarea, useToast } from '@chakra-ui/react'
import Servies from '../../../service/Service'
import { CommentItem } from './CommentItem'

import { Link } from 'react-router-dom'
import { useFetchData } from '../../../hooks/useFetchData'
export const CommentPage = () => {

    const [form, setForm] = useState({
        name: '',
        role: '',
        content: '',
        photos: []
    
    
      });
    const toast = useToast();
   const [data, loading] = useFetchData(Servies.allComments); 
   const commArray = useMemo(() => {
        return data ? data.map(el => <CommentItem key={el.stamp} name={el.user} date={el.stamp} role={el.role} text={el.content} photos={el.path}/>) : null
   }, [data])

  const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = (e.target.scrollHeight-4) + 'px';    
  }

  
  const previewImage = useMemo(() => {

    return form.photos.map(e => {
        let src = URL.createObjectURL(e);

        return <img key={e.name} src={src} alt={e.name}/>
    })
  }, [form.photos])


  const formHandler = (e) => {

        if(e.target.name === 'photos'){
            setForm((prev) => ({...prev, [e.target.name]: [...e.target.files]}));
            
            return;
        }

        setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  const submitHandler = async () => {

    try{
        let formData = new FormData();
        formData.append('name', form.name);
        formData.append('role', form.role);
        formData.append('content', form.content);
        formData.append('stamp', new Date().getTime());
        if(form.photos.length > 0){
            for (let index = 0; index < form.photos.length; index++) {
                formData.append('photos[]', form.photos[index]);
            }
        }
        let response = await Servies.sendComment(formData);

        if(response.status !== 200){
            
            throw new Error(response.response.data?.message);
        }
        setForm({
            name: '',
            content: '',
            photos: [],
            role: ''
        })
        toast({
            position: 'top',
            description: 'Ваш отзыв отправлен. Спасибо за отзыв',
            isClosable: true,
            status: 'success'
            
        })
    }
    catch(e){
        toast({
            position: 'top',
            description: e.message,
            isClosable: true,
            status: 'error'
        })
    }
  }

  return (
    <div className='page'>
        <Header social colorBg={'black'} color={'black'} relative={true}>

            <Link to={'/services'}>Услуги</Link>
            <Link to={'/events'}>События</Link>
            <Link to={'/photo'}>Фото</Link>
            <Link to={'/contacts'}>Контакты</Link>
            <Link to={'/uniform'} style={{color: '#FFCF23'}}>Заказ формы</Link>
        </Header>
        <Main className={comStyle.main}>
            

            <form className={comStyle.form} onSubmit={(e) => {
                e.preventDefault();
                submitHandler();
            }}>
                <Stack direction={['column']}>
                    <Input value={form.name} onChange={formHandler} name='name' placeholder='Ваше имя' variant={'filled'}/>
                    <Input value={form.role} onChange={formHandler} name='role' placeholder='Ваша должность в команде' variant={'filled'}/>
                    <div className={comStyle.file}>
                        <div>
                            
                            {form.photos.length === 0 
                                ? <>
                                    <span>Ваши фотографии</span>
                                    <AiOutlinePicture fontSize={40} />
                                </> 
                                : 
                                previewImage
                            }
                        </div>
                        <Input multiple accept='image/*' onChange={formHandler} name='photos' type='file'/>
                    </div>
                    <Textarea value={form.content} onChange={formHandler} name='content' overflowY={'hidden'} resize={'none'} onInput={(e) => autoResize(e)} placeholder='Ваши впечатления от заказа' variant={'filled'}/>
                    <Button type='submit'>Оставить отзыв</Button>
                </Stack>
            </form>

            <section className={comStyle.comments}>
                <h1>Отзывы</h1>
                {loading ? <Center><Spinner size={'lg'}></Spinner></Center> : <>
                
                {data ? commArray : <Box width={'100%'} bg={'#E2E8F0'} padding={10} borderRadius={10} textAlign={'center'}><h1>Нету отзывов</h1></Box>}
                
                </>}
                
            </section>

        </Main>
        <FooterUI></FooterUI>
    </div>
  )
}
