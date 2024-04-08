

import burgerStyle from './burger.module.scss';

const Burger = ({active, toggleActive, color}) => {

   

    return (<button className={burgerStyle.burger} onClick={() => toggleActive()}>
        <span className={active ? burgerStyle.active : ''} style={{backgroundColor: color}}></span>
        </button>)
}
export default Burger;