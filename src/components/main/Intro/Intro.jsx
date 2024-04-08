

import intro from './intro.module.scss'
import ReactPlayer from 'react-player/lazy'
import { BsPlay } from 'react-icons/bs';


function Intro() {

    return (<div className={intro.intro}>
        <ReactPlayer muted playsinline loop={true} playIcon={<BsPlay/>} width={'100%'} height={'100%'} playing={true} url={'http://fcgoodod.beget.tech/server/assets/docs/introVideo.mp4'}/>
    </div>);
}

export default Intro;