

import ImageBorderCircle from '../ImageBorderCircle/ImageBorderCircle';
import TextContainer from '../TextContainer/TextContainer';


import cup from './cup.module.scss'
import { BsFillGeoAltFill } from "react-icons/bs";
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../..';
import { Button } from '@chakra-ui/react';

function CupInfo() {

    const {store} = useContext(Context);
    return (
        <div className={cup.cup}>
            <div className={cup.cupInfo}>
                <TextContainer caption={'Тренировка по футболу'}>
                Приглашаем на тренировку два раза в неделю. 
                Занятие длится 1-1,5 часа. 
                За это время вы освоите базовые приемы и тактики игры, а также отработаете их в командной игре. 
                Мы предоставляем оборудованное футбольное поле с искусственным газоном и раздевалку с душевой. А также каждый четверг среди наших команд проводятся товарищеские матчи.
                </TextContainer>
                <div className={cup.infoCupTotalCounter}>
                    <div><span>2 раза</span>в неделю</div> 
                    <div>вт 1 час<br/>чт 1.5 часа</div> 
                    <div><BsFillGeoAltFill/>Коминтерна 15</div>
                </div>

                <Button variant={'unstyled'} onClick={() => store.setModal_Training(true)}>Записаться</Button>
            </div>
            
            <ImageBorderCircle style={cup.cupImage} 
                src={'./images/zRSBKnrrtVE.jpg'} 
                photoFilter={'sepia(50%) saturate(150%)'}></ImageBorderCircle>
        </div>
    );
}

export default observer(CupInfo);


