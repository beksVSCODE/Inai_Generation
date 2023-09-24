// const API = 'http://localhost:3000';
// const placeForContent = document.getElementById('cardContainer');
// const readMoreBtn = document.getElementById('readMoreBtn');
// let currentCardIndex = 0;
// const cardsToShow = 5;

// function renderCards(cardsData) {
//     const cardsToRender = cardsData.slice(currentCardIndex, currentCardIndex + cardsToShow);

//     cardsToRender.forEach((post) => {
//         const imgElement = post.img !== '' ? `<img class="card__img" src="${post.img}" alt="">` : '';
//         const descriptionElement = post.description ? `<h2 class="card__description">${post.description}</h2>` : '';

//         const cardHTML = `
//             <div class="card">
//                 ${imgElement}
//                 <div class="card__user">
//                     <img src="./icons/free-icon-profile-3736502.png" alt="">
//                     <p class="card__name">${post.userName}</p>
//                 </div>
//                 ${descriptionElement}
//                 <p class="card__subtitle">После сильного ветра и ливней мост в аварийном состоянии. Обращение к мэрии...</p>
//                 <div class="card__action">
//                     <img src="./icons/share.png" alt="">
//                     <img src="./icons/like.png" alt="">
//                     <img src="./icons/comment.png" alt="">
//                     <p class="card__count">${post.likeCount} лайков</p>
//                 </div>
//             </div>
//         `;
//         placeForContent.innerHTML += cardHTML;
//     });
// }

// function showMoreCards() {
//     currentCardIndex += cardsToShow;
//     fetch(`${API}/posts`)
//         .then(response => response.json())
//         .then(data => {
//             if (currentCardIndex < data.length) {
//                 renderCards(data);
//             } else {
//                 readMoreBtn.style.display = 'none';
//             }
//         });
// }

// readMoreBtn.addEventListener('click', showMoreCards);

// // Первичная загрузка первых 5 карточек
// fetch(`${API}/posts`)
//     .then(response => response.json())
//     .then(data => {
//         renderCards(data);
//         if (data.length <= cardsToShow) {
//             readMoreBtn.style.display = 'none';
//         }
//     });


const API = 'http://localhost:3000';
const placeForContent = document.getElementById('cardContainer');
const readMoreBtn = document.getElementById('readMoreBtn');
let currentCardIndex = 0;
const cardsToShow = 5;

function renderCards(cardsData) {
    const cardsToRender = cardsData.slice(currentCardIndex, currentCardIndex + cardsToShow);

    cardsToRender.forEach((post) => {
        const imgElement = post.img !== '' ? `<img class="card__img" src="${post.img}" alt="">` : '';
        const descriptionElement = post.description ? `<h2 class="card__description">${post.description}</h2>` : '';

        const cardHTML = `
            <div class="card">
                ${imgElement}
                <div class="card__user">
                    <img src="./icons/free-icon-profile-3736502.png" alt="">
                    <p class="card__name">${post.userName}</p>
                </div>
                ${descriptionElement}
                <p class="card__subtitle">После сильного ветра и ливней мост в аварийном состоянии. Обращение к мэрии...</p>
                <div class="card__action">
                    <img src="./icons/share.png" alt="">
                    <img src="./icons/like.png" alt="" class="like-icon" data-post-id="${post.id}">
                    <img src="./icons/comment.png" alt="">
                    <p class="card__count" id="likeCount_${post.id}">${post.likeCount} лайков</p>
                </div>
            </div>
        `;
        placeForContent.innerHTML += cardHTML;
    });
}

function handleLikeClick(event) {
    const likeIcon = event.target;
    if (likeIcon.classList.contains('like-icon')) {
        const postId = likeIcon.dataset.postId;
        const likeCountElement = document.getElementById(`likeCount_${postId}`);
        let likeCount = parseInt(likeCountElement.innerText, 10);

        if (likeIcon.classList.contains('liked')) {
            likeCount--;
            likeIcon.classList.remove('liked');
        } else {
            likeCount++;
            likeIcon.classList.add('liked');
        }

        likeCountElement.innerText = `${likeCount} лайков`;
    }
}

placeForContent.addEventListener('click', handleLikeClick);

function fetchPosts() {
    return fetch(`${API}/posts`)
        .then(response => response.json())
        .catch(error => console.error('Error fetching posts:', error));
}

function showMoreCards() {
    fetchPosts()
        .then(data => {
            currentCardIndex += cardsToShow;
            renderCards(data);
        })
        .catch(error => console.error('Error:', error));
}

fetchPosts()
    .then(data => {
        renderCards(data);
        if (data.length <= cardsToShow) {
            readMoreBtn.style.display = 'none';
        }
    })
    .catch(error => console.error('Error:', error));

readMoreBtn.addEventListener('click', showMoreCards);

const postForm = document.getElementById('postForm');

postForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)

    const formData = new FormData(postForm);
    const postData = {
        title: formData.get('title'),
        description: formData.get('description'),
        photo: formData.get('photo')
    };

    // Отправка POST-запроса
    fetch(`${API}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        // Обработка ответа от сервера, если нужно
        console.log('Успешно опубликовано:', data);
        // Очищаем форму или выполняем дополнительные действия при успешной публикации
    })
    .catch(error => console.error('Ошибка при публикации:', error));
});



