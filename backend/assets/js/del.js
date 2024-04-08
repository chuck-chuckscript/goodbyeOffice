const delAlb = document.querySelector('#deleteAlb');

const delPost = document.querySelector('#deletePost');


delAlb.addEventListener('submit', async (e) => {
    e.preventDefault()
    let formData = new FormData(delAlb);
    try{
        let response = await fetch('http://fcgoodod.beget.tech/server/deleteAlb', {
            method: 'post',
            body: formData
        })

        if(response.status !== 200){
            let data = await response.json();

            throw new Error('Ошибка: ' + data.message + '. Статус ошибки ' + response.status);
        }
        alert('Альбом удален')
    }
    catch(e){
        alert(e.message);
    }
})

delPost.addEventListener('submit', async (e) => {
    e.preventDefault()
    let formData = new FormData(delPost);
    try{
        let response = await fetch('http://fcgoodod.beget.tech/server/deletePost', {
            method: 'post',
            body: formData
        })


        if(response.status !== 200){
            let data = await response.json();

            throw new Error('Ошибка: ' + data.message + '. Статус ошибки ' + response.status);
        }
        alert('Статья удалена')


    }
    catch(e){
        alert(e.message);
    }
})