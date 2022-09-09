// write your code here
//Organizing my variables

let card = document.querySelector('.image-card');
let title = card.querySelector('.title');
let img = card.querySelector('.image');
let likeCount = card.querySelector('.likes');
let likeButton = card.querySelector('.like-button');
let commentForm = card.querySelector('.comment-form');
commentsList = card.querySelector('.comments');
let imageCard = false;
let defaultLikes = 0;

// setting default functionality for counter.
         likeCount.textContent = `${defaultLikes} Likes`
            likeButton.addEventListener('click', () => { 
                defaultLikes = defaultLikes + 1;
                likeCount.textContent = `${defaultLikes} Likes`
            });
//adding event listeners

document.addEventListener('DOMContentLoaded', () => {
    title.addEventListener('click', () => {
    
        imageCard = !imageCard;
        if (imageCard) {
            img.style.display = "block";
        }
        else {
            img.style.display = "none";
        }
    })
    img.addEventListener('click', randomImage);
    
    fetchImage();
    fetchComments()
    commentForm.addEventListener('submit', postComment)
   

})


//fetching our image frm the API

let fetchImage = () => {
    fetch('http://localhost:3000/images/1')
        .then(resp => resp.json())
        .then(data => {
            title.textContent = data.title;
            img.src = `${data.image}`
            likeCount.textContent = `${data.likes} Likes`
            likeButton.addEventListener('click', () => { 
                data.likes = data.likes + 1;
                likeCount.textContent = `${data.likes} Likes`
            });
        })

}



 // fetching comments

            function fetchComments() {
              fetch('http://localhost:3000/comments')
                 .then(resp => resp.json())
                 .then(commentData => {
                     commentData.forEach((comment) => {
                         let comm = document.createElement('li');
                         let deleteButton = document.createElement('button');
                         deleteButton.textContent = " x";
                        
                         deleteButton.addEventListener('click', handleDelete);
                         comm.textContent = `${comment.content}  `;
                         comm.appendChild(deleteButton)
                         commentsList.appendChild(comm);
                          console.log(comment)
                      
        });
    })
}

           

//
function postComment(e) {
    e.preventDefault();
    let comment = commentForm.querySelector('.comment-input').value;
    let list = document.createElement('li')
    let p = document.createElement('p')
    p.textContent = `${comment}  `;
    p.appendChild(deleteButton);
    list.appendChild(p);

	commentsList.appendChild(list);
	commentForm.reset();
}

let deleteButton = document.createElement('button');
deleteButton.textContent = " x";
deleteButton.addEventListener('click', handleDelete)
function handleDelete(e) {
    e.target.parentNode.remove();
}

//randomly select a picture

function randomImage() {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(resp => resp.json())
        .then(newdata => {
            img.src = `${newdata.message}`  
        })
}