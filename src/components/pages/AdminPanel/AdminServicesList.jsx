import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useFetchData } from '../../../hooks/useFetchData'
import { Context } from '../../..'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../header/Header'
import Main from '../../main/MainUI'
import Servies from '../../../service/Service'
import { Box, Button, Center, CloseButton, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner, Stack, Table, Tbody, Td, Textarea, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import adminStyle from './adminPage.module.scss'
import { useFetchDataChanging } from '../../../hooks/useFetchDataChanging'
import { imageSrc } from '../../../constans/ImageHost'
export const AdminServicesList = observer(() => {
  const [changeService, setService] = useState({
    id: 0,
    title: '',
    desc: '',
    price: '',
    image: ''
  });
  const [file, setFile] = useState([]);
  const {isOpen,onClose, onOpen} = useDisclosure();  
  const navigation = useNavigate();
  const toast = useToast();  
  const {store} = useContext(Context);  
  const [data, loading, setData] = useFetchDataChanging(Servies.getServiceList); 
  const openModalChangeService = async (id) => {
    onOpen();
    try{
        let response = await Servies.serviceById(id);

        if(response.status !== 200){
            throw new Error(response.response.data?.message);
        }
        const data = response.data;

        setService({
            id: id,
            title: data.service_name,
            price: data.service_price,
            desc: data.service_desc,
            image: imageSrc + 'services/'+data.service_image
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
  const changeImage = (files) => {
    const src = URL.createObjectURL(files[0]);
    setService((prev) => ({...prev, image: src}));
    setFile([...files]);
  }

  const saveEdited = async () => {
        try{
            let editedData = {
                service_id: changeService.id,
                title: changeService.title,
                desc: changeService.desc,
                price: changeService.price,
                file: file[0]
            }

            let response = await Servies.changeServiceById(editedData);

            if(response.status !== 200){
                throw new Error(response.response.data?.message);
            }
            toast({
                title: 'Услуга успешно изменена',
                status: 'success',
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
  
  const deleteHandler = async (id, index) => {
    try{
        let data = {
            service_id: id
        }
        let response = await Servies.deleteService(data);

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
  const changeHandler = (e) => {
    setService((prev) => ({...prev, [e.target.name]: e.target.value}));
  }
  const uslugi = useMemo(() => {
    return data ? data.map((el, index) => <Tr key={el.service_id}>
        <Td>{el.service_id}</Td>
        <Td>{el.service_name}</Td>
        <Td>
            <Stack direction={'row'}>
            <Button onClick={() => openModalChangeService(el.service_id)} colorScheme='telegram' color={'white'}>Редактировать</Button>
            <Button onClick={() => deleteHandler(el.service_id, index)} bg={'#e74040'} color={'white'}>Удалить</Button>
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
        <Modal isOpen={isOpen} isCentered onClose={onClose}>
            <ModalOverlay/>
            <ModalContent p={10} height={'fit-content'}>
                <ModalCloseButton/>
                <Stack direction={'column'}>
                    {changeService.image ? <Box pos={'relative'} w={'100%'} h={200}>
                        <Image width={'100%'} objectFit={'cover'} height={'100%'} src={changeService.image} alt="123" />
                        <CloseButton bg={'#ffcf23'} margin={'5px'} top={0} right={0} pos={'absolute'} onClick={() => setService((prev) => ({...prev, image: ''}))}/>
                    </Box>
                    :
                    <Input type='file' onChange={(e) => changeImage(e.target.files)}/>}
                    <InputGroup>
                        <Input placeholder='Название' name='title' value={changeService.title} onChange={changeHandler}/>
                        <InputRightElement w={'30%'}><Input placeholder='Цена' name='price' onChange={changeHandler} value={changeService.price}/></InputRightElement>
                    </InputGroup>
                    <Textarea height={270} name='desc' onChange={changeHandler}  resize={'none'} value={changeService.desc} placeholder='Описание'></Textarea>
                    <Button onClick={saveEdited}>Сохранить</Button>
                </Stack>
                

            </ModalContent>
        </Modal>
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
                                <Th>Номер услуги (ID)</Th>
                                <Th>Название услуги</Th>
                                <Th>Действия</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {uslugi}
                        </Tbody>
                    </Table> : <Center><h1>Возможно вы не добавили услугу. Добавьте и возвращайтесь :)</h1></Center>
                    }
                
                </>
            }
            

        </Main>
    </div>
  )
})
