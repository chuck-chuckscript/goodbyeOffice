

import sliderBtnS from './sliderBtn.module.css'

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
function SliderButtons({ next, previous, goToSlide, ...rest }) {
    const { carouselState: { currentSlide, totalItems, slidesToShow } } = rest;



    return (<div className={sliderBtnS.group}>
        <button  className={currentSlide === 0 ? sliderBtnS.disable : ''} onClick={() => previous()}><BsArrowLeft /></button>
        <button  className={currentSlide + (slidesToShow) === totalItems ? sliderBtnS.disable : ''} onClick={() => next()}><BsArrowRight/></button>
    </div> );
}

export default SliderButtons;