// document.getElementById("postForm").addEventListener("submit", function(event) {
//     event.preventDefault();

//     const title = document.getElementById("title").value;
//     const description = document.getElementById("description").value;
//     const photo = document.getElementById("photo").value;

//     const postData = {
//         title: title,
//         description: description,
//         img: photo,
//         userName: 'Бакыт Амиров',
//         likeCount: 0,
//         comments: {}
//     };

//     const url = "http://localhost:3000/posts";

//     fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(postData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert("Новость успешно опубликована:", data)

//         // Clear form fields
//         document.getElementById("title").value = "";
//         document.getElementById("description").value = "";
//         document.getElementById("photo").value = "";

//         // Display card with submitted data
//         const addContainer = document.querySelector('.add__container');
//         const card = document.createElement('div');
//         card.classList.add('card');
//         card.innerHTML = `
//             <img src="${postData.img}" alt="">
//             <div class="card__user">
//                 <img src="./icons/free-icon-profile-3736502.png" alt="">
//                 <p class="card__name">${postData.userName}</p>
//             </div>
//             <p class="card__description">${postData.title}</p>
//             <p class="card__subtitle">${postData.description}</p>
//             <div class="card__action">
//                 <img src="./icons/share.png" alt="">
//                 <img src="./icons/like.png" alt="">
//                 <img src="./icons/comment.png" alt="">
//                 <p class="card__count">${postData.likeCount} лайков</p>
//             </div>
//         `;
//         addContainer.appendChild(card);
//     })
//     .catch(error => {
//         console.error("Ошибка при отправке новости:", error);
//     });
// });
document.getElementById("postForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const photo = document.getElementById("photo").value;

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    const userName = `${userData.firstName} ${userData.lastName}`;
    const position = userData.position;

    const postData = {
        title: title,
        description: description,
        img: photo,
        userName: userName, // Include user's name
        position: position, // Include user's position
        likeCount: 0,
        comments: {}
    };

    // Fetch and save existing posts from localStorage
    const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    existingPosts.push(postData);
    localStorage.setItem('posts', JSON.stringify(existingPosts));

    // Clear form fields
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("photo").value = "";
    document.getElementById("place").value = "";

    // Display card with submitted data
    displayCard(postData);
});

// Function to display a card with the given data
function displayCard(postData) {
    const addContainer = document.querySelector('.add__container');
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="e"></div>
        <img src="${postData.img}" alt="">
        <div class="card__user">
            <img src="../news/icons/free-icon-profile-3736502.png" alt="">
            <p class="card__name">${postData.userName}</p>
            <p class="card__position">${postData.position}</p>
        </div>
        <p class="card__description">${postData.title}</p>
        <p class="card__subtitle">${postData.description}</p>
        <div class="card__action">
            <img src="../news/icons/share.png" alt="">
            <img src="../news/icons/comment.png" alt="">
            <img src="./icons/comment.png" alt="">
            <p class="card__count">${postData.likeCount} лайков</p>
        </div>
    `;
    addContainer.appendChild(card);
}

// Load and display existing posts on page load
window.addEventListener('load', function() {
    const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    existingPosts.forEach(postData => {
        displayCard(postData);
    });

    // Load user data
    const userData = JSON.parse(localStorage.getItem('user'));
    const content = document.querySelector('.for__us');
    content.innerHTML = `
        <div class="card">
            <img src="../news/icons/free-icon-profile-3736502.png" alt="">
            <p class="user__name">${userData.firstName} ${userData.lastName}</p>
            <p class="user__title">${userData.position}</p>
            <ul class="user__menu">
                <li>Решил 0 проблем</li>
                <li>Опубликовал ${existingPosts.length} проблем</li>
            </ul>
            <div class="user__rate">
                <img src="../../icon/Star.svg" alt="">
                <p class="user__num">0</p>
            </div>
        </div>
    `;
});
