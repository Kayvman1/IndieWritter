import React, {useEffect,useState} from 'react'
import {ListPoem} from './list'
import {PoemCreate} from './create'
import {FeedList} from './feed'


import {Poem} from './detail'
import {apiPoemDetail} from './lookup'

// eslint-disable-next-line
function print (s){
  console.log(s)
}



export function PoemsComp (props){
  const [newPoems,setNewPoem] = useState([])
  const {username, postprem} = props
  const canPost = postprem === "true" ? true : false

  const handleNewPoem = (newPoem)=>{
    let tempNewPoems = [...newPoems]
    tempNewPoems.unshift(newPoem)
    setNewPoem(tempNewPoems)
  }


  return (
  <div className = {props.className}>
    {
    canPost === true && 
    <PoemCreate didPost = {handleNewPoem}  className='col-12 mb-3'/>
    }
    <ListPoem newPoems = {newPoems} username = {username}/>
  </div>)
}

export function FeedComp (props){
  const [newPoems,setNewPoem] = useState([])
  const {username, postprem} = props
  const canPost = postprem === "true" ? true : false

  const handleNewPoem = (newPoem)=>{
    let tempNewPoems = [...newPoems]
    tempNewPoems.unshift(newPoem)
    setNewPoem(tempNewPoems)
  }


  return (
  <div className = {props.className}>
    {
    canPost === true && 
    <PoemCreate didPost = {handleNewPoem}  className='col-12 mb-3'/>
    }
    <FeedList newPoems = {newPoems} username = {username}/>
  </div>)
}


export function PoemDetailComp  (props) {
  const {poemId} = props
  const [poem, SetPoem] = useState(null)
  const [didLookup, setDidLookup] = useState(false)

  const handleLookup = (response, status)=>{
    if (status === 200)
      SetPoem(response)
    else
      alert ("Debug Error src/poems/comps.js")
    }
  useEffect(()=>{
    if (didLookup ===false){ 
      apiPoemDetail(poemId,handleLookup)
      setDidLookup(true)
    }
  },[didLookup,setDidLookup, poemId])

  return poem === null ? null : <Poem poem = {poem} className = {props.className}/>

}