// Include Firebase SDK (as mentioned above)

const postList = document.getElementById('postList');

// Listen for changes in the Firebase database
database.ref('posts').on('child_added', (snapshot) => {
    const post = snapshot.val();
    const postItem = document.createElement('div');
    postItem.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
    postList.appendChild(postItem);
});

// (Optional) Add logic for updating posts when deleted
database.ref('posts').on('child_removed', (snapshot) => {
    // Implement logic to remove the deleted post from the postList
});
