import {backendLookup} from '../backendLookup'


export function apiPoemCreate(newPoem, callback) {
    backendLookup("POST", "/poems/create", callback, newPoem)
  }
  
export function apiPoemList (callback) {
    backendLookup('GET', '/poems', callback)
  }

export function apiPoemAction (poemID, action, callback) {
    backendLookup('POST', '/poems/action', callback, {id:poemID, action:action })
  }