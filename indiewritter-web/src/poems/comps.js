import React, {useEffect, useState} from 'react'
import {loadPoems} from '../lookup'

export function PoemsComp (props){
  const titleRef = React.createRef()
  const contentRef = React.createRef()
  const [newPoems,setNewPoem] = useState([])

  const handleSubmit = (event) =>{
    event.preventDefault()
    console.log(event)
    let tempNewPoems = [...newPoems]
    tempNewPoems.unshift({
      title : 'poop',
      content : 'nopoop',
      id : '12412424',
      like: '124'
    })

    setNewPoem(tempNewPoems)
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

    
      const myCallback = (response, status) =>{
        if(status === 200){
          
          setPoemsInit(response)
          setPoemsDidSet(true)
        }
        else{
          alert ("There was an error")
        }
      }
      loadPoems(myCallback)
      
      }
  }, [poemsInit, poemsDidSet, setPoemsDidSet] )

  console.log(Array.isArray(poems))
  poems.forEach(e => console.log("TGIS IS AN ELEMETNT \n",e))

  
  return  poems.map((item, index)=>{
      return <Poem poem = {item} className = 'my-5 py-5 border bg-white text-dark' key ={`${index}-item.id`}/>
      }
    )
  }

 
export function ActionBtn(props){
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const {poem,action} = props
    const actionDisplay = action.display? action.display: 'action'
    const [userLike, setUserLike] = useState(poem.userLike === true ? true : false)
    const [likes,setLikes] = useState( poem.likes ? poem.likes : 0)

    const display = action.type === 'like' ? `${action.display} ${likes}`: actionDisplay
    const handleClick = (event) => {
      event.preventDefault()
      if (action.type === 'like'){
        if (userLike === true){
          setLikes(likes - 1)
          setUserLike (false)
        }else {
          setLikes(likes + 1)
          setUserLike ( true )         
        }
      }}
    return  <button className = {className}  onClick = {handleClick}>    {display} </button>
  
  }
  
export  function Poem(props){
    const {poem} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className = {className}>
      <h4>{poem.title}</h4> 
      <p>{poem.content}</p>
      <div className = 'btn btn-group'>
        <ActionBtn poem = {poem} action ={{type:"like", display : 'Likes'}}/>
        <ActionBtn poem = {poem} action ={{type:"unlike", display: 'Unlike'}}/>
        <ActionBtn poem = {poem} action ={{type:"repub", display: 'Repub'}}/>

        
      </div>
    </div>
  }
  