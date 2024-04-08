


import Logo from '../../header/Logo/Logo'
import styleCard from './peopleCard.module.scss'
export const PeopleCard = ({src, alt, scale}) => {






  return (
    <div className={styleCard.card}>
        <img src={src ? src : ''} style={{transform: scale ? `scale(${scale})` : 'scale(1)'}} alt="" className={styleCard.uncolored}/>

    </div>
    )
    
}
