import {backendLookup} from '../backendLookup'



export function apiSearch (search, type, callback) {
    const endpoint =`/search/`
    const data = search !== null && type!== null ?{"search":search.toLowerCase(), "type":type.toLowerCase()}:null
    // /let data = {"search":"kayvan", "type":"user"}
    console.log(callback)
    backendLookup('POST', endpoint, callback,data)
  }
