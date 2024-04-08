import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import {Input, Textarea, Stack, Button, useToast} from '@chakra-ui/react';
import { BsImageFill, BsXLg } from 'react-icons/bs';
import postStyle from './form.module.scss'
import TextareaAutosize from 'react-textarea-autosize';
import { imageSrc } from '../../../constans/ImageHost';
import Servies from '../../../service/Service';
export const CreateEvent = memo(() => {

  const toast = useToast();
  const [title, setTitle] = useState('');
  const [data, setData] = useState([
    {
        id: new Date().getTime(),
        text: '',
        image: '',
        fileName: ''
    }
  ]);

  const [files, setFiles] = useState([]);
  const changeHandlerText = useCallback((e, id) => {
    setData((prev) => ([...prev.filter(el => {
        if(el.id === id){
            el.text = e.target.value
        }
        return el;
    })]))
  }, [])
  const addImage = (e, id) => {
        
        const file = e.target.files[0];
        setFiles((prev) => ([...prev, file]));
        const src = URL.createObjectURL(file);
        setData(prev => ([...prev.filter(el => {
            if(el.id === id){
                el.image = src;
                el.fileName = file.name
            }
            return el
        })]))
        console.log(files);

  }

  const deleteHandlerImage = useCallback((object) => {
    setFiles((prev) => ([...prev.filter(el => el.name !== object.fileName)]))
    setData(prev => ([...prev.filter(el => {
        if(el.id === object.id){
            el.image = '';
        }
        return el
    })]))

  }, [])
  useEffect(() => {
    console.log(data);
  }, [data])
  const converterTextArea = useMemo(() => {
    return data.map(textarea => <div className={postStyle.block} key={textarea.id}>
        <Stack direction={'row'} alignItems={'center'} marginBottom={'5px'}>
            {textarea.id !== 0 ? <Button colorScheme={'red'} onClick={() => setData((prev) => ([...prev.filter(el => el.id !== textarea.id)]))}>Удалить текст</Button> : null}
            {
                textarea.image ? null : <div className={postStyle.fileViewBlock}>
                    <BsImageFill/>
                    <Input type='file' accept='image/*' onChange={(e) => addImage(e, textarea.id)}/>
                </div>
            }
        </Stack>
        
        
        <Textarea placeholder='Содержание' resize={'none'} value={textarea.text} onChange={(e) => changeHandlerText(e, textarea.id)} as={TextareaAutosize}/>
        {
            textarea.image ? <div className={postStyle.imagePrev}>
                <img src={textarea.image} alt={'image' + textarea.id}/>
                <Button onClick={(e) => deleteHandlerImage(textarea)}><BsXLg/></Button>
            </div> : null
            
        }
    </div>)
  }, [data])

//   useEffect(() => {
//     console.log(data);
//   }, [data])



  
  const createTextArea = () => {
    setData((prev) => ([...prev, {id: new Date().getTime(), text: '', image: '', fileName: ''}]));
  }

  const sendPost = async () => {
    try{
        if(!title){
          throw new Error('У события должно быть название');
        }

        if(!data[0].text){
          throw new Error('У события должно быть хоть какое-то содержание');
        }

        let changedContentSrcs = data;
        changedContentSrcs = changedContentSrcs.map(el => {
            if(el.image){
              let path = `${imageSrc}posts/${title}/${el.fileName}`;
              el.image = path;
            }
            el.text = el.text;  

            
            return el;
        });
        
        
        let postData = {
            title: title,
            content: JSON.stringify(changedContentSrcs),
            files: files, 
            access_token: localStorage.getItem('access_token')
        }
        console.log(postData)
        let response = await Servies.createPost(postData);

        if(response.status !== 200){
          throw new Error(response.response.data?.message);
        }
        setData([
          {
              id: new Date().getTime(),
              text: '',
              image: '',
              fileName: ''
          }
        ]);
        setFiles([]);
        setTitle('');
        toast({
          status: 'success',
          description: 'Событие добавлено',
          duration: 5000,
          isClosable: true
        })
    }
    catch(e){
        toast({
          status: 'error',
          description: e.message,
          duration: 5000,
          isClosable: true
        })
    }
  }

  return (
    <div className={postStyle.createContainer}>
        <div className={postStyle.menu}>
            <Button onClick={sendPost}>Создать пост</Button>
            <Button onClick={createTextArea}>Добавить текст</Button>
        </div>
        
        <div>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Название события'/>
        {converterTextArea}
        </div>
        


    </div>
  )
})
