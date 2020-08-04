import React,{useEffect, useState} from "react"
import {apiProfileDetail, apiProfileFollowToggle} from "./lookup"
import {UserLink, UserPicture} from './comps'
import numeral from 'numeral'

function DisplayCount(props){
  return <span className = {props.className}> {numeral(props.children).format("0a")}</span>
}

export function ProfileBadge(props){
  const {user, didFollowToggle, profileLoading} =props
  let currVerb = user && user.is_following? "Unfollow" :"Follow"
  currVerb = profileLoading? "Loading..." : user && user.is_following? "Unfollow" :"Follow"
  const handleFollowToggle=(event) =>{
    event.preventDefault()
    if (didFollowToggle && !profileLoading){
      didFollowToggle(currVerb)
    }
  }
  return user? 
    <div className = "border rounded">
      <UserPicture user ={user}/>
      <div className = "ml-4 mt-3">
      <UserLink user = {user} is_post = {false} is_profile = {true}/>
  
      <p>Followers: <DisplayCount>{user.follower_count}</DisplayCount></p>
      <p>Following: <DisplayCount>{user.following_count}</DisplayCount></p>
      <p>From: {user.location}</p>
      <p>Bio: {user.bio}</p>
      <button className ='btn btn-primary' onClick = {handleFollowToggle} >
          {currVerb}
      </button>
    </div></div>:null
}

export function ProfileBadgeComp(props){
    const{username} =props
    const [profile, setProfile] = useState(null)
    const [didLookup, setDidLookup] = useState(false)
    const [profileLoading, setProfileLoading] = useState(false)
    const handleLookup = (response, status)=>{
        if (status === 200)
          setProfile(response)
        else
          alert ("Debug Error src/profiles/badge.js")
        }
      useEffect(()=>{
        if (didLookup ===false){ 
            apiProfileDetail(username,handleLookup)
          setDidLookup(true)
        }
      },[didLookup,setDidLookup, username])

      const handleNewFollow= (actionVerb) =>{
        console.log(actionVerb)
        apiProfileFollowToggle(username,actionVerb,(response,status)=>{
          console.log(response, status)
          if (status === 200)
            setProfile(response)

          setProfileLoading (false)
          })
        setProfileLoading (true)
      }

      return didLookup === false?"Loading" : 
        profile? <span><ProfileBadge user = {profile} didFollowToggle={handleNewFollow} profileLoading ={profileLoading}/> </span> :null
    
}