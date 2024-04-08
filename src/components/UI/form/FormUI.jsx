import { useState } from "react";
import ButtonUI from "../button/ButtonUI";

import formS from './form.module.scss'

import { Button, Checkbox, Input, InputLeftAddon, InputGroup } from "@chakra-ui/react";

function FormUI({desc}) {
     let options = 
     [
        {
            title: '1',
            value: 0
         }, 
         {
            title: '2',
            value: 1
         }, 
         {
            title: '3',
            value: 2
         }, 
     ];   
     const [selectedValue, setSelectedValue] = useState({
        title: '',
        value: ''
     })   
     let [values, setValues] = useState({
        name: '',
        phone: '',
        email: ''

     })
     
     let [checked1, setChecked1] = useState(false);
     let [checked2, setChecked2] = useState(false);

     
    const setCheckBlock1 = (check) => setChecked1(!check);
    const setCheckBlock2 = (check) => setChecked2(!check);
    
    return (<form className={formS.form}>

        <Input/>
        <InputGroup>
            <InputLeftAddon>
            +7
            </InputLeftAddon>
            <Input type='tel' placeholder='phone number' />
        </InputGroup>
        <Input/>
        
        {desc ? <p className={formS.desc}>{desc}</p> : null}
        <ButtonUI>1</ButtonUI>
    </form>);
}

export default FormUI;