

import { useState } from 'react';
import second from './select.module.scss'
import { BsChevronDown } from "react-icons/bs";
function SelectUI({value, options, funcChange}) {
 
    
  
    let [active, setActive] = useState(false);


    return (<div className={second.select}>
        <div className={second.title} onClick={() => setActive((prev) => !prev)}>
            <div className={second.selectValue}>{value}</div>
            <button type='button' className={active ? `${second.down} ${second.up}` : `${second.down}`} onClick={(e) => {
                e.stopPropagation();
                setActive((prev) => !prev);
            }}><BsChevronDown/></button>
        </div>
        
        <ul className={active ? `${second.values} ${second.active}` : `${second.values}`}>
            
            <li disabled>{value}</li>
            {options.map((elem, index) => <li data-value={elem.value} key={index} onClick={(e) => {
                
                
                if(!e.currentTarget.hasAttribute('disabled')){
                    funcChange({title: e.target.textContent, value: e.target.dataset.value});
                    setActive((prev) => !prev);
                }
            }}>{elem.title}</li>)}
        </ul>
    </div>);
}

export default SelectUI;