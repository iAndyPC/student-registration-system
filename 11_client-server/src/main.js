//af04a26f575ea6efa779f891f8491f5e994fa7b9fc3c20e15aefd6031243e212
'use strict';

async function getPosts() {
  const pageParams = new URLSearchParams(window.location.search);
  let response;
  if (pageParams.has('page')) {
    response = await fetch(`https://gorest.co.in/public-api/posts?page=${pageParams.get('page')}`);
  } else {
    response = await fetch('https://gorest.co.in/public-api/posts?page=1');
  }
  const json = await response.json();
  return json.data;
} getPosts();

async function postsInDOM () {
  const postsArr = await getPosts();
  //list of posts
  let container = document.getElementById('container');
  let listOfPosts = document.createElement('div');
  listOfPosts.classList.add('list-group', 'mt-3', 'mb-3');
  //posts
  for (let post of postsArr) {
    let postAnchor = document.createElement('a');
    postAnchor.setAttribute('href', `post.html?id=${post.id}`);
    postAnchor.classList.add('list-group-item', 'list-group-item-action');
    let postTitle = document.createElement('div');
    postTitle.classList.add('d-flex', 'w-100', 'justify-content-between');
    let postTitleText = document.createElement('h5');
    postTitleText.classList.add('mb-1');
    postTitleText.textContent = post.title;
    postTitle.append(postTitleText);
    let postContentText = document.createElement('p');
    postContentText.classList.add('mb-1');
    postContentText.textContent = post.body;
    postAnchor.append(postTitle, postContentText);
    listOfPosts.append(postAnchor);
  }
  container.append(listOfPosts);
  document.body.append(container)
} postsInDOM();

async function pagination() {
  const response = await fetch('https://gorest.co.in/public-api/posts');
  const json = await response.json(), pagesNum = json.meta.pagination.pages;
  const container = document.getElementById('container');
  let navigation = document.createElement('nav');
  let unorderedList = document.createElement('ul');
  navigation.setAttribute('aria-label', 'page navigation');
  unorderedList.classList.add('pagination', 'justify-content-center', 'flex-wrap');
  //pages button
  for (let i = 1; i <= pagesNum; i++) {
    let listItem = document.createElement('li');
    let anchor = document.createElement('a');
    anchor.setAttribute('href', `index.html?page=${i}`)
    listItem.classList.add('page-item');
    anchor.classList.add('page-link');
    anchor.textContent = `${i}`;
    listItem.append(anchor);
    unorderedList.append(listItem);
  }
  navigation.append(unorderedList);
  container.append(navigation);
} pagination();


