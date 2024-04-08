import { makeAutoObservable } from "mobx";
import Servies from "../service/Service";

class Store {


    modalOrderIsOpen = false
    auth = false
    servicesId = 0;
    modalThanksIsOpen = false
    modalTrainingIsOpen = false

    constructor(){
        makeAutoObservable(this);
    }

    setModal_Order(state){
        this.modalOrderIsOpen = state 
    }
    setModal_Training(state){
        this.modalTrainingIsOpen = state 
    }

    setModal_Thanks(state){
        this.modalThanksIsOpen = state 
    }


    setServicesId(id){
        this.servicesId = id
    }
    

    setAuth(state){
        this.auth = state; 
    }
    getAuth(){
        return this.auth;
    }

    async checkAuth(){
        try{
            let response = await Servies.checkAuth();

            if(response.status !== 200){
                let {message} = await response.response.data

                throw new Error(message);
            } 
            let data = response.data;
            
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            this.setAuth(true);

        }
        catch(e){
            this.setAuth(false);
            console.log(e.message);
        }
        


    }

  


}

export default Store;