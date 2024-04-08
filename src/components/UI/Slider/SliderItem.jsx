
import { Image } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { memo, useContext } from "react";
import { Context } from "../../..";

function SliderItem({id, alt, text, caption, children,styleTextBlock,src,styleImage, position,dlcCaption}) {
    
    const {store} = useContext(Context);
    
    return (
    <>
        <Image src={src} alt=""/>

        <div>
            <h1><span>{caption}</span> {dlcCaption ? <span style={{fontFamily: 'Gilroy', fontWeight:"bold"}}>{Intl.NumberFormat('ru-Ru', {
                currency: 'rub',
                style: 'currency',
                maximumFractionDigits: 0
            }).format(dlcCaption)}</span> : null}</h1>
            <pre>{children}</pre>
        </div>
        
        <button type="button" onClick={() => {
            store.setModal_Order(true);
            store.setServicesId(id);
        }}>{text}</button>
    </>);
}

export default memo(observer(SliderItem));