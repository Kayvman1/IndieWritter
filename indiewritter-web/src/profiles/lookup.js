import {backendLookup} from '../backendLookup'

export function apiProfileDetail (username, callback) {
    const endpoint =`/profiles/${username}/`
    backendLookup('GET', endpoint, callback)
  }

export function apiProfileFollowToggle (username, action, callback) {
    const endpoint =`/profiles/${username}/follow/`
    const data = action !== null?{"action":action.toLowerCase()}:null
    backendLookup('POST', endpoint, callback,data)
  }
