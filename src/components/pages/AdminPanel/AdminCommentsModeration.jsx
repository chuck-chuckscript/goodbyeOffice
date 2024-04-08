import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useMemo } from 'react'

import { Context } from '../../..'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../header/Header'
import Main from '../../main/MainUI'
import Servies from '../../../service/Service'
import { Button, Center, Spinner, Stack, Table, Tbody, Td, Th, Thead, Tr, useToast, Link as LinkChakra } from '@chakra-ui/react'
import adminStyle from './adminPage.module.scss'
import { useFetchDataChanging } from '../../../hooks/useFetchDataChanging'
import { imageSrc } from '../../../constans/ImageHost'
export const AdminCommentsModeration = observer(() => {
  const navigation = useNavigate();
  const toast = useToast();  
  const {store} = useContext(Context);  
  const [data, loading, setData] = useFetchDataChanging(Servies.allCommentsMd); 
  const deleteHandler = async (id, index) => {
    try{
        let data = {
            comment_id: id
        }
        let response = await Servies.deleteComment(data);

        if(response.status !== 200){
            throw new Error(response.response.data?.message);
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
  
  const acceptComment = async (id, index) => {
    try{
        let data = {
            comment_id: id
        }
        let response = await Servies.acceptComment(data);

        if(response.status !== 200){
            throw new Error(response.response.data?.message);
        }

        setData((prev) => ([...prev.slice(0, index), ...prev.slice(index + 1)]));
        toast({
            title: 'Добавление успешно',
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
    return data ? data.map((el, index) => <Tr key={el.comment_id}>
        <Td>{el.comment_id}</Td>
        <Td>{el.user}</Td>
        <Td>{el.role}</Td>
        <Td>{el.content}</Td>

        <Td>
            <Stack direction={'row'}>
                <LinkChakra padding={'2px 10px'} fontFamily={'inherit'} fontWeight={'bold'} color={'white'} display={'flex'} alignItems={'center'} borderRadius={10} width={'fit-content'} bg={'#0088cc'} target='_blank' href={imageSrc+'comments_md/'+el.user+el.stamp+'/'}>Фотографии</LinkChakra>
                <Button onClick={() => acceptComment(el.comment_id, index)} bg={'#6cc36f'} color={'white'}>Принять</Button>
                <Button onClick={() => deleteHandler(el.comment_id, index)} bg={'#e74040'} color={'white'}>Отклонить</Button>
            </Stack>
        </Td>
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
        <Header relative={true}>
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
                                <Th>Номер альбома (ID)</Th>
                                <Th>Имя автора</Th>
                                <Th>Роль автора в команде</Th>
                                <Th>Содержание комментария</Th>

                                <Th>Действия</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {uslugi}
                        </Tbody>
                    </Table> : <Center><h1>Возможно не было написано новых комментариев. Хатико ждал и вы подождете :)</h1></Center>
                    }
                
                </>
            }
            

        </Main>
    </div>
  )
})


