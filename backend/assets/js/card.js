const serviceForm =document.querySelector('#service');

const previewCard = document.querySelector('.previewCard');

const card = document.querySelector('.card');
const cardTitle = document.querySelector('.card h2');
const cardContentText = document.querySelector('.card pre');
const preContent = document.querySelector('#service pre');
const imageContent = document.querySelector('.card img');
const textareaService = document.querySelector('#service textarea');
const titleInput = document.querySelector('#service input[name="name"]');
const priceInput = document.querySelector('#service input[name="price"]');
const imageInput = document.querySelector('#service input[name="file"]');



imageInput.addEventListener('change', () => {
    if(imageInput.files.length > 0){
        console.log(imageInput.files);
        let image = URL.createObjectURL(imageInput.files[0]);
        
        imageContent.src = image;
    }
    else{
        imageContent.src = '';
    }
})
titleInput.addEventListener('input', () => {
    cardTitle.children[0].textContent = titleInput.value;
})
priceInput.addEventListener('input', () => {

    if(+priceInput.value !== NaN){
        cardTitle.children[1].textContent = Intl.NumberFormat('ru-Ru', {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 0
        }).format(+priceInput.value);
    }
    else{
        cardTitle.children[1].textContent = '';
    }

    
})
textareaService.addEventListener('input', () => {



    preContent.innerHTML = textareaService.value;
    cardContentText.innerHTML = textareaService.value;
})


previewCard.addEventListener('click', () => {
    card.classList.add('active');
})
serviceForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    

    let formData = new FormData(serviceForm);
    try{
        if(!formData.get('name') || !formData.get('file') || !preContent.textContent){
            throw new Error('Заполните данные до конца');
        }

        formData.set('desc', preContent.innerHTML);

        let response = await fetch('http://fcgoodod.beget.tech/server/serviceAdd', {
            method: 'post',
            body: formData
        })


        if(response.status !== 200){
            let data = await response.json();
            throw new Error(data.message);
        }

        alert('Услуга добавлена');
        

    }
    catch(e){
        alert(e.message);
    }
    

})