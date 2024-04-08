

import formSingle from './formSingle.module.css'
function FormSingleUI({children, yourFunc}) {
    return (<form className={formSingle.formSingle} onSubmit={yourFunc}>
        {children}
    </form>);
}

export default FormSingleUI;