import { Button, Checkbox, Input, InputGroup, InputLeftAddon, Select, Stack, useToast } from '@chakra-ui/react';
import {useContext, useEffect, useMemo, useState} from 'react'
import { Context } from '../..';
import validator from 'validator';
import Servies from '../../service/Service';
import { observer } from 'mobx-react-lite';
import { useFetchData } from '../../hooks/useFetchData';

const templateForm = {
    name: '',
    phone: '',
    email: '',
    service: 0,
    subscribe: false,
    acceptPolicy: false
}
export const FormUserData = observer(() => {
    const toast = useToast();

    const {store} = useContext(Context);  
    const [form, setForm] = useState(templateForm)
   

    const formHandler = (event) => {

        if(event.target.name === 'subscribe' || event.target.name === 'acceptPolicy'){
            setForm((prev) => ({...prev, [event.target.name]: event.target.checked}))
            return;
        }
        setForm((prev) => ({...prev, [event.target.name]: event.target.value}))

        
    }
    const submitHandler = async () => {




        try{
            if(!form.name || !form.email || !form.phone || !store.servicesId){
                throw new Error('Поля не заполнены до конца');
            }

            

            if(form.phone.length < 10){
                throw new Error('Некорретный номер телефона')
            }

            if(!validator.isEmail(form.email)){
                throw new Error('Некорретная почта')
            }
            

            if(!form.acceptPolicy){
                throw new Error('Для отпраки данных необходимо согласие на обработку персональных данных');
            }

            let response = await Servies.sendContacts({...form, service: store.servicesId, phone: '+7' + form.phone});
            
          

            if(response.status !== 200){

                throw new Error(response.message);
                
                
            }
            
            store.setServicesId(0);
            store.setModal_Order(false);
            store.setModal_Thanks(true);
            setForm(templateForm);
            
        }
        catch(e){
            // store.createError(e.message);

            let message = e.message;


            toast({
                status: 'error',
                description: message,
                isClosable: true,
                duration: 5000
            })
        }

    }
    const [data, loading] = useFetchData(Servies.getServiceList);
    const memoOptions = useMemo(() => {

        return data ? data.map(e => <option key={e.service_name} value={e.service_id}>{e.service_name}</option>) : null
      }, [data])
    
    
    



  return (
    <form onSubmit={(e) => {e.preventDefault();submitHandler()}}>
        <Stack width={'100%'} direction={['column']} align={'center'} spacing={3}>
            <Input borderRadius={20} value={form.name} autoComplete='on' onChange={formHandler} placeholder='Имя' name='name'/>
                <InputGroup >
                    <InputLeftAddon borderLeftRadius={20}>
                +7
                </InputLeftAddon>
                <Input type='tel' name='phone' autoComplete='on' value={form.phone} onChange={formHandler}  placeholder='961123344' borderRightRadius={20}/>
            </InputGroup>
            <Input borderRadius={20} placeholder='Почта' autoComplete='on' name='email' value={form.email} onChange={formHandler}/>
            <Select value={store.servicesId} onChange={(e) => store.setServicesId(e.target.value)} borderRadius={20} name='service'>
                <option disabled value='0'>Услуга</option>
                {
                    memoOptions?.length > 0 ? memoOptions : null
                }

            </Select>
            <Checkbox width={'100%'} name='subscribe' isChecked={form.subscribe} onChange={formHandler} colorScheme={'gray'}>Подписаться на новости email и email рассылку</Checkbox>
            <Checkbox width={'100%'} name='acceptPolicy' isChecked={form.acceptPolicy} onChange={formHandler} colorScheme={'gray'}>Я согласен на обработку персональных данных</Checkbox>
            <Button width={'100%'} type='submit' backgroundColor={'#FFCF23'} border={'2px solid transparent'} borderRadius={20}>Заказать</Button>           
        </Stack>
    </form>
  )
})
