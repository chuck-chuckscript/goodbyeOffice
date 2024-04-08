
import { useEffect, useRef } from 'react';
import nav from './nav.module.scss'

const Navigation = ({active, color, children}) => {
    
    const ref = useRef(null);

    useEffect(() => {

        if(window.innerWidth <= 1000){
            ref.current.style.backgroundColor = color === 'white' ? 'black' : 'white';
        }


        window.addEventListener('resize', () => {
            if(ref.current){
                if(window.innerWidth <= 1000){
                    ref.current.style.backgroundColor = color === 'white' ? 'black' : 'white';
                }
                else{
                    ref.current.style.backgroundColor = 'transparent';
                }
            }
        })
    }, [color])
    

    return (
        <div ref={ref} className={active ? `${nav.nav} ${nav.active}` : nav.nav} 
        style={{
            color: color, 
        }}>
           {children}
            
        </div>
    )
}

export default Navigation;