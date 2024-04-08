import { Button, Input, InputGroup, InputLeftElement, InputRightElement, Textarea, useToast } from '@chakra-ui/react'

import cardStyle from './form.module.scss'
import { useState } from 'react'
import { FaRegFileImage } from "react-icons/fa";
import { BsXLg } from 'react-icons/bs';
import Servies from '../../../service/Service';
export const CardCreate = () => {
  const toast = useToast();  
  const [form, setForm] = useState({
    name: '',
    desc: '',
    price: ''
  })
  const [file, setFile] = useState([]);     
  const changeHandler = (e) => {
        setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
  }
  const submitHandeler = async (e) => {
    e.preventDefault();
    

    let data = {
        
        name: form.name,
        desc: form.desc,
        price: +form.price,
        file: file[0],
    }
    
   
    try{
        let response = await Servies.addService(data);

        if(response.status !== 200){
            throw new Error(response.response.data?.message);
        }
        setForm({
            name: '', 
            desc: '',
            price: ''
        })
        setFile([]);
        toast({
            status: 'success',
            description: 'Услуга добавлена',
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
    <div className={cardStyle.container}>
        <form className={cardStyle.card} onSubmit={submitHandeler}>
            <div className={cardStyle.photo}>
                {
                    file.length > 0 ? 

                    <>
                        {file.map(e => {
                        let src = URL.createObjectURL(e);

                        return <img key={e.name} src={src} alt={e.name}/>
                        })}

                        <button onClick={() => setFile([])}><BsXLg/></button>
                    </>
                    :
                    <>
                    <h1>Загрузите фото
                        <FaRegFileImage/>
                    </h1>
                    <Input accept='image/*' type='file' name='file' onChange={(e) => setFile([...e.target.files])}/>
                    </>
                }

                
            </div>
            <InputGroup className={cardStyle.cardTitle}>
            <Input value={form.name} onChange={changeHandler} name='name' placeholder='Название товара'/>
                <InputRightElement>
                    <Input value={form.price} onChange={changeHandler} placeholder='Цена' name='price'/>
                </InputRightElement>
            </InputGroup>
            <Textarea value={form.desc} onChange={changeHandler} placeholder='Описание услуги' name='desc' resize={'none'}/>
            <Button>Заказать</Button>

            <Button type='submit'>Создать карточку товара</Button>
        </form>
            
    </div>
    
  )
}
