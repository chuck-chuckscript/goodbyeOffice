import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import postPreviewStyle from './postPreview.module.scss'
import { BsFillEyeFill } from "react-icons/bs";
export const PostPreview = memo(({id, title}) => {
  return (
    <Link className={postPreviewStyle.link} to={'/post/'+id}>
        <span>{title}</span>
        <BsFillEyeFill/>
    </Link>
  )
})
