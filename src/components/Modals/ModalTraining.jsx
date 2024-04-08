import { useContext, useState } from 'react'
import { Context } from '../..'

import { Button, Checkbox, Input, InputGroup, InputLeftAddon, Modal, ModalCloseButton, ModalContent, ModalOverlay, Stack, useToast} from '@chakra-ui/react';
import Logo from '../header/Logo/Logo';

import { observer } from 'mobx-react-lite';
import Servies from '../../service/Service';
import validator from 'validator';
export const ModalTraining = observer(() => {
  const {store} = useContext(Context);
  const toast = useToast();
  const [form, setForm] = useState({

    name: '',
    email: '',
    phone: '',
    subscribe: false,
    acceptPolicy: false
  })
  const submitHandler = async () => {
    try{


        if(!form.name || !form.email){
            throw new Error('Поля не заполнены до конца');
        }

        if(!validator.isEmail(form.email)){
            throw new Error('Введите корректную почту');
        }

        if(!form.acceptPolicy){
            throw new Error('Необходимо согласие на обработку персональных данных');
        }

        let response = await Servies.addTraining({...form, phone: '+7'+form.phone});

        if(response.status !== 200){
            let data = response.data;
            throw new Error(data.message);

        }
        
        setForm({
            name: '', 
            phone: '',
            email: '',
            acceptPolicy: false,
            subscribe: false
        })
        store.setModal_Training(false);
        store.setModal_Thanks(true);
    }
    catch(e){


        toast({
            position: 'top',
            status: 'error',
            description: e.message,
            isClosable: true,
            duration: 5000
        })
    }
  }

  const formHandler = (e) => {

    if(e.target.name === 'acceptPolicy' || e.target.name === 'subscribe'){
        setForm((prev) => ({...prev, [e.target.name]: e.target.checked}))


        return;
    }

    setForm((prev) => ({...prev, [e.target.name]: e.target.value}))
    
  }
  return (
    <Modal isOpen={store.modalTrainingIsOpen} autoFocus={false} returnFocusOnClose={false} isCentered onClose={(e) => {
        store.setModal_Training(false)
      }}>
          <ModalOverlay/>
          <ModalContent maxW={600} maxH={600} zIndex={102}>
            <Stack className='modalOrder' direction={['column']} align={'center'} spacing={3} p={10}>
              <ModalCloseButton/>
              <Logo noRedirect/>

                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    submitHandler();
                }}>
                    <Stack width={'100%'} direction={['column']} align={'center'} spacing={3}>
                        <Input placeholder='Имя' autoComplete='on' value={form.name} name='name' onChange={formHandler} borderRadius={20}/>
                        <InputGroup >
                                <InputLeftAddon borderLeftRadius={20}>
                            +7
                            </InputLeftAddon>
                            <Input type='tel' name='phone' autoComplete='on' value={form.phone} onChange={formHandler}  placeholder='961123344' borderRightRadius={20}/>
                        </InputGroup>
                        <Input placeholder='Почта' type='email' autoComplete='on' value={form.email} name='email' onChange={formHandler} borderRadius={20}/>
                        <Checkbox width={'100%'} name='subscribe' isChecked={form.subscribe} onChange={formHandler} colorScheme={'gray'}>Подписаться на новости email и email рассылку</Checkbox>
                        <Checkbox width={'100%'} name='acceptPolicy' isChecked={form.acceptPolicy} onChange={formHandler} colorScheme={'gray'}>Я согласен на обработку персональных данных</Checkbox>
                        <Button type='submit' width={'100%'} backgroundColor={'#FFCF23'} borderRadius={20}>Записаться</Button> 
                    </Stack>

                </form>
               
            </Stack>
          </ModalContent>
      </Modal>
  )
})
