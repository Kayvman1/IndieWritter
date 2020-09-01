import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PoemsComp, PoemDetailComp, FeedComp, PoemCreateComp} from './poems'
import * as serviceWorker from './serviceWorker';


import{ProfileBadgeComp} from "./profiles"
import {SearchBarComp,searchResultComp} from './search'

import ReactQuill, {Quill} from 'react-quill';
 import 'react-quill/dist/quill.snow.css';

 
const appEl = document.getElementById('root')
if (appEl) {
    ReactDOM.render(<App />, appEl);
}
const e = React.createElement
const poemsEl = document.getElementById("indiewritter")
if (poemsEl) {
    ReactDOM.render(
        e(PoemsComp, poemsEl.dataset), poemsEl);
}

const poemsFeedEl = document.getElementById("indiewritter-feed")
if (poemsFeedEl) {
    ReactDOM.render(
        e(FeedComp, poemsFeedEl.dataset), poemsFeedEl);
}

const userProfileElements = document.querySelectorAll(".profile-badge")

userProfileElements.forEach(container =>{
    ReactDOM.render(
        e(ProfileBadgeComp, container.dataset),
    container); 

})
const poemDetailEls = document.querySelectorAll(".poem-detail")

    poemDetailEls.forEach(container =>{
        ReactDOM.render(
            e(PoemDetailComp, container.dataset),
        container); 

    })
    
const searchBarEl = document.getElementById("searchBar")
    if (searchBarEl) {
        ReactDOM.render(
            e(SearchBarComp, searchBarEl.dataset), searchBarEl);
    }

const searchEl = document.getElementById("searchResult")
    if (searchEl) {
        ReactDOM.render(
            e(searchResultComp, searchEl.dataset), searchEl);
    }

const createEl = document.getElementById("poemCreate")
    if (createEl) {
        ReactDOM.render(
            e(PoemCreateComp, createEl.dataset), createEl);

            var quill = new Quill('#editor-container', {
                modules: {
                  toolbar: [
                    ['bold', 'italic'],
                    ['link', 'blockquote', 'code-block', 'image'],
                    [{ list: 'ordered' }, { list: 'bullet' }]
                  ]
                },
                placeholder: 'Compose an epic...',
                theme: 'snow'
              });
              
              var form = document.getElementById('FORM');
              form.onsubmit = function() {
                alert("chill")
                // Populate hidden form on submit
                var about = document.querySelector('input[name=about]');
                about.value = JSON.stringify(quill.getContents());
                console.log(about.value)
                
                //console.log("Submitted", $(form).serialize(), $(form).serializeArray());
                
                // No back end to actually submit to!
                alert('Open the console to see the submit data!')
                return false;
              };
    }



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();