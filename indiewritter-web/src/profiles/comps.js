import React from 'react'

export function UserPicture(props){
    let {hideActions, user} = props
  
    const handleUserClick= (event) =>{
      event.preventDefault()
      window.location.href = `/profile/${user.username}`
      console.log(user.username)
    }
    return hideActions !== true ? 
    <span className='pointer px-3 py-2 rounded-circle bg-dark text-white' 
          onClick= {handleUserClick}
   >
    {user.username && user.username[0]  }
    </span>:null
    }
 export function UserLink(props){
    const {user, is_repub, is_post, is_profile} = props
    let displayName 
    if(user.first_name || user.last_name)
    displayName = user.first_name +" "+ user.last_name + " @" + user.username
  
    else 
      displayName = "@"+user.username
    
    let handleUserClick= (event) =>{
        event.preventDefault()
        window.location.href = `/profile/${user.username}`
        console.log(user.username)
      }
    if (is_profile === true){
      handleUserClick = null
    }
  
    if (is_post === false) return(    
    <React.Fragment><h6><small>
       <span onClick = {handleUserClick}>{displayName} </span>
    </small></h6> </React.Fragment>)
    return( is_repub === false ? 
    
    <React.Fragment><h6><small>
      By: <span onClick = {handleUserClick}>{displayName} </span>
    </small></h6></React.Fragment>:
    
    <React.Fragment><h6><small>
      Repub By: <span onClick = {handleUserClick}>{displayName} </span>
    </small></h6> </React.Fragment>)
   
  }
  