

import { useState } from 'react';

import FooterUI from '../../footer/FooterUI';
import Header from '../../header/Header';
import Main from '../../main/MainUI';
import unsub from './unsub.module.css'
import { navLinks } from '../../../utils/navLinks';
import { Button, Input, Stack, useToast } from '@chakra-ui/react';
import Servies from '../../../service/Service';
import { Link } from 'react-router-dom';

function Unsub() {

    const [value, setValue] = useState('');
    const [submited, setSubmited] = useState(false);
    const toast = useToast();
    const submitHandler = async () => {
        let data = {
            email: value
        }

        try{
            let response = await Servies.unsub(data);


            if(response.status !== 200){

                let message = response.response.data.message || 'Ошибка подключения';
                throw new Error(message);

            }


            setValue('');
            setSubmited(true);
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

    return (<div className={unsub.unsubContainer}>
        <Header social navLinks={navLinks} color={'black'} colorBg={'black'} relative={true}>

            <Link to={'/services'}>Услуги</Link>
            <Link to={'/events'}>События</Link>
            <Link to={'/photo'}>Фото</Link>
            <Link to={'/contacts'}>Контакты</Link>
            <Link to={'/uniform'} style={{color: '#FFCF23'}}>Заказ формы</Link>
        </Header>
        <Main>
            {
                submited ? <div className={unsub.containerForFrom}>
                    <h1>Ты отписался от рассылки</h1>
                    <Link className={unsub.link} to={'/'}>Вернуться на главную</Link>
                </div> : <form className={unsub.containerForFrom} onSubmit={(e) => {
                    e.preventDefault();
                    submitHandler();
                }}>
                    <Stack spacing={3}>
                        <h1>Отписка от рассылки</h1>
                        <p>Нам очень жаль, что ты решил отписаться от нашей рассылки новостей и анонсов. 
                        <br/>Укажи свой email, чтобы больше не получать наши письма.</p>
                        <Input value={value} onChange={(e) => setValue(e.target.value)} variant={'filled'} name='email' borderRadius={20} placeholder='Ваша почта'/>
                        <Button type='submit' borderRadius={20}>Отписаться</Button>
                    </Stack>
                </form>
            }
            
        </Main>
        <FooterUI></FooterUI>
    </div>);
}

export default Unsub;