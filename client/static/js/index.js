const posts = document.querySelector("#posts-area");
const makeAPost = document.querySelector("#write-a-post");
const makeAPostButton = document.querySelector("#write-a-post-button");
const postForm = document.querySelector("form");

function init() {
  makeAPost.className = "hidden";

  makeAPostButton.addEventListener("click", () => {
    if (makeAPost.className === "hidden") {
      makeAPost.classList.remove("hidden");
    } else {
      makeAPost.className = "hidden";
    }
  });

  getAllPosts();
}

function getAllPosts() {
  try {
    getPostsInformation();
  } catch (e) {
    console.log(e);
  }
}

function getPostsInformation() {
  const url = "http://localhost:3000/posts";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (let x in data) {
        const idInfo = data[x].id;
        console.log(idInfo);
        const titleInfo = data[x].title;
        const messageInfo = data[x].message;
        const commentsInfo = data[x].comments[0];
        console.log(commentsInfo)
        makePostCard(titleInfo, messageInfo, idInfo, commentsInfo);
      }
    });
}

function makePostCard(titleInfo, messageInfo, idInfo, commentsInfo) {
  const newEntry = document.createElement("div");
  const buttonArea = document.createElement("div");
  const title = document.createElement("h3");
  const message = document.createElement("p");
  const disLikeButton = document.createElement("button");
  const likeButton = document.createElement("button");
  const loveButton = document.createElement("button");
  const commentButton = document.createElement("button");
  const commentArea = document.createElement("details");
  const commentAreaTitle = document.createElement("summary");
  const commentsSection = document.createElement("div");
  const commentForm = document.createElement("form");
  const commentMessage = document.createElement("input")
  const commentSubmitButton = document.createElement("button");
  commentArea.className = "no-list-style";
  commentAreaTitle.className = "no-list-style";
  newEntry.className = "card";
  buttonArea.className = "button-area";
  disLikeButton.className = "btn btn-warning btn-lg";
  likeButton.className = "btn btn-warning btn-lg";
  loveButton.className = "btn btn-warning btn-lg";
  commentButton.className = "btn btn-warning btn-lg";
  commentsSection.className = "hidden";
  commentMessage.type = "text";
  commentMessage.placeholder = "Please write your comment here"
  commentMessage.style.display ="block"
  commentMessage.className = "comment-message";
  commentMessage.id = "commentmessage";
  commentSubmitButton.className = "btn btn-warning btn-lg";
  commentSubmitButton.type = "submit";
  commentSubmitButton.textContent = "Send"
  commentButton.id = idInfo;
  title.textContent = titleInfo;
  message.textContent = messageInfo;
  disLikeButton.textContent = "👎";
  likeButton.textContent = "👍";
  loveButton.textContent = "💙";
  commentButton.textContent = "Comments";
  commentAreaTitle.textContent = "Comments";
  commentArea.appendChild(commentAreaTitle);
  commentForm.appendChild(commentMessage);
  commentForm.appendChild(commentSubmitButton);
  commentsSection.appendChild(commentArea);
  commentsSection.appendChild(commentForm);
  newEntry.appendChild(title);
  newEntry.appendChild(message);
  buttonArea.appendChild(disLikeButton);
  buttonArea.appendChild(likeButton);
  buttonArea.appendChild(loveButton);
  buttonArea.appendChild(commentButton);
  newEntry.appendChild(buttonArea);
  newEntry.appendChild(commentsSection);
  posts.appendChild(newEntry);
  for(let i of commentsInfo){
    let comment = document.createElement("p");
    comment.textContent = i;
    commentArea.appendChild(comment);
  }

  commentButton.addEventListener("click", () => {
    if (commentsSection.className === "hidden") {
      commentsSection.classList.remove("hidden");
    } else {
      commentsSection.className = "hidden";
    }
  });

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const postCommentData = e.target.commentmessage.value;
    console.log(postCommentData);
    const options = {
      method: "POST",
      body: JSON.stringify(postCommentData),
      headers: {
        'Access-Control-Allow-Origin':'*',
        "Content-Type": "application/json",
      }
    };
    console.log(idInfo)
    fetch(`http://localhost:3000/posts/${idInfo}`, options, {mode: 'no-cors'})
    .then((postCommentData) => {
      console.log(postCommentData);
    });
  })


}

postForm.addEventListener("submit", (e) => {
  
  console.log("submitted");
  const postData = {
    title: e.target.postTitle.value,
    message: e.target.postMessage.value,
    image: e.target.postGiphy.value,
    dislikes: 0,
    likes: 0,
    loves: 0,
    comments: [],
  };
  console.log(postData);

  const options = {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    }
  };

  fetch("http://localhost:3000/posts", options).then((data) => makePostCard);
});

function addPost(postData) {
  makePostCard(postData.title, postData.message);
}

init();
