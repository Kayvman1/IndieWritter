import React, {useEffect, useState} from 'react'
import {apiPoemList, apiPoemCreate,apiPoemAction} from './lookup'

export function PoemsComp (props){
  const titleRef = React.createRef()
  const contentRef = React.createRef()
  const [newPoems,setNewPoem] = useState([])

  const handleBackendUpdate = (response, status) =>{
    //backend api response handler
    let tempNewPoems = [...newPoems]
    if (status ===201){
      tempNewPoems.unshift(response)
      setNewPoem(tempNewPoems)
      }else{
        alert("this is debug alert 1 comps.js in src poems\n")
        console.log(response)
      }
  }
  //backend api request
  const handleSubmit = (event) =>{
    event.preventDefault()
    let title = titleRef.current.value
    let content = contentRef.current.value
    apiPoemCreate({title: title, content: content}, handleBackendUpdate)
  }

  return <div className = {props.className}>
  <div className = 'col-12 mb-3'>
    <form onSubmit = {handleSubmit}>
      <textarea ref = {titleRef} className = 'form-control' name ='title' required={true}></textarea>
      <textarea ref = {contentRef} className = 'form-control' name ='content' required ={true}></textarea>
      <button type = 'submit' className = 'btn btn-primary my-3'> post </button>
    </form>
    </div>
    <ListPoem newPoems = {newPoems}/>
  </div>
}

export  function ListPoem(props){
  const [poemsInit, setPoemsInit] = useState([])
  const [poems, setPoems] = useState([])
  const [poemsDidSet, setPoemsDidSet] = useState(false)

  useEffect( ()=>{
    const final = [...props.newPoems].concat(poemsInit)
    if (final.length !== poems.length){
      setPoems(final)
    }
  },[poemsInit, props.newPoems, poems])

  useEffect(() => {
    if (poemsDidSet ===false){
      const handlePoemList = (response, status) =>{
        if(status === 200){
          setPoemsInit(response)
          setPoemsDidSet(true)
        }else{
          alert ("There was an error")
        }
      }
      apiPoemList(handlePoemList)
    }
  }, [poemsInit, poemsDidSet, setPoemsDidSet] )

  return  poems.map((item, index)=>{
    return <Poem poem = {item} className = 'my-5 py-5 border bg-white text-dark' key ={`${index}-item.id`}/>
    })
  }

export function ActionBtn(props){
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const {poem,action} = props
    const actionDisplay = action.display? action.display: 'action'
    //const [userLike, setUserLike] = useState(poem.userLike === true ? true : false)
    const [likes,setLikes] = useState( poem.likes ? poem.likes : 0)
    const display = action.type === 'like' ? `${action.display} ${likes}`: actionDisplay

    const handleApiActionEvent = (response,status)=>{
      console.log(response, status)
      if (status === 200){
        setLikes(response.likes)
        //setUserLike (true)
      }
    }
    const handleClick = (event) => {
      event.preventDefault()
      apiPoemAction(poem.id, action.type, handleApiActionEvent)

    }
    return  <button className = {className}  onClick = {handleClick}>    {display} </button>
  }

function ParentPoem (props) {
  const {poem} =props 
  
  return poem.parent ? <div className = 'row'> 
  <div id = 'PoemParent' className ={'col-11 mx-auto p-3 border rounded'}>
  <p className = 'mb-0 text-muted small'>repost</p> 
  <Poem poem = {poem.parent} className = {''} /> 
  </div>
  </div>
  :
  null
}
export  function Poem(props){
    const {poem} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className = {className}>
    <div id = 'Poem'>
      <h4>{poem.id} - {poem.title}</h4> 
      <p>{poem.content}</p>
        <ParentPoem poem = {poem}/>
      </div>
      <div id = 'action buttons' className = 'btn btn-group'>
        <ActionBtn poem = {poem} action ={{type:"like", display : 'Likes'}}/>
        <ActionBtn poem = {poem} action ={{type:"unlike", display: 'Unlike'}}/>
        <ActionBtn poem = {poem} action ={{type:"repub", display: 'Repub'}}/>
      </div>
    </div>
  }
