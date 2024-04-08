import React, { useContext, useEffect } from 'react'
import { CreateEvent } from '../../UI/form/CreateEvent'
import Main from '../../main/MainUI'
import Header from '../../header/Header'
import { Link } from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import { Context } from '../../..'

export const AdminCreatePost = observer(() => {

  console.log('render parent')
  
  const {store} = useContext(Context);


  useEffect(() => {
    store.checkAuth();
  }, [])

  return (
    <div className='page'>
        <Header relative={true}>
            <Link to={'/panel'}>Обратно в панель</Link>
        </Header>
        <Main>
        <CreateEvent/>
        </Main>
    </div>
  )
})
