

import checkBox from './check.module.css'

function CheckBoxUI({check, text, addCheck}) {

    return (<div className={checkBox.checkContainer}>
        <div className={checkBox.checkBox} onClick={() => addCheck(check)}>{check ? '✓' : ''}</div><p>{text}</p>
    </div>);
}

export default CheckBoxUI;