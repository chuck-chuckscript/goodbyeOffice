
import Header from '../../header/Header';
import MainUI from '../../main/MainUI';

import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from '../../..';

import { AuthForm } from '../../UI/form/AuthForm';

import adminStyle from './adminPage.module.scss'
import { Button, Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import Servies from '../../../service/Service';
import { CreateAlbum } from '../../UI/form/CreateAlbum';
import { CardCreate } from '../../UI/form/CardCreate';
import { Link } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import { CreateEvent } from '../../UI/form/CreateEvent';
export const AdminPanel = observer(() => {
  const {store} = useContext(Context);


  useEffect(() => {
    store.checkAuth();
  }, [])
  
  
  return (
    <div className='page'>
        <Header color={'black'} relative={true} auth={<Button onClick={() => {
                  Servies.logout();
                  store.setAuth(false);
                }}>Выйти</Button>}></Header>
        <MainUI className={adminStyle.main}>
              {store.auth ? <>
                
                <div className={adminStyle.menu}>
                  <Swiper
                    breakpoints={
                      {
                        720: {
                          slidesPerView: 2
                        },
                        320: {
                          slidesPerView: 1
                        }
                      }
                    }
                    slidesPerView={2}
                    spaceBetween={5}
                    modules={[Pagination]}
                    pagination
                  >
                  <SwiperSlide><Link to={'/panel-create-post'}>Создать событие</Link></SwiperSlide>
                  <SwiperSlide><Link to={'/panel-albums'}>Список альбомов</Link></SwiperSlide>
                  <SwiperSlide><Link to={'/panel-comments'}>Список комментариев (модерация)</Link></SwiperSlide>
                  <SwiperSlide><Link to={'/panel-services'}>Список услуг</Link></SwiperSlide>
                  <SwiperSlide><Link to={'/panel-post'}>Список событий</Link></SwiperSlide>
                  </Swiper>
                </div>



                <div className={adminStyle.funcGrid}>
                    <Accordion allowToggle >
                      <AccordionItem>
                        <h2>
                          <AccordionButton _expanded={{bg: 'rgba(0, 0, 0, 0.04)'}}>
                            <Box as='span' flex={1} textAlign={'left'}>Создать альбом</Box><AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel justifyContent={'center'} display={'flex'} p={10} border={'1px solid'} borderEndEndRadius={10} borderEndStartRadius={10} borderColor={'rgba(0, 0, 0, 0.04)'}>
                            <CreateAlbum/>
                        </AccordionPanel>
                      </AccordionItem>
                      <AccordionItem>
                        <h2>
                            <AccordionButton _expanded={{bg: 'rgba(0, 0, 0, 0.04)'}}>
                            <Box as='span' flex={1} textAlign={'left'}>Создать услугу</Box>
                            <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel justifyContent={'center'} display={'flex'} border={'1px solid'} borderEndEndRadius={10} borderEndStartRadius={10} borderColor={'rgba(0, 0, 0, 0.04)'}>
                           <CardCreate/>
                        </AccordionPanel>

                      </AccordionItem>
                    </Accordion>
                </div>
                
                 
              
              </> : 
              
              
              
              <AuthForm className={adminStyle.auth}/>
                
              }
              
              
        </MainUI>






                
    </div>
  )
})
