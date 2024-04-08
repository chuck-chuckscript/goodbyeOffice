import React, { useContext, useState } from 'react'
import { Context } from '../../..';
import { Button, Input, InputGroup, useToast, InputRightAddon, InputRightElement } from '@chakra-ui/react';
import Servies from '../../../service/Service';
import { observer } from 'mobx-react-lite';

export const AuthForm = observer(({className}) => {

    const toast = useToast();
    const [form, setForm] = useState({
        login: '',
        password: ''
    });

    const [show, setShow] = useState(false);

    const changeHandler = (e) => {
        setForm((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const {store} = useContext(Context);
    const submitHandler = async () => {
        try{
            let response = await Servies.login(form);

        if(response.status !== 200){
            throw new Error(response.response.data?.message);
        }

            store.setAuth(true);
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
    <form className={className} onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}>
          <Input autoComplete='on' placeholder='login' onChange={changeHandler} value={form.login} name='login'/>
          <InputGroup>
            <Input autoComplete='on' type={show ? 'text' : 'password'} placeholder='password' onChange={changeHandler} value={form.password} name='password'/>
            <InputRightElement width={'unset'}><button onClick={() => setShow(!show)} type='button'>{show ? 'Скрыть' : 'Показать'}</button></InputRightElement>
          </InputGroup>
          
          <Button type='submit'>Войти</Button>
      </form>
  )
})
