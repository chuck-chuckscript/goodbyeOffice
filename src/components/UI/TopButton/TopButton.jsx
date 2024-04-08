

import {useState } from 'react';
import topBtn from './topBtn.module.css'





function TopButton() {

    let [active, setActive] = useState(false);




    window.addEventListener('scroll', () => {

        if(window.scrollY > 300){
            setActive(true);
        }
        else{
            setActive(false);
        }
    })



    return (<button className={active ? `${topBtn.btn} ${topBtn.active}` : topBtn.btn} onClick={() => window.scrollTo({
        top: 0,
        behavior: "smooth"
    })}>
    </button>);
}

export default TopButton;