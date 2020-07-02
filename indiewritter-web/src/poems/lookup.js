import {backendLookup} from '../backendLookup'

export function apiPoemAction (poemID, action, callback) {
  backendLookup('POST', '/poems/action/', callback, {id:poemID, action:action })
}

export function apiPoemCreate(newPoem, callback) {
    backendLookup("POST", "/poems/create/", callback, newPoem)
  }
  
export function apiPoemDetail (poemId, callback) {
    const endpoint =`/poems/${poemId}`
    backendLookup('GET', endpoint, callback)
  }

  export function apiPoemList (username, callback, nextUrl) {
    let endpoint ='/poems'
    if (username) endpoint =`/poems/?username=${username}`
    if(nextUrl!== null && nextUrl !== undefined){
      endpoint = nextUrl.replace("http://localhost:8000/api","")
    }
    backendLookup('GET', endpoint, callback)
  }
  export function apiPoemFeed (callback, nextUrl) {
    let endpoint ='/poems/feed'
    if(nextUrl!== null && nextUrl !== undefined){
      endpoint = nextUrl.replace("http://localhost:8000/api","")
    }
    backendLookup('GET', endpoint, callback)
  }
  
  