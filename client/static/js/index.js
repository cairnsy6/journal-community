
const posts = document.querySelector("#posts-area");


function init() {
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
        console.log(idInfo)
        const titleInfo = data[x].title;
        const messageInfo = data[x].message;
        makePostCard(titleInfo, messageInfo, idInfo);
      }
    });
}

function makePostCard(titleInfo, messageInfo, idInfo) {
  const newEntry = document.createElement("div");
  newEntry.className = "card";
  const singlePostLink = document.createElement("a");
  singlePostLink.setAttribute('href','singlepost.html');
  const buttonArea = document.createElement("div");
  buttonArea.className = "button-area";
  const title = document.createElement("h3");
  const message = document.createElement("p");
  const disLikeButton = document.createElement("button");
  const likeButton = document.createElement("button");
  const loveButton = document.createElement("button");
  const commentButton = document.createElement("button");
  disLikeButton.className = "btn btn-warning btn-lg";
  likeButton.className = "btn btn-warning btn-lg";
  loveButton.className = "btn btn-warning btn-lg";
  commentButton.className = "btn btn-warning btn-lg";
  commentButton.id = idInfo;
  title.textContent = titleInfo;
  message.textContent = messageInfo;
  disLikeButton.textContent = "👎";
  likeButton.textContent = "👍";
  loveButton.textContent = "💙";
  commentButton.textContent = "Comments"
  newEntry.appendChild(title)
  newEntry.appendChild(message);
  buttonArea.appendChild(disLikeButton);
  buttonArea.appendChild(likeButton);
  buttonArea.appendChild(loveButton);
  singlePostLink.appendChild(commentButton)
  buttonArea.appendChild(singlePostLink);
  newEntry.appendChild(buttonArea);
  posts.appendChild(newEntry);
}

function addNewPostInformation(e){
  const data = { name: e.target.value };

  fetch("https://example.com/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getSinglePostInfo(){
    
}



async function getSinglePostsInformation(id) {
    const url = `http://localhost:3000/posts/:${id}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
          const titleInfo = data[x].title;
          const messageInfo = data[x].message;
          const commentsInfo = data[x].comments
        }
      );
  }


init();