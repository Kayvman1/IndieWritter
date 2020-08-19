import React, {useEffect, useState} from 'react'
import {apiPoemFeed, } from './lookup'
import {Poem} from './detail'

export  function FeedList(props){
    const [poemsInit, setPoemsInit] = useState([])
    const [poems, setPoems] = useState([])
    const [nextUrl, setNextUrl] = useState(null)
    const [poemsDidSet, setPoemsDidSet] = useState(false)
    const {username} = props
  
    useEffect( ()=>{
      const final = [...props.newPoems].concat(poemsInit)
      if (final.length !== poems.length)
        setPoems(final)
    },[poemsInit, props.newPoems, poems])
  
    useEffect(() => {
      if (poemsDidSet ===false){
        const handlePoemList = (response, status) =>{
          if(status === 200){
            setNextUrl(response.next)
            setPoemsInit(response.results)
            setPoemsDidSet(true)
          }else
            alert ("Debug Error src/poems/list.js")
        }
        apiPoemFeed( handlePoemList)
      }
    }, [poemsInit, poemsDidSet, setPoemsDidSet, username] )
  
    const handleDidRepost = (newPoem) =>{
      const updatedPoemsInit = [...poemsInit] 
      updatedPoemsInit.unshift (newPoem)
      setPoemsInit (updatedPoemsInit)
      const updateFinalTweet = [...poems ]
      updateFinalTweet.unshift(poems)
      setPoems(updateFinalTweet)
    }

    const handleLoadNext = (event)=>{
      event.preventDefault()
      if (nextUrl!== null){
        const handleLoadUpdate=(response,status)=>{
          if(status === 200){
            let newPoems = [...poems].concat(response.results)
            setNextUrl(response.next)
            setPoemsInit(newPoems)
            setPoems(newPoems)
            
          }else
            alert ("Debug Error src/poems/list.js")
        
        }
        apiPoemFeed(handleLoadUpdate, nextUrl)
      }
    }
    return <React.Fragment> {
      poems.map((item, index)=>{
        return <Poem poem = {item} didRepost = {handleDidRepost}  key ={`${index}-item.id`}
        className = 'my-5 py-5 border bg-white text-dark' />
     
      })}
     {nextUrl!==null && <button onClick={handleLoadNext} className ='btn btn-outline-primary'>Load Next</button>}</React.Fragment>
    
  }   