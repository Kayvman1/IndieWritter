import React from 'react'
import {apiPoemAction} from './lookup'

export function ActionBtn(props){
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const {poem,action, didPerformAction} = props
    const actionDisplay = action.display? action.display: 'action'
    //eslint-disable-next-line
    var likes = poem.likes ? poem.likes : 0

    const handleApiActionEvent = (response,status)=>{
       if ((status === 200 || status === 201)&& didPerformAction){
        didPerformAction(response, status)
      }  
    }
    const handleClick = (event) => {
      event.preventDefault()
      apiPoemAction(poem.id, action.type, handleApiActionEvent)
     


    }

    const display = action.type === 'like' ? `${action.display} ${likes}`: actionDisplay
     
    return  <button className = {className}  onClick = {handleClick}>    {display} </button>
  }
