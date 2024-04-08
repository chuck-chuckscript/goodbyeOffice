import axios from "axios";




const host = 'http://fcgoodod.beget.tech/server/';

class Servies{


    static async sendContacts(data){
        try{
            let response = await axios.postForm(host + 'sendDataUser', {...data})
            return response;
        }
        catch(e){

            return e;
        }
    }

    static async addTraining(data){
        try{
            console.log(data);
            let response = await axios.postForm(host + 'addTraining', {...data});
            return response;
        }
        catch(e){

            return e;
        }
        
    }

    static async unsub(data){
        try{
            let response = await axios.postForm(host + 'unsubMail', {...data})
            return response;
        }
        catch(e){

            return e;
        }
    }

    static async getAlbums(){

        try{
            let response = await axios.get(host+'allAlbums')


            return response;
        }
        catch(e){

            return e;
        }
    }
    static async getEvents(){
        try{
            let response = await axios.get(host+'postList')


            return response;
        }
        catch(e){

            return e;
        }
    }


    static async getEventsPreview(){
        try{
            let response = await axios.get(host+'postListPrev')


            return response;
        }
        catch(e){

            return e;
        }
    }
    static async getAlbumsById(id){

        try{
            let response = await axios.get(host+'album/'+id)


            return response;
        }
        catch(e){

            return e;
        }
    }
    static async getPostById(id){

        try{
            let response = await axios.get(host+'post/'+id)


            return response;
        }
        catch(e){

            return e;
        }
    }
    static async login(data){
        try{
            let response = await axios.postForm(host+'login', data)


            if(response.status === 200){
                let data = response.data;
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('refresh_token', data.refresh_token)
            }

            return response;
        }
        catch(e){

            return e;
        }
    }

    static async logout(){
        try{
            let data = {
                refresh_token: localStorage.getItem('refresh_token')
            }
            let response = await axios.postForm(host+'logout', data);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return response.data;
        }
        catch(e){

            return e;
        }
    }

    static async checkAuth(){
        try{

            let data = {
                access_token: localStorage.getItem('access_token'),
                refresh_token: localStorage.getItem('refresh_token')
            }

            let response = await axios.postForm(host+'checkAuth', data)


            return response;
        }
        catch(e){

            return e;
        }
    }

    static async addService(data){
        try{

            

            let response = await axios.postForm(host+'serviceAdd', {
                ...data,
                access_token: localStorage.getItem('access_token')
            });


            return response;
        }
        catch(e){

            return e;
        }
    }
    
    static async addAlbum(data){
        try{
            
            let response = await axios.postForm(host+'albumAdd/', data);
            

            return response;
        }
        catch(e){

            return e;
        }
    }

    static async getServiceList(){
        try{
            let response = await axios.get(host+'serviceList/');


            return response;
        }
        catch(e){

            return e;
        }
        
    }
    static async getServices(){
        try{
            let response = await axios.get(host+'allServices/');


            return response;
        }
        catch(e){

            return e;
        }
        
    }
    static async sendComment(formData){
        try{
            let response = await axios.postForm(host + 'commentCreate/', formData);
            return response;
        }
        catch(e){

            return e;
        }
    }
    static async sendUniform(formData){
        try{
            let response = await axios.postForm(host + 'addUniform/', formData);
            return response;
        }
        catch(e){

            return e;
        }
    }
    static async serviceById(id){
        try{
            let response = await axios.get(host+'serviceById/'+id);


            return response;
        }
        catch(e){

            return e;
        }
    }
    static async changeServiceById(data){
        try{
            let response = await axios.postForm(host+'changeServiceById/', {
                ...data,
                access_token: localStorage.getItem('access_token')
            });


            return response;
        }
        catch(e){

            return e;
        }
    }
    static async allComments(){
        try{
            let response = await axios.get(host+'allComments/');


            return response;
        }
        catch(e){

            return e;
        }
    }
    static async allCommentsMd(){
        try{
            let response = await axios.get(host+'allCommentsMd/');


            return response;
        }
        catch(e){

            return e;
        }
    }
    static async getLastComment(){
        try{
            let response = await axios.get(host+'lastComment/');


            return response;
        }
        catch(e){

            return e;
        }
    }
    static async acceptComment(data){
        try{
            let response = await axios.postForm(host+'acceptComment/', {
                ...data,
                access_token: localStorage.getItem('access_token')
            });


            return response;
        }
        catch(e){
            return e;
        }
    }

    static async deleteService(data){
        try{
            let response = await axios.postForm(host+'serviceDelete/', {
                ...data,
                access_token: localStorage.getItem('access_token')
            });


            return response;
        }
        catch(e){
            return e;
        }
    }

    static async deleteAlbum(data){
        try{
            let response = await axios.postForm(host+'deleteAlb/', {
                ...data,
                access_token: localStorage.getItem('access_token')
            });


            return response;
        }
        catch(e){
            return e;
        }
    }

    static async deleteComment(data){
        try{
            let response = await axios.postForm(host+'deleteComment/', {
                ...data,
                access_token: localStorage.getItem('access_token')
            });


            return response;
        }
        catch(e){
            return e;
        }
    }

    static async deletePost(data){
        try{
            let response = await axios.postForm(host+'deletePost/', {
                ...data,
                access_token: localStorage.getItem('access_token')
            });


            return response;
        }
        catch(e){
            return e;
        }
    }


    static async createPost(data){
        try{
            let response = await axios.postForm(host+'postAdd/', data);


            return response;
        }
        catch(e){
            return e; 
        }
    }

    static async testgetPost(id){
        try{
            let response = await axios.get('http://localhost/'+'post/'+id);


            return response;
        }
        catch(e){
            return e; 
        }
    }
    
}



export default Servies;