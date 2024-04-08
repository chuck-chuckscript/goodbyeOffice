import { Button, Input, useToast } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import formStyle from './form.module.scss'
import { FaRegFileImage } from "react-icons/fa";
import Servies from '../../../service/Service';
export const CreateAlbum = () => {

  const toast = useToast();
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    name: '', 

  })

  const changeHandler = useCallback((e) => {

    if(e.target.name === 'files'){
        setForm((prev) => ({...prev, [e.target.name]: [...e.target.files]}))
        return;
    }
    setForm((prev) => ({...prev, [e.target.name]: e.target.value}))
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault();

    try{

        let formData = new FormData();
        formData.append('name', form.name);
        formData.append('access_token', localStorage.getItem('access_token'))

        if(files.length > 0){
            for (let file = 0; file < files.length; file++) {
                formData.append('filesUpload[]', files[file]);
            }
        }
        console.log(formData);

        
        let response = await Servies.addAlbum(formData)

        if(response.status !== 200){
            throw new Error(response.response.data?.message);
        }
        setForm({
            name: '',
        })
        setFiles([]);
        toast({
            status: 'success',
            description: 'Альбом добавлен',
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
    <form className={formStyle.albumCreate} onSubmit={submitHandler}>

        <Input name='name' placeholder='Название альбома' onChange={changeHandler}/>
        <div className={formStyle.fileView}>
            

            {
                files.length > 0 
                ?
                <div className={formStyle.list}>
                    {files.map((img, index) => {

                        let src = URL.createObjectURL(img);

                        return <img src={src} key={index} alt={img.name}/>

                    })}
                </div>
                :
                <div className={formStyle.icon}>
                    <FaRegFileImage/>
                    Загрузите ваши фотографии
                </div>
            }
            
            
            <Input multiple name='files' accept='image/*' type='file' onChange={(e) => setFiles([...e.target.files])}/>
        </div>
        <Button type='submit'>Создать альбом</Button>
    </form>
  )
}
