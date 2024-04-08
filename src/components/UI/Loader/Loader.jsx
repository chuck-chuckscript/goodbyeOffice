

import loader from './loader.module.css';


function Loader() {
    return (
        <div className={loader.circle}>

            <div className={loader.spin}>
            </div>
        </div>
    );
}

export default Loader;
