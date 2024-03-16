import React, { useState } from 'react'
import './Display.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
export default function DisplayPassword(prop) {
  const [copied, setCopied] = useState(false)
  const handleCopyClick = async () =>{
    if(prop.password){
       await navigator.clipboard.writeText(prop.password)
       setCopied(true)
       setTimeout(()=> setCopied(false), 1000)
    }

  }

  return (
    <div className='password-display'>
        <span style={{fontSize : 22, fontWeight : 600}}>{prop.password || <span style={{color : 'grey'}}>P4$7w0rD!</span>}</span>
        {copied ? <span>&#10003; Copied</span> :
        <FontAwesomeIcon 
        className='fa-minus' 
        style={{cursor: 'pointer'}}
        icon={faCopy} 
        onClick={handleCopyClick}
        />
        }
        
        
    </div>
  )
}
