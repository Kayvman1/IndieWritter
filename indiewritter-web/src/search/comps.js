import React from 'react'
import {apiSearch} from "./lookup"
import {useEffect, useState} from 'react'
import{Poem} from '../poems'
import {ProfileBadgeComp} from '../profiles'






export function SearchBarComp (props){
    const searchRef = React.createRef()
    
    //backend api request
    const handleSubmit = (event) =>{
        event.preventDefault()
        let str = (searchRef.current.value)
        str =  (encodeURIComponent(str))
        window.location.href =  `/search/${str}`
    }
    //backend api response handler

 
    return (
    <div id = 'form div' className ="px-4">
      <form onSubmit = {handleSubmit}>
        <input ref = {searchRef} placeholder='Search' className = 'form-control' name ='search' required={true}></input>
      </form>
    </div>)
  }


  export function searchResultComp(props){
    let ret = window.location.href
    let x = ret.indexOf("/search/")
    ret =  (ret.substring(x+8))
    ret = decodeURI(ret)
    ret = decodeURIComponent(ret)
    let type
    
    if (ret[0] == '@'){
      
      ret = ret.substring(1)
      return (
        <div id = 'User Comp' className = {props.className}>
          
          <ListUser id = 'list poem' newPoems = {[]} search = {ret} type ={type} />
        </div>)
}
  
   
      return (
        <div id = 'User Comp' className = {props.className}>
          
          <ListPoem id = 'list user' newPoems = {[]} search = {ret} type ={type} />
        </div>)

 
 
    

 


  }





 

  export  function ListPoem(props){
    const [poemsInit, setPoemsInit] = useState([])
    const [poems, setPoems] = useState([])
    const [nextUrl, setNextUrl] = useState(null)
    const [poemsDidSet, setPoemsDidSet] = useState(false)
    const {username, search} = props
  
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
        //apiPoemList(username, handlePoemList)
        apiSearch(search,  "poem", handlePoemList )
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
        //apiPoemList(props.username,handleLoadUpdate, nextUrl)
        apiSearch(search,  "poem", handleLoadNext )
      }
    }
    return <React.Fragment> {
      poems.map((item, index)=>{
        return < Poem poem = {item} didRepost = {handleDidRepost}  key ={`${index}-item.id`}
        className = 'my-5 py-5 border-top bg-white text-dark' />
     
      })}
     {nextUrl!==null && <button onClick={handleLoadNext} className ='btn btn-outline-primary'>Load Next</button>}</React.Fragment>
    }
  
    export  function ListUser(props){
 
      const [poemsInit, setPoemsInit] = useState([])
      const [poems, setPoems] = useState([])
      const [nextUrl, setNextUrl] = useState(null)
      const [poemsDidSet, setPoemsDidSet] = useState(false)
      const {username, search, type} = props
    
      useEffect( ()=>{
        const final = [...props.newPoems].concat(poemsInit)
        if (final.length !== poems.length)
          setPoems(final)
      },[poemsInit, props.newPoems, poems])
    
      useEffect(() => {
        if (poemsDidSet ===false){
          const handlePoemList = (response, status) =>{
            console.log(response, '1')

            if(status === 200){
              setNextUrl(response.next)
              setPoemsInit(response.results)
              setPoemsDidSet(true)
            }else
              alert ("Debug Error src/poems/list.js")
          }
          //apiPoemList(username, handlePoemList)
          apiSearch(search,  "user", handlePoemList )
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
            console.log(response, "2")
            if(status === 200){
              let newPoems = [...poems].concat(response.results)
              setNextUrl(response.next)
              setPoemsInit(newPoems)
              setPoems(newPoems)
              
            }else
              alert ("Debug Error src/poems/list.js")
          
          }
          //apiPoemList(props.username,handleLoadUpdate, nextUrl)
          apiSearch(search,  "user", handleLoadNext )
        }
      }
      return <React.Fragment> {
        poems.map((item, index)=>{
          return <span className = "py-4"><ProfileBadgeComp username = {item.username} /> </span> 
       
        })}
       {nextUrl!==null && <button onClick={handleLoadNext} className ='btn btn-outline-primary'>Load Next</button>}</React.Fragment>
      }