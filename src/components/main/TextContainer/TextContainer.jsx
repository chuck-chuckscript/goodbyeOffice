


function TextContainer({children, caption, dlcCaption, style}) {
    return (<div className={style}>
        <h1>{caption} {dlcCaption ? <span style={{fontFamily: 'Gilroy', fontWeight:"bold"}}>{Intl.NumberFormat('ru-Ru', {
            currency: 'rub',
            style: 'currency',
            maximumFractionDigits: 0
        }).format(dlcCaption)}</span> : null}</h1>
        <p>{children}</p>
    </div> );
}

export default TextContainer;