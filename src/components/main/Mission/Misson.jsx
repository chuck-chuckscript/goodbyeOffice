

import ImageBorderCircle from '../ImageBorderCircle/ImageBorderCircle';
import TextContainer from '../TextContainer/TextContainer';
import mission from './mission.module.scss'

function Mission() {
    return (<div className={mission.mission}>
        <TextContainer caption={'Миссия'} style={mission.missionText}>Каждый человек нуждается во времени для отдыха и разнообразия, особенно при интенсивном рабочем графике. С этой целью мы предоставляем нашим клиентам возможность отвлечься от обыденности офисной жизни и испытать настоящее удовольствие от игры в футбол в неформальной обстановке. </TextContainer>
        <img src="/images/photo 2.jpg" alt="" />
    </div>);
}

export default Mission;