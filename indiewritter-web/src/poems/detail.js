import React, { useState} from 'react'
//import {useEffect} from 'react'

import {ActionBtn} from './buttons'
import {UserLink, UserPicture} from '../profiles'
export function ParentPoem (props) {
    const {poem} =props 
    
    return (poem.parent ? 
      
        <div id = 'PoemParent' className= "p-2 border rounded mt-4 ml-3" > 
           <p className = 'mb-4 small'/>
           <Poem poem = {poem.parent} className = {''} hideActions = {true} isRepub={poem.parent.is_repub}/> 
        </div>
      
      :null)
  }
export  function Poem(props){
    const {poem, didRepost, hideActions} = props
    const [actionPoem, setActionPoem] = useState(poem ? poem : null)
    let className = props.className ? props.className : 'col-10 mx-5 pt-3 col-md-6'
   // className = isRepub === true ? `${className}   : className
    const path = window.location.pathname
    var idRegex = /^[/](\d+)/
    let match = path.match(idRegex)
    
    var isDetail 
    if(match){
      let urlPoemId = parseInt(match[1])
      isDetail = (urlPoemId === poem.id)
    }
  
    const handelPerformAction = (newActionPoem, status) =>{
      if (status === 200)
        setActionPoem(newActionPoem)
      else if (status === 201)
        if (didRepost)
          didRepost(newActionPoem)
      }

    let handleShareClick = (event) => {
      event.preventDefault()    
      window.location.href =`/${poem.id}/`
    }
  
    return (
    <div className = {className}>
    <div className = 'd-flex'>
    <div className = ' mx-1'>
      <UserPicture user = {poem.user} hideActions = {hideActions}></UserPicture>
    </div>

    <div className = 'col-11 '>
      <div id = 'Poem'>
        <h3>{poem.id}-{poem.title}</h3>
        <UserLink is_repub = {poem.is_repub} user = {poem.user}></UserLink>

        <p><big>{poem.content}</big></p>
        <ParentPoem poem = {poem}/>
      </div>
    
    <div id = 'action buttons' className = 'btn btn-group px-0'>
    {actionPoem && hideActions !== true &&   <React.Fragment>
          <ActionBtn poem = {actionPoem} didPerformAction = {handelPerformAction} action ={{type:"like", display : 'Likes'}}/>
          <ActionBtn poem = {actionPoem} didPerformAction = {handelPerformAction} action ={{type:"unlike", display: 'Unlike'}}/>
          <ActionBtn poem = {actionPoem} didPerformAction = {handelPerformAction} action ={{type:"repub", display: 'Repub'}}/>
          </React.Fragment> 
          }
         {!isDetail && <button onClick = {handleShareClick} className = 'btn btn-outline-primary btn-sm'>View</button>
    }</div>
    </div></div></div>)
  }
  