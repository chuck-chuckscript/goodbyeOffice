import React, { useContext } from 'react'
import { Context } from '../..'

import { Modal, ModalCloseButton, ModalContent, ModalOverlay, Stack} from '@chakra-ui/react';
import Logo from '../header/Logo/Logo';
import { FormUserData } from '../FormUserData/FormUserData';
import { observer } from 'mobx-react-lite';
export const ModalForm = observer(() => {
  const {store} = useContext(Context);  
  return (
    <Modal isOpen={store.modalOrderIsOpen} autoFocus={false} returnFocusOnClose={false} isCentered onClose={(e) => {
        store.setModal_Order(false)
      }}>
          <ModalOverlay/>
          <ModalContent maxW={600} maxH={600} zIndex={102}>
            <Stack className='modalOrder' direction={['column']} align={'center'} spacing={3} p={10}>
              <ModalCloseButton/>
              <Logo noRedirect/>
              <FormUserData/>
            </Stack>
          </ModalContent>
      </Modal>
  )
})
