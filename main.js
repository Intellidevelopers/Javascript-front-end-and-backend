// Function to save a post to local storage
function savePost(title, content) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push({ title, content });
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to display posts from local storage on the homepage
function displayPostsOnHomepage() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postList = document.getElementById('postList');

    // Clear previous content
    postList.innerHTML = '';

    // Display each post
    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
        postList.appendChild(postItem);
    });
}

// Call the function to display posts on page load
displayPostsOnHomepage();
