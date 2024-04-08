function autoResize(elem) {
    elem.style.height = 'auto';
    elem.style.height = (elem.scrollHeight-4) + 'px';
}

const evForm = document.querySelector('#events');
const albForm = document.querySelector('#album');

const fileInput =document.querySelector('#files');

const closeButtons =document.querySelectorAll('.close');

const menuButtons =document.querySelectorAll('header button');

const albumList = document.querySelector('#albumList');

const selectPostList = document.querySelector('#selectPostList');

const selectAlbList = document.querySelector('#selectAlbList');

const albumAdd =document.querySelector('#albumAdd');

const filesAlbumFormCreate = document.querySelector('#album input[type="file"]');


Array.from(closeButtons).forEach(el => el.addEventListener('click', (event) => {
    el.parentElement.classList.remove('open');
}))
Array.from(menuButtons).forEach(el => el.addEventListener('click', (event) => {
    document.querySelector(el.dataset.open).classList.add('open');
}))


evForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let formData = new FormData(evForm);
    try{

        if(!formData.get('name') || !formData.get('time') || !formData.get('start')){
            throw new Error('Заполните форму до конца');
        }

        let response =await fetch('http://fcgoodod.beget.tech/server/eventAdd', {
            method: 'post',
            body: formData
        })

        if(response.status !== 200){
            throw new Error('Ошибка. Статус ошибки ' + response.status);
        }

        alert('Данные добавлены')
        renderCalendar();
        Array.from(evForm.children).forEach(e => e.value = '');
    }
    catch(e){
        alert(e.message)
    }
    

})


filesAlbumFormCreate.addEventListener('change', () => {
    document.querySelector('.fileDiv').innerHTML = '';

    if(filesAlbumFormCreate.files.length > 0){

        for (const file of filesAlbumFormCreate.files) {
            let image = document.createElement('img');
            image.src = URL.createObjectURL(file);
            image.classList.add('fileDiv-file');
            document.querySelector('.fileDiv').appendChild(image)

        }

    }

})

albForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let formData = new FormData(albForm);
    const files = fileInput.files;
    console.log(files)





    formData.delete('files');
    

    try{

        if(!formData.get('name') || files.length == 0){
            throw new Error('Заполните форму до конца');
        }
        for (let x = 0; x < files.length; x++) {
            formData.append("filesUpload[]", files[x]);
        }

        let response =await fetch('http://fcgoodod.beget.tech/server/albumAdd', {
            method: 'post',
            body: formData
        })

        if(response.status !== 200){
            let data = await response.json();

            throw new Error('Ошибка: ' + data.message + '. Статус ошибки ' + response.status);
        }

        alert('Данные добавлены')

        Array.from(evForm.children).forEach(e => e.value = '');
    }
    catch(e){
        alert(e.message)
    }
    

})



window.addEventListener('DOMContentLoaded', async () => {


    try{
        let response = await fetch('http://fcgoodod.beget.tech/server/albumsList').then(res => res.json());
    
        if(Array.isArray(response)){
            for (const object of response) {
                let option = document.createElement('option');
                option.textContent = object.album_name;
                option.value = object.album_id;
                albumList.appendChild(option);
                
            }
            for (const object of response) {
                let option = document.createElement('option');
                option.textContent = object.album_name;
                option.value = object.album_id;
                selectAlbList.appendChild(option);
                
            }

            
        }

        let responseListPost = await fetch('http://fcgoodod.beget.tech/server/postList').then(res => res.json());
        

        if(Array.isArray(responseListPost)){
            for (const object of responseListPost) {
                let option = document.createElement('option');
                option.textContent = object.post_title;
                option.value = object.post_id;
                selectPostList.appendChild(option);
            }
        }
    }
    catch(e){
        console.log(e);
    }
    
    



})