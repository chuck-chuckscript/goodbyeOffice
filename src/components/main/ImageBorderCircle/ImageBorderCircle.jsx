



function ImageBorderCircle({src, style, position, photoFilter, circleBorder = true, focus, blur}) {
    return (<div className={style} onMouseLeave={() => blur ? blur() : null} onClick={() => blur ? focus() : null} style={{backgroundImage: `url("${src}")`, backgroundSize: 'cover', backgroundPosition: position, filter: photoFilter,borderRadius: circleBorder ? 20: 0}}>

    </div> );
}

export default ImageBorderCircle;