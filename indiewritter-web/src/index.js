import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PoemsComp, PoemDetailComp, FeedComp} from './poems'
import * as serviceWorker from './serviceWorker';
import{ProfileBadgeComp} from "./profiles"
import {SearchBarComp,searchResultComp} from './search'

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



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();