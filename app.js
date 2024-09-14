document.addEventListener('DOMContentLoaded', () => {
    const usersContainer = document.getElementById('users-container');
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                
                const userElement = document.createElement('div');
                userElement.className = 'user';

                const userInfo = document.createElement('div');
                userInfo.innerHTML = `
                    <span><strong>${user.name}</strong></span>
                    <button onclick="togglePosts(${user.id}, this)">Show Posts</button>
                `;
                
                const postsContainer = document.createElement('div');
                postsContainer.className = 'posts-container';
                postsContainer.id = `posts-${user.id}`;
                postsContainer.style.display = 'none';

                userElement.appendChild(userInfo);
                userElement.appendChild(postsContainer);
                usersContainer.appendChild(userElement);
            });
        });
});

window.togglePosts = function(userId, button) {
    const postsContainer = document.getElementById(`posts-${userId}`);
    
    if (postsContainer.style.display === 'none') {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(posts => {
                postsContainer.innerHTML = '';
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'post';
                    postElement.innerHTML = `
                        <div class="post-title">${post.title}</div>
                        <div class="post-body">${post.body}</div>
                    `;
                    postsContainer.appendChild(postElement);
                });
                postsContainer.style.display = 'block'; 
                button.textContent = 'Close Posts'; 
            });
    } else {
        postsContainer.style.display = 'none';
        button.textContent = 'Show Posts';
    }
};