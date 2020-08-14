import React from 'react'
import {apiSearch} from "./lookup"






export function SearchComp (props){
    const searchRef = React.createRef()
    
    //backend api request
    const handleSubmit = (event) =>{
        event.preventDefault()
        let str = (searchRef.current.value)

        str =  (encodeURIComponent(str))
        console.log(str)
        window.location.href = str
    }
    //backend api response handler
    const handleSearch = (response, status) =>{
      if (status ===200)
        console.log(response)
      else{
        alert("this is debug alert 1 comps.js in src poems\n" )
        console.log(response)
      }
    } 
 
    return (
    <div id = 'form div' className ="px-4">
      <form onSubmit = {handleSubmit}>
        <input ref = {searchRef} placeholder='Search' className = 'form-control' name ='title' required={true} 
        
        rows = {1}></input>
      </form>
    </div>)
  }


//   const handleSubmit = (event) =>{
//     event.preventDefault()
//     let search = searchRef.current.value
//     apiSearch(search,"user",handleSearch)

//     searchRef.current.value=''
//   }
 