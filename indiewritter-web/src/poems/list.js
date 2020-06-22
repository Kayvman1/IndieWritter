import React, {useEffect, useState} from 'react'
import {apiPoemList, } from './lookup'
import {Poem} from './detail'

export  function ListPoem(props){
    const [poemsInit, setPoemsInit] = useState([])
    const [poems, setPoems] = useState([])
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
            setPoemsInit(response)
            setPoemsDidSet(true)
          }else
            alert ("Debug Error src/poems/list.js")
        }
        apiPoemList(username, handlePoemList)
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
    return  poems.map((item, index)=>{
      return <Poem 
      poem = {item} 
      didRepost = {handleDidRepost}
      className = 'my-5 py-5 border bg-white text-dark' 
      key ={`${index}-item.id`}/>
      })
    }
