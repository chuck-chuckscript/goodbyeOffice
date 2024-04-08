

import inputS from './input.module.css'


function InputUI({value, onChange, textPlaceholder}) {
    return (<input className={inputS.input} value={value} placeholder={textPlaceholder} onChange={(e) => onChange(e.target.value)}/>);
}

export default InputUI;