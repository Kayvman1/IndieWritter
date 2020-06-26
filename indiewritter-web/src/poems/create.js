import React from 'react'
import { apiPoemCreate} from './lookup'

export function PoemCreate (props){
    const titleRef = React.createRef()
    const contentRef = React.createRef()
    const {didPost} = props
    
    //backend api request
    const handleSubmit = (event) =>{
      event.preventDefault()
      let title = titleRef.current.value
      let content = contentRef.current.value
      apiPoemCreate({title: title, content: content}, handleBackendUpdate)
  
      titleRef.current.value=''
      contentRef.current.value=''
    }
    //backend api response handler
    const handleBackendUpdate = (response, status) =>{
      if (status ===201)
        didPost(response)
      else{
        alert("this is debug alert 1 comps.js in src poems\n")
        console.log(response)
      }
    }
  
    return (
    <div id = 'form div' className ={props.className}>
      <form onSubmit = {handleSubmit}>
        <textarea ref = {titleRef} placeholder='titleREACT' className = 'form-control' name ='title' required={true}></textarea>
        <textarea ref = {contentRef} className = 'form-control' name ='content' required ={true}></textarea>
        <button type = 'submit' className = 'btn btn-primary my-3'> post </button>
      </form>
    </div>)
  }