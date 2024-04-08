

import buttonStyle from './button.module.css'

const ButtonUI = ({children, ...props}) => {
    return <button className={buttonStyle.btn}>{children}</button>
}

export default ButtonUI;