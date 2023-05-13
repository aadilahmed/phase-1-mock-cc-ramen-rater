document.addEventListener("DOMContentLoaded", () => { 
    document.querySelector("#new-ramen").addEventListener('submit', (e) => {
        e.preventDefault();
        let ramenObj = {
            name: e.target.querySelector('#new-name').value,
            restaurant: e.target.querySelector('#new-restaurant').value,
            image: e.target.querySelector('#new-image').value,
            rating: e.target.querySelector('#new-rating').value,
            comment: e.target.querySelector('#new-comment').value
        }
        renderRamen(ramenObj)
        createRamen(ramenObj);
    });

    document.querySelector("#edit-ramen").addEventListener('submit' , (e) => {
        e.preventDefault();
        const rating = e.target.querySelector('#new-rating').value;
        const comment = e.target.querySelector('#new-comment').value;

        fetch(`http://localhost:3000/ramens/${e.target.dataset.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "rating": rating,
                "comment": comment
            })
        })
        .then((response) => response.json())
        .then((ramenData) => { 
            document.querySelector('#rating-display').innerText = ramenData.rating;
            document.querySelector('#comment-display').innerText = ramenData.comment;
        });
    });

    fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramenData) => {
      document.querySelector('.detail-image').src = ramenData[0].image;
      document.querySelector('.name').innerText = ramenData[0].name;
      document.querySelector('.restaurant').innerText = ramenData[0].restaurant;
      document.querySelector('#rating-display').innerText = ramenData[0].rating;
      document.querySelector('#comment-display').innerText = ramenData[0].comment;
      ramenData.forEach(ramen => {
        renderRamen(ramen)
    });
    });
});

function renderRamen(ramen) {
    const img = document.createElement('img');
    img.className = 'ramen-image';
    img.src = ramen.image;

    img.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/ramens/${ramen.id}`)
        .then(response => response.json())
        .then(ramen => {
            document.querySelector('.detail-image').src = ramen.image;
            document.querySelector('.name').innerText = ramen.name;
            document.querySelector('.restaurant').innerText = ramen.restaurant;
            document.querySelector('#rating-display').innerText = ramen.rating;
            document.querySelector('#comment-display').innerText = ramen.comment;
            document.querySelector("#edit-ramen").dataset.id = ramen.id;
        }) 
    })

    document.querySelector("#ramen-menu").appendChild(img);
}

function createRamen(ramenObj) {
    fetch("http://localhost:3000/ramens", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(ramenObj)
    })
}