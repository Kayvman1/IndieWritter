import React, { useState} from 'react'
//import {useEffect} from 'react'

import {ActionBtn} from './buttons'

export function ParentPoem (props) {
    const {poem} =props 
    
    return poem.parent ? <div className = 'row'> 
    <div id = 'PoemParent' className ={'col-11 mx-auto p-3 border rounded'}>
    <p className = 'mb-0 text-muted small'>repost (somehow link to og post to interact with)</p> 
    <Poem poem = {poem.parent} className = {''} hideActions = {true} /> 
    </div>
    </div>
    :
    null
  }
  export  function Poem(props){
 
      const {poem, didRepost, hideActions} = props
      const [actionPoem, setActionPoem] = useState(poem ? poem : null)
      const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
  
      const handelPerformAction = (newActionPoem, status) =>{
        if (status === 200){
          setActionPoem(newActionPoem)
        }else if (status === 201){
          if (didRepost)
            didRepost(newActionPoem)
  
        }
        }
  
      return <div className = {className}>
      <div id = 'Poem'>
        <h4>{poem.id} - {poem.title}</h4> 
        <p>{poem.content}</p>
          <ParentPoem poem = {poem}/>
        </div>
      {actionPoem && hideActions !== true &&  <div id = 'action buttons' className = 'btn btn-group'> 
          <ActionBtn poem = {actionPoem} didPerformAction = {handelPerformAction} action ={{type:"like", display : 'Likes'}}/>
          <ActionBtn poem = {actionPoem} didPerformAction = {handelPerformAction} action ={{type:"unlike", display: 'Unlike'}}/>
          <ActionBtn poem = {actionPoem} didPerformAction = {handelPerformAction} action ={{type:"repub", display: 'Repub'}}/>
        </div>}
      </div>
    }
  