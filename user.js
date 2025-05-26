const userList = document.getElementById('user-list');
const loader = document.getElementById('loader');
const postTable = document.getElementById('post-table');
const postTableBody = postTable.querySelector('tbody');

fetch(`https://jsonplaceholder.typicode.com/users`)
.then(res => res.json())
.then(users => {
    users.forEach(user => {
        const btn = document.createElement('button');
        btn.textContent = user.name;

        btn.addEventListener('click', () => {
            afficherPosts(user.id, btn);
        });

        userList.appendChild(btn);
    });
})
.catch(err => console.log(`Erreur : ${err}`))

function afficherPosts(userId, boutonClique) {
    loader.style.display = 'block';
    postTable.style.display = 'none';
    postTableBody.innerHTML = '';

    document.querySelectorAll('.user-list button').forEach(btn => {
        btn.classList.remove('active');
    });
    boutonClique.classList.add('active');

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(res => res.json())
    .then(posts => {
    loader.style.display = 'none';
    postTable.style.display = 'table';

    posts.forEach(post => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${post.userId}</td>
        <td>${post.id}</td>
        <td>${post.title}</td>
        <td>${post.body}</td>
        `;
        postTableBody.appendChild(row);
    });
    })

    .catch(err => console.log(`Erreur : ${err}`))
}
