

import mainS from './main.module.css';




function Main({className, children, ...props}) {
    return (
        <main className={className ? className : mainS.main}>
            {children}
        </main>
        


      );
}

export default Main;