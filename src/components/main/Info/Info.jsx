
import TextContainer from '../TextContainer/TextContainer';
import ImageBorderCircle from '../ImageBorderCircle/ImageBorderCircle';

import info from './info.module.css'

function Info() {
    return (
        <div className={info.text}>
                <div className={info.textBlock}>
                    <TextContainer 
                        style={info.info} 
                        caption={'CITY FOOTBALL PROGECT'}
                    >
                    Мы предлагаем услуги организации тренировок и товарищеских матчей по футболу. 
                    Если вы хотите получить новые эмоции и разнообразить свои будни, обращайтесь к нам! 
                    Мы предоставляем услуги для людей, которые устали от повседневной рутины и хотят отдохнуть, снять напряжение и насладиться игрой в футбол. 
                    Мы предлагаем профессиональные услуги, которые помогут улучшить ваши навыки и повысить уровень тренировочного процесса. 
                    </TextContainer>

                    <div className={info.totalCounter}>
                        <div><span>300+</span>товарищеских<br/>матчей</div>
                        <div><span>200+</span>репортажей,<br/>съемок</div>
                    </div>
                </div>
                <ImageBorderCircle 
                    src={'./images/DxOs8of7Xrk.jpg'} 
                    style={info.infoImage} 
                    photoFilter={'sepia(50%) saturate(150%)'}>
                </ImageBorderCircle>
            </div>
    );
}

export default Info;