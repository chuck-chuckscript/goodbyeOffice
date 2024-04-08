


const preview = document.querySelector('#preview');
const title = document.getElementById('titlePost');
const content = document.getElementById('contentPost');
const formPost = document.querySelector('#articleForm');
const sliderContainer = document.querySelector('.swiper-container');


const swiper = new Swiper('.mySwiper2', {
    navigation: {

        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'

    },
    thumbs: {
        swiper: {
            el: '.mySwiper',
            spaceBetween: 10,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true
        }
    },
});






const filePost = document.querySelector('#images');

filePost.addEventListener('change', () => {
    swiper.removeAllSlides();
    swiper.thumbs.swiper.removeAllSlides();
    let files = filePost.files;


    if(files.length > 0){
        sliderContainer.classList.add('active');
        for (const file of files) {

            let src = URL.createObjectURL(file);
            
            swiper.appendSlide('<div class="swiper-slide"><img src="' + src + '" alt="Main Slide"></div>');
            swiper.thumbs.swiper.appendSlide('<div class="swiper-slide"><img src="' + src + '" alt="Main Slide"></div>');
        }
        swiper.update();
    }
    else{
        sliderContainer.classList.remove('active');
    }

    

})


title.addEventListener('input', () => {
    document.getElementById('previewTitle').innerText = title.value;
})

content.addEventListener('input', () => {
    document.getElementById('previewContent').innerHTML = content.value;
})


async function publishArticle() {
    

    let formData = new FormData(formPost);
    let files = filePost.files;
    formData.delete('images');

    formData.delete('content');

    formData.append('content', document.querySelector('#previewContent').innerHTML);

    try{
        if(!title.value || !content.value){
            throw new Error('Заполните поля до конца')
        }
    
        if(files){
            for (let x = 0; x < files.length; x++) {
                formData.append("postFiles[]", files[x]);
            }
        }
        
        
        let response = await fetch('http://fcgoodod.beget.tech/server/postAdd', {
            method: 'post',
            body: formData
        })
        console.log(response)
        title.value = '';
        content.value = '';
        filePost.value = null;
    }
    catch(e){
        alert(e.message);
    }
    



}

  function previewArticle() {
    preview.classList.add('active');
}