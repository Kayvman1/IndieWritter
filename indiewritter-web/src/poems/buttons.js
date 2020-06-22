import React from 'react'
import {apiPoemAction} from './lookup'

export function ActionBtn(props){
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const {poem,action, didPerformAction} = props
    const actionDisplay = action.display? action.display: 'action'
    //eslint-disable-next-line
    const likes = poem.likes ? poem.likes : 0
    const display = action.type === 'like' ? `${action.display} ${likes}`: actionDisplay

    const handleApiActionEvent = (response,status)=>{
      console.log(response, status)
      if ((status === 200 || status === 201)&& didPerformAction){
        didPerformAction(response)
      }  
    }
    const handleClick = (event) => {
      event.preventDefault()
      apiPoemAction(poem.id, action.type, handleApiActionEvent)

    }
    return  <button className = {className}  onClick = {handleClick}>    {display} </button>
  }
