
import connectWC from './connectWC.module.scss'

import ImageBorderCircle from '../ImageBorderCircle/ImageBorderCircle';






import { FormUserData } from '../../FormUserData/FormUserData';
import { Stack } from '@chakra-ui/react';




function ConnectWithCompany() {


    return (
    <div className={connectWC.connectWithCompany}>
        <div>


            <Stack direction={['column']} spacing={1}>
                <h1>Как связаться с нами?</h1>
                <p>Оставьте свои контактные данные и мы
                свяжемся с вами в ближайшее время</p>
                <FormUserData/>
            </Stack>
            
            
        </div>
        <ImageBorderCircle style={connectWC.connectWithCompanyImage} position={'right bottom'} src={'./images/QOTepW2gm_Y.jpg'}/>
    </div>);
}

export default ConnectWithCompany;