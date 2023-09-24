document.getElementById("postForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const photo = document.getElementById("photo").value;

    const postData = {
        title: title,
        description: description,
        img: photo,
        userName: 'Бакыт Амиров',
        likeCount: 0,
        comments: {}
    };

    const url = "http://localhost:3000/posts";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Новость успешно опубликована:", data);

        // Clear form fields
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("photo").value = "";

        // Display card with submitted data
        const addContainer = document.querySelector('.add__container');
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${postData.img}" alt="">
            <div class="card__user">
                <img src="./icons/free-icon-profile-3736502.png" alt="">
                <p class="card__name">${postData.userName}</p>
            </div>
            <p class="card__description">${postData.description}</p>
            <p class="card__subtitle">После сильного ветра и ливней мост в аварийном состоянии. Обращение к мэрии...</p>
            <div class="card__action">
                <img src="./icons/share.png" alt="">
                <img src="./icons/like.png" alt="">
                <img src="./icons/comment.png" alt="">
                <p class="card__count">${postData.likeCount} лайков</p>
            </div>
        `;
        addContainer.appendChild(card);
    })
    .catch(error => {
        console.error("Ошибка при отправке новости:", error);
    });
});
