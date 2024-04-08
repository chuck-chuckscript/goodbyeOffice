import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useMemo } from 'react'

import { Context } from '../../..'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../header/Header'
import Main from '../../main/MainUI'
import Servies from '../../../service/Service'
import { Button, Center, Spinner, Table, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import adminStyle from './adminPage.module.scss'
import { useFetchDataChanging } from '../../../hooks/useFetchDataChanging'
export const AdminPost = observer(() => {
  const navigation = useNavigate();
  const toast = useToast();  
  const {store} = useContext(Context);  
  const [data, loading, setData] = useFetchDataChanging(Servies.getEvents); 
  const deleteHandler = async (id, index) => {
    try{
        let data = {
            post_id: id
        }
        let response = await Servies.deletePost(data);

        if(response.status !== 200){
            throw new Error(response.data.message);
        }

        setData((prev) => ([...prev.slice(0, index), ...prev.slice(index + 1)]));
        toast({
            title: 'Удаление успешно',
            status: 'success',
            duration: 5000,
            isClosable: true
        })
    }
    catch(e){
        toast({
            title: 'Ошибка',
            status: 'error',
            description: e.message,
            duration: 5000,
            isClosable: true
        })
    }
  } 
  const uslugi = useMemo(() => {
    return data ? data.map((el, index) => <Tr key={el.post_id}>
        <Td>{el.post_id}</Td>
        <Td><Link to={'/post/'+el.post_id}>{el.post_title}</Link></Td>
        <Td><Button onClick={() => deleteHandler(el.post_id, index)} bg={'#e74040'} color={'white'}>Удалить</Button></Td>
    </Tr>) : null;
  }, [data])
  useEffect(() => {
     const check = async () => {
        await store.checkAuth();
        if(!store.getAuth()){
            navigation('/panel')
        }
     }
     check();
  }, [])  

  return (
    <div className='page'>
        <Header color={'black'} relative={true}>
            <Link to={'/panel'}>Обратно в панель</Link>
        </Header>
        <Main className={adminStyle.main}>
            {
                loading ? <Center><Spinner/></Center> : 
                <>
                    {
                        uslugi?.length > 0 && uslugi ? <Table variant={'striped'} colorScheme={'telegram'}>
                        <Thead>
                            <Tr>
                                <Th>Номер события (ID)</Th>
                                <Th>Название события</Th>
                                <Th>Действия</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {uslugi}
                        </Tbody>
                    </Table> : <Center><h1>Возможно вы не добавили события. Добавьте и возвращайтесь :)</h1></Center>
                    }
                
                </>
            }
            

        </Main>
    </div>
  )
})


