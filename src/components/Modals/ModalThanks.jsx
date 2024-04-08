import { useContext } from 'react'

import { Link } from 'react-router-dom';
import { FaYoutube, FaWhatsapp} from "react-icons/fa";
import { IoLogoVk } from 'react-icons/io5';
import { Modal, ModalCloseButton, ModalContent, ModalOverlay, Stack, Text} from '@chakra-ui/react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import modalStyle from './modal.module.scss'
export const ModalThanks = observer(() => {
 
    const {store} = useContext(Context); 
 return (
    <Modal isOpen={store.modalThanksIsOpen} autoFocus={false} returnFocusOnClose={false} onClose={() => store.setModal_Thanks(false)} isCentered>
      <ModalOverlay/>
        <ModalContent border={'2px solid #FFCF23'} bg={'white'} maxW={600}>
            <ModalCloseButton/> 
            <Stack direction={['column']} alignItems={'center'} p={10}>
              <h1>Спасибо за заказ!</h1>
              <Text align={'center'} whiteSpace={'pre-line'} marginBottom={5}>
                Ваша заявка получена.
                <br/>
                Менеджер свяжется с Вами в ближайшее время.
              </Text>
              <div className={modalStyle.links}>
                <Link target='_blank' to={'https://www.youtube.com/@fcgoodbyeoffice'}><FaYoutube/></Link>
                <Link target='_blank' to={'https://wa.me/79851399300'}><FaWhatsapp/></Link>
                <Link target='_blank'z to={'https://vk.com/fc_goodbye_office'}><IoLogoVk/></Link>

              </div>
            </Stack>
        </ModalContent>
      </Modal>
  )
})
