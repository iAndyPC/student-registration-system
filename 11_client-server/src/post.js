'use strict';

async function getPostById () {
  const pageParams = new URLSearchParams(window.location.search);
  const response = await fetch(`https://gorest.co.in/public-api/posts/${pageParams.get('id')}`);
  const json = await response.json()
  return json.data;
}

async function getCommentsByPostId () {
  const pageParams = new URLSearchParams(window.location.search);
  const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${pageParams.get('id')}`);
  const json = await response.json();
  return json.data;
}

async function postInDOM () {
  const postData = await getPostById();
  let container = document.getElementById('container');
  let post = document.createElement('div');
  post.classList.add('card', 'w-auto', 'mb-3');
  let postBody = document.createElement('div');
  postBody.classList.add('card-body')
  let postTitle = document.createElement('h5');
  postTitle.textContent = postData.title;
  let postContentText = document.createElement('p');
  postContentText.classList.add('card-text');
  postContentText.textContent = postData.body;
  postBody.append(postTitle, postContentText);
  post.append(postBody);
  container.append(post);
  document.body.append(container);
}

async function commentsInDOM () {
  const commentsArr = await getCommentsByPostId();
  const container = document.getElementById('container');
  for (let commentData of commentsArr) {
    let comment = document.createElement('div');
    comment.classList.add('card', 'mb-2');
    let commentHeader = document.createElement('div');
    commentHeader.classList.add('card-header');
    commentHeader.textContent = commentData.name;
    let commentBody = document.createElement('div');
    commentBody.classList.add('card-body');
    let commentContent = document.createElement('blockquote');
    commentContent.classList.add('blockquote', 'mb-0');
    let commentText = document.createElement('p');
    commentText.textContent = commentData.body;
    commentContent.append(commentText);
    commentBody.append(commentContent);
    comment.append(commentHeader);
    comment.append(commentBody);
    container.append(comment);
  }
}
postInDOM();
commentsInDOM();
