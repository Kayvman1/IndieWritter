(this["webpackJsonpindiewritter-web"]=this["webpackJsonpindiewritter-web"]||[]).push([[0],[,,,,,,,function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},,function(e,t,a){e.exports=a(16)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(3),l=a.n(c),o=(a(14),a(7)),s=a.n(o);a(15);function i(e,t,a,n){var r;n&&(r=JSON.stringify(n));var c=new XMLHttpRequest,l="http://localhost:8000/api".concat(t),o=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var a=document.cookie.split(";"),n=0;n<a.length;n++){var r=a[n].trim();if(r.substring(0,e.length+1)===e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}return t}("csrftoken");c.responseType="json",c.open(e,l),c.setRequestHeader("Content-Type","application/json"),o&&(c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.setRequestHeader("X-CSRFToken",o)),c.onload=function(){403===c.status?"Authentication credentials were not provided."===c.response.detail&&-1===window.location.href.indexOf("/login?showLoginRequired=true")&&(window.location.href="/login?showLoginRequired=true"):a(c.response,c.status)},c.onerror=function(e){console.log(e),a({message:"The request was an error"},400)},c.send(r)}function u(e,t,a){var n="/poems";e&&(n="/poems/?username=".concat(e)),null!==a&&void 0!==a&&(n=a.replace("http://localhost:8000/api","")),i("GET",n,t)}function m(e,t){var a="/poems/feed";null!==t&&void 0!==t&&(a=t.replace("http://localhost:8000/api","")),i("GET",a,e)}function d(e){var t=e.className?e.className:"btn btn-primary btn-sm",a=e.poem,n=e.action,c=e.didPerformAction,l=n.display?n.display:"action",o=a.likes?a.likes:0,s=function(e,t){200!==t&&201!==t||!c||c(e,t)},u="like"===n.type?"".concat(n.display," ").concat(o):l;return r.a.createElement("button",{className:t,onClick:function(e){e.preventDefault(),function(e,t,a){i("POST","/poems/action/",a,{id:e,action:t})}(a.id,n.type,s)}},"    ",u," ")}var f=a(2),p=a(1);function b(e){var t=e.hideActions,a=e.user;return!0!==t?r.a.createElement("span",{className:"pointer px-3 py-2 rounded-circle bg-dark text-white my-4",onClick:function(e){e.preventDefault(),window.location.href="/profile/".concat(a.username),console.log(a.username)}},a.username&&a.username[0]):null}function E(e){var t,a=e.user,n=e.is_repub,c=e.is_post,l=e.is_profile;t=a.first_name||a.last_name?a.first_name+" "+a.last_name+" @"+a.username:"@"+a.username;var o=function(e){e.preventDefault(),window.location.href="/profile/".concat(a.username),console.log(a.username)};return!0===l&&(o=null),!1===c?r.a.createElement(r.a.Fragment,null,r.a.createElement("h6",null,r.a.createElement("small",null,r.a.createElement("span",{onClick:o},t," ")))," "):!1===n?r.a.createElement(r.a.Fragment,null,r.a.createElement("h6",null,r.a.createElement("small",null,"By: ",r.a.createElement("span",{onClick:o},t," ")))):r.a.createElement(r.a.Fragment,null,r.a.createElement("h6",null,r.a.createElement("small",null,"Repub By: ",r.a.createElement("span",{onClick:o},t," ")))," ")}var v=a(8),h=a.n(v);function j(e){return r.a.createElement("span",{className:e.className}," ",h()(e.children).format("0a"))}function g(e){var t=e.user,a=e.didFollowToggle,n=e.profileLoading,c=t&&t.is_following;c=n?"Loading...":t&&t.is_following?"Unfollow":"Follow";return t?r.a.createElement("div",{className:"border rounded py-4"},r.a.createElement(b,{user:t}),r.a.createElement("div",{className:"ml-4 mt-3"},r.a.createElement(E,{user:t,is_post:!1,is_profile:!0}),r.a.createElement("p",null,"Followers: ",r.a.createElement(j,null,t.follower_count)),r.a.createElement("p",null,"Following: ",r.a.createElement(j,null,t.following_count)),r.a.createElement("p",null,"From: ",t.location),r.a.createElement("p",null,"Bio: ",t.bio),r.a.createElement("button",{className:"btn btn-primary",onClick:function(e){e.preventDefault(),a&&!n&&a(c)}},c))):null}function O(e){var t=e.username,a=Object(n.useState)(null),c=Object(p.a)(a,2),l=c[0],o=c[1],s=Object(n.useState)(!1),u=Object(p.a)(s,2),m=u[0],d=u[1],f=Object(n.useState)(!1),b=Object(p.a)(f,2),E=b[0],v=b[1],h=function(e,t){200===t?o(e):alert("Debug Error src/profiles/badge.js")};Object(n.useEffect)((function(){!1===m&&(!function(e,t){i("GET","/profiles/".concat(e,"/"),t)}(t,h),d(!0))}),[m,d,t]);return!1===m?"Loading":l?r.a.createElement("span",null,r.a.createElement(g,{user:l,didFollowToggle:function(e){console.log(e),function(e,t,a){i("POST","/profiles/".concat(e,"/follow/"),a,null!==t?{action:t.toLowerCase()}:null)}(t,e,(function(e,t){console.log(e,t),200===t&&o(e),v(!1)})),v(!0)},profileLoading:E})," "):null}function w(e){var t=e.poem;return t.parent?r.a.createElement("div",{id:"PoemParent",className:"p-2 border-top border-bottom mt-4 ml-3"},r.a.createElement("p",{className:"mb-4 small"}),r.a.createElement(N,{poem:t.parent,className:"",hideActions:!0,isRepub:t.parent.is_repub})):null}function N(e){var t,a=e.poem,c=e.didRepost,l=e.hideActions,o=Object(n.useState)(a||null),s=Object(p.a)(o,2),i=s[0],u=s[1],m=e.className?e.className:"col-10 mx-5 pt-3 col-md-6",f=window.location.pathname.match(/^[/](\d+)/);f&&(t=parseInt(f[1])===a.id);var v=function(e,t){200===t?u(e):201===t&&c&&c(e)};return r.a.createElement("div",{className:m},r.a.createElement("div",{className:"d-flex"},r.a.createElement("div",{className:" mx-1"},r.a.createElement(b,{user:a.user,hideActions:l})),r.a.createElement("div",{className:"col-11 "},r.a.createElement("div",{id:"Poem"},r.a.createElement("h3",{className:"text-center"},a.title),r.a.createElement("div",{className:"text-center"},r.a.createElement(E,{is_repub:a.is_repub,user:a.user})),r.a.createElement("pre",null,r.a.createElement("big",null,a.content)),r.a.createElement(w,{poem:a})),r.a.createElement("div",{id:"action buttons",className:"btn btn-group px-0"},i&&!0!==l&&r.a.createElement(r.a.Fragment,null,r.a.createElement(d,{poem:i,didPerformAction:v,action:{type:"like",display:"Likes"}}),r.a.createElement(d,{poem:i,didPerformAction:v,action:{type:"unlike",display:"Unlike"}}),!1===a.is_repub&&r.a.createElement(d,{poem:i,didPerformAction:v,action:{type:"repub",display:"Repub"}}),"          "),!t&&r.a.createElement("button",{onClick:function(e){e.preventDefault(),window.location.href="/".concat(a.id,"/")},className:"btn btn-outline-primary btn-sm"},"View")))))}function y(e){var t=Object(n.useState)([]),a=Object(p.a)(t,2),c=a[0],l=a[1],o=Object(n.useState)([]),s=Object(p.a)(o,2),i=s[0],m=s[1],d=Object(n.useState)(null),b=Object(p.a)(d,2),E=b[0],v=b[1],h=Object(n.useState)(!1),j=Object(p.a)(h,2),g=j[0],O=j[1],w=e.username;Object(n.useEffect)((function(){var t=Object(f.a)(e.newPoems).concat(c);t.length!==i.length&&m(t)}),[c,e.newPoems,i]),Object(n.useEffect)((function(){if(!1===g){u(w,(function(e,t){200===t?(v(e.next),l(e.results),O(!0)):alert("Debug Error src/poems/list.js")}))}}),[c,g,O,w]);var y=function(e){var t=Object(f.a)(c);t.unshift(e),l(t);var a=Object(f.a)(i);a.unshift(i),m(a)};return r.a.createElement(r.a.Fragment,null," ",i.map((function(e,t){return r.a.createElement(N,{poem:e,didRepost:y,key:"".concat(t,"-item.id"),className:"my-5 py-5 border-top bg-white text-dark"})})),null!==E&&r.a.createElement("button",{onClick:function(t){if(t.preventDefault(),null!==E){u(e.username,(function(e,t){if(200===t){var a=Object(f.a)(i).concat(e.results);v(e.next),l(a),m(a)}else alert("Debug Error src/poems/list.js")}),E)}},className:"btn btn-outline-primary"},"Load Next"))}function k(e){var t=r.a.createRef(),a=r.a.createRef(),n=e.didPost,c=function(e,t){201===t?n(e):(alert("this is debug alert 1 comps.js in src poems\n"),console.log(e))};return r.a.createElement("div",{id:"form div",className:e.className},r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n=t.current.value,r=a.current.value;i("POST","/poems/create/",c,{title:n,content:r}),t.current.value="",a.current.value=""}},r.a.createElement("textarea",{ref:t,placeholder:"Title",className:"form-control",name:"title",required:!0}),r.a.createElement("textarea",{ref:a,placeholder:"Your Beautiful Work",className:"form-control",name:"content",required:!0}),r.a.createElement("button",{type:"submit",className:"btn btn-primary my-3"}," post ")))}function S(e){var t=Object(n.useState)([]),a=Object(p.a)(t,2),c=a[0],l=a[1],o=Object(n.useState)([]),s=Object(p.a)(o,2),i=s[0],u=s[1],d=Object(n.useState)(null),b=Object(p.a)(d,2),E=b[0],v=b[1],h=Object(n.useState)(!1),j=Object(p.a)(h,2),g=j[0],O=j[1],w=e.username;Object(n.useEffect)((function(){var t=Object(f.a)(e.newPoems).concat(c);t.length!==i.length&&u(t)}),[c,e.newPoems,i]),Object(n.useEffect)((function(){if(!1===g){m((function(e,t){200===t?(v(e.next),l(e.results),O(!0)):alert("Debug Error src/poems/list.js")}))}}),[c,g,O,w]);var y=function(e){var t=Object(f.a)(c);t.unshift(e),l(t);var a=Object(f.a)(i);a.unshift(i),u(a)};return r.a.createElement(r.a.Fragment,null," ",i.map((function(e,t){return r.a.createElement(N,{poem:e,didRepost:y,key:"".concat(t,"-item.id"),className:"my-5 py-5 border bg-white text-dark"})})),null!==E&&r.a.createElement("button",{onClick:function(e){if(e.preventDefault(),null!==E){m((function(e,t){if(200===t){var a=Object(f.a)(i).concat(e.results);v(e.next),l(a),u(a)}else alert("Debug Error src/poems/list.js")}),E)}},className:"btn btn-outline-primary"},"Load Next"))}function x(e){var t=Object(n.useState)([]),a=Object(p.a)(t,2),c=a[0],l=a[1],o=e.username,s="true"===e.postprem;return r.a.createElement("div",{id:"Poems Comp",className:e.className},!0===s&&r.a.createElement(k,{id:"create form",didPost:function(e){var t=Object(f.a)(c);t.unshift(e),l(t)},className:"col-12 mb-3"}),r.a.createElement(y,{id:"list poem",newPoems:c,username:o}))}function P(e){var t=e.poemId,a=Object(n.useState)(null),c=Object(p.a)(a,2),l=c[0],o=c[1],s=Object(n.useState)(!1),u=Object(p.a)(s,2),m=u[0],d=u[1],f=function(e,t){200===t?o(e):alert("Debug Error src/poems/comps.js")};return Object(n.useEffect)((function(){!1===m&&(!function(e,t){i("GET","/poems/".concat(e),t)}(t,f),d(!0))}),[m,d,t]),null===l?null:r.a.createElement(N,{id:"Poem detail",poem:l,className:e.className})}var R=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:s.a,className:"App-logo",alt:"logo"}),r.a.createElement("p",null,"Edit ",r.a.createElement("code",null,"src/App.js")," and save to reload."),r.a.createElement("div",null,r.a.createElement(x,null)),r.a.createElement("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"},"Learn React")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function C(e,t,a){console.log(e);var n=null!==e&&null!==t?{search:e.toLowerCase(),type:t.toLowerCase()}:null;console.log("api search"),i("POST","/search/",a,n)}function D(e){var t=Object(n.useState)([]),a=Object(p.a)(t,2),c=a[0],l=a[1],o=Object(n.useState)([]),s=Object(p.a)(o,2),i=s[0],u=s[1],m=Object(n.useState)(null),d=Object(p.a)(m,2),b=d[0],E=d[1],v=Object(n.useState)(!1),h=Object(p.a)(v,2),j=h[0],g=h[1],O=e.username,w=e.search;Object(n.useEffect)((function(){var t=Object(f.a)(e.newPoems).concat(c);t.length!==i.length&&u(t)}),[c,e.newPoems,i]),Object(n.useEffect)((function(){if(!1===j){C(w,"poem",(function(e,t){200===t?(E(e.next),l(e.results),g(!0)):alert("Debug Error src/poems/list.js")}))}}),[c,j,g,O]);var y=function(e){var t=Object(f.a)(c);t.unshift(e),l(t);var a=Object(f.a)(i);a.unshift(i),u(a)};return r.a.createElement(r.a.Fragment,null," ",i.map((function(e,t){return r.a.createElement(N,{poem:e,didRepost:y,key:"".concat(t,"-item.id"),className:"my-5 py-5 border-top bg-white text-dark"})})),null!==b&&r.a.createElement("button",{onClick:function e(t){if(t.preventDefault(),null!==b){C(w,"poem",e)}},className:"btn btn-outline-primary"},"Load Next"))}function _(e){var t=Object(n.useState)([]),a=Object(p.a)(t,2),c=a[0],l=a[1],o=Object(n.useState)([]),s=Object(p.a)(o,2),i=s[0],u=s[1],m=Object(n.useState)(null),d=Object(p.a)(m,2),b=d[0],E=d[1],v=Object(n.useState)(!1),h=Object(p.a)(v,2),j=h[0],g=h[1],w=e.username,N=e.search;e.type;Object(n.useEffect)((function(){var t=Object(f.a)(e.newPoems).concat(c);t.length!==i.length&&u(t)}),[c,e.newPoems,i]),Object(n.useEffect)((function(){if(!1===j){C(N,"user",(function(e,t){console.log(e,"1"),200===t?(E(e.next),l(e.results),g(!0)):alert("Debug Error src/poems/list.js")}))}}),[c,j,g,w]);return r.a.createElement(r.a.Fragment,null," ",i.map((function(e,t){return r.a.createElement("span",{className:""},r.a.createElement(O,{username:e.username})," ")})),null!==b&&r.a.createElement("button",{onClick:function e(t){if(t.preventDefault(),null!==b){C(N,"user",e)}},className:"btn btn-outline-primary"},"Load Next"))}var L=document.getElementById("root");L&&l.a.render(r.a.createElement(R,null),L);var A=r.a.createElement,F=document.getElementById("indiewritter");F&&l.a.render(A(x,F.dataset),F);var T=document.getElementById("indiewritter-feed");T&&l.a.render(A((function(e){var t=Object(n.useState)([]),a=Object(p.a)(t,2),c=a[0],l=a[1],o=e.username,s="true"===e.postprem;return r.a.createElement("div",{id:"Feed Comp",className:e.className},!0===s&&r.a.createElement(k,{didPost:function(e){var t=Object(f.a)(c);t.unshift(e),l(t)},className:"col-12 mb-3"}),r.a.createElement(S,{newPoems:c,username:o}))}),T.dataset),T),document.querySelectorAll(".profile-badge").forEach((function(e){l.a.render(A(O,e.dataset),e)})),document.querySelectorAll(".poem-detail").forEach((function(e){l.a.render(A(P,e.dataset),e)}));var q=document.getElementById("searchBar");q&&l.a.render(A((function(e){var t=r.a.createRef();return r.a.createElement("div",{id:"form div",className:"px-4"},r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a=t.current.value;a=encodeURIComponent(a),window.location.href="/search/".concat(a)}},r.a.createElement("input",{ref:t,placeholder:"Search (Use @ for Users)",className:"form-control",name:"search",required:!0})))}),q.dataset),q);var B=document.getElementById("searchResult");B&&l.a.render(A((function(e){var t=window.location.href,a=t.indexOf("/search/");return t=t.substring(a+8),t=decodeURI(t),"@"==(t=decodeURIComponent(t))[0]?(t=t.substring(1),r.a.createElement("div",{id:"User Comp",className:e.className},r.a.createElement(_,{id:"list poem",newPoems:[],search:t,type:void 0}))):r.a.createElement("div",{id:"User Comp",className:e.className},r.a.createElement(D,{id:"list user",newPoems:[],search:t,type:void 0}))}),B.dataset),B),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[9,1,2]]]);
//# sourceMappingURL=main.6cc73860.chunk.js.map