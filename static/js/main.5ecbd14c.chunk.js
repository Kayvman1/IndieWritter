(this["webpackJsonpindiewritter-web"]=this["webpackJsonpindiewritter-web"]||[]).push([[0],[,,,,,,,function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},function(e,t,a){e.exports=a(15)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(4),o=a.n(c),l=(a(13),a(7)),s=a.n(l),i=(a(14),a(5)),m=a(1);function u(e){var t=r.a.createRef(),a=r.a.createRef(),c=Object(n.useState)([]),o=Object(m.a)(c,2),l=o[0],s=o[1];return r.a.createElement("div",{className:e.className},r.a.createElement("div",{className:"col-12 mb-3"},r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),console.log(e);var t=Object(i.a)(l);t.unshift({title:"poop",content:"nopoop",id:"12412424",like:"124"}),s(t)}},r.a.createElement("textarea",{ref:t,className:"form-control",name:"title",required:!0}),r.a.createElement("textarea",{ref:a,className:"form-control",name:"content",required:!0}),r.a.createElement("button",{type:"submit",className:"btn btn-primary my-3"}," post "))),r.a.createElement(p,{newPoems:l}))}function p(e){var t=Object(n.useState)([]),a=Object(m.a)(t,2),c=a[0],o=a[1],l=Object(n.useState)([]),s=Object(m.a)(l,2),u=s[0],p=s[1];return Object(n.useEffect)((function(){var t=Object(i.a)(e.newPoems).concat(c);t.length!==u.length&&p(t)}),[c,e.newPoems,u]),Object(n.useEffect)((function(){!function(e){var t=new XMLHttpRequest;t.responseType="json",t.open("GET","http://127.0.0.1:8000/api/poems/"),t.onload=function(){e(t.response,t.status)},t.onerror=function(t){console.log(t),e({message:"The request was an error"},400)},t.send()}((function(e,t){200===t?o(e):alert("There was an error")}))}),[]),u.map((function(e,t){return r.a.createElement(f,{poem:e,className:"my-5 py-5 border bg-white text-dark",key:"".concat(t,"-item.id")})}))}function d(e){var t=e.className?e.className:"btn btn-primary btn-sm",a=e.poem,c=e.action,o=c.display?c.display:"action",l=Object(n.useState)(!0===a.userLike),s=Object(m.a)(l,2),i=s[0],u=s[1],p=Object(n.useState)(a.likes?a.likes:0),d=Object(m.a)(p,2),f=d[0],b=d[1],E="like"===c.type?"".concat(c.display," ").concat(f):o;return r.a.createElement("button",{className:t,onClick:function(e){e.preventDefault(),"like"===c.type&&(!0===i?(b(f-1),u(!1)):(b(f+1),u(!0)))}},"    ",E," ")}function f(e){var t=e.poem,a=e.className?e.className:"col-10 mx-auto col-md-6";return r.a.createElement("div",{className:a},r.a.createElement("h4",null,t.title),r.a.createElement("p",null,t.content),r.a.createElement("div",{className:"btn btn-group"},r.a.createElement(d,{poem:t,action:{type:"like",display:"Likes"}}),r.a.createElement(d,{poem:t,action:{type:"unlike",display:"Unlike"}}),r.a.createElement(d,{poem:t,action:{type:"repub",display:"Repub"}})))}var b=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:s.a,className:"App-logo",alt:"logo"}),r.a.createElement("p",null,"Edit ",r.a.createElement("code",null,"src/App.js")," and save to reload."),r.a.createElement("div",null,r.a.createElement(u,null)),r.a.createElement("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"},"Learn React")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var E=document.getElementById("root");E&&o.a.render(r.a.createElement(b,null),E);var v=document.getElementById("indiewritter");v&&o.a.render(r.a.createElement(u,null),v),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.5ecbd14c.chunk.js.map