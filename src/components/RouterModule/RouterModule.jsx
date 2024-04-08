import { Routes } from "react-router-dom";




function RouterModule({children, ...props}) {
    return (<Routes>
        {children}
    </Routes>);
}

export default RouterModule;