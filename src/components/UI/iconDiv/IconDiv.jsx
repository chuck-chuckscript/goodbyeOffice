function IconDiv({src, style, filter}) {
    return (<div className={style} style={{backgroundImage: `url("${src}")`, backgroundSize: 'cover', filter: filter}}></div> );
}

export default IconDiv;