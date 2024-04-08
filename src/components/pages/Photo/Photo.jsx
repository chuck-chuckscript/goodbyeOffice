

import FooterUI from "../../footer/FooterUI";
import Header from "../../header/Header";
import Main from "../../main/MainUI";
import 'react-multi-carousel/lib/styles.css';
import photo from './photo.module.scss'
import { Link } from "react-router-dom";

import { useEffect, useMemo } from "react";


// import Album from "./Album/Album";

import { BsYoutube } from "react-icons/bs";
import { IoLogoVk } from 'react-icons/io5'
import Servies from "../../../service/Service.js";
import { Center, Spinner } from "@chakra-ui/react";


import { BsEyeFill } from "react-icons/bs";
import { useFetchData } from "../../../hooks/useFetchData.jsx";

function Photo() {
    
    
   
    
    useEffect(() => {
        document.title = 'Фото'

        
    }, [])
    const [data, loading] = useFetchData(Servies.getAlbums);


    const arrayPhotos = useMemo(() => {
        return data ? data.map((elem) => <Link className={photo.previewAlb} key={elem.album_id} to={'/album/'+elem.album_id}>
            
            <img src={"http://fcgoodod.beget.tech/server/assets/albums"+elem.path} alt={elem.name}/>
            <div className={photo.previewAlbEyeIcon}><BsEyeFill/></div>
            <h2>{elem.name}</h2>
        </Link>) : null;
    }, [data])
    
    return (<div className={photo.photoPageContainer}>
        <Header social={true}  color={'black'} colorBg={'black'} relative={true}>

        <Link to={'/services'}>Услуги</Link>
        <Link to={'/events'}>События</Link>
        <Link to={'/contacts'}>Контакты</Link>
        <Link to={'/uniform'} style={{color: '#FFCF23'}}>Заказ формы</Link>
        </Header>
        <Main className={photo.main}>
          <div className={photo.albums}>
              <div className={photo.albumsTitle}>
                  <h1>Фото</h1>
                  <div className={photo.albumsLinks}>
                        <Link to={'https://vk.com/goodbyeofficefootball'}><IoLogoVk color='rgb(77, 132, 252)'/></Link>
                        <Link to={'https://www.youtube.com/@fcgoodbyeoffice'}><BsYoutube color='red'/></Link>
                  </div>
              </div>
              
              
              {loading ? <Center><Spinner size={'lg'} speed={'0.6s'}/></Center> : 
              

                
                <>
                    {
                        data
                        ? 
                        <div className={photo.albumList}>
                        {arrayPhotos}
                        </div>
                        : <Center><h1>Нет альбомов</h1></Center> 
                        
                        
                        
                    }
                </>
                
                
              }  
              
          </div>
          
        </Main>
        <FooterUI></FooterUI>
    </div>);
}

export default Photo;