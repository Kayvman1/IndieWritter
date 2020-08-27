import {backendLookup} from '../backendLookup'



export function apiSearch (search, type, callback) {

  console.log(search)
    const endpoint =`/search/`
    const data = search !== null && type!== null ?{"search":search.toLowerCase(), "type":type.toLowerCase()}:null
    // /let data = {"search":"kayvan", "type":"user"}
    console.log("api search")
    backendLookup('POST', endpoint, callback,data)
  }
