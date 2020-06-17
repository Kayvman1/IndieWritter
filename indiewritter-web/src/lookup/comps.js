export function lookup (method, endpoint, callback, data){
  let Jdata ;
  const xhr = new XMLHttpRequest()
  
  if (data){
    Jdata = JSON.stringify(data)
  }
  const url = `http://127.0.0.1:8000/api${endpoint}/`
  xhr.responseType = "json"

  xhr.open (method, url)
  xhr.onload = function(){
    callback(xhr.response, xhr.status)
  }

  xhr.onerror = function(e){
    console.log(e)
    callback({"message": "The request was an error"}, 400)
  }

  xhr.send(Jdata)
  
}

export function createPoem(newPoem, callback) {
  let data = {
    content : newPoem.content,
    title : newPoem.title
  }
  lookup("POST", "/poems/create", callback, data )
}

export function loadPoems (callback) {
  lookup('GET', '/poems', callback)
}