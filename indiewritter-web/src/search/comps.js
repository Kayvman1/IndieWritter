import React from 'react'
import {apiSearch} from "./lookup"






export function SearchBarComp (props){
    const searchRef = React.createRef()
    
    //backend api request
    const handleSubmit = (event) =>{
        event.preventDefault()
        let str = (searchRef.current.value)
        str =  (encodeURIComponent(str))
        window.location.href = "search/"+str
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
    ret = (ret.substring(x+8))
    ret = decodeURI(ret)

    const handleSearch = (response, status) =>{
      if (status ===200)
        console.log(response)
      else{
        alert("this is debug alert 1 comps.js in src search\n" )
        console.log(response)
      }
    } 
    
    apiSearch(ret,"poem", handleSearch)

    return(<p>{ret}</p>)
  }




//   const handleSubmit = (event) =>{
//     event.preventDefault()
//     let search = searchRef.current.value
//     apiSearch(search,"user",handleSearch)

//     searchRef.current.value=''
//   }
 