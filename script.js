const postList = document.getElementById('postList');
const createPostForm = document.getElementById('createPostForm');

function showCreatePostForm() {
    createPostForm.style.display = 'block';
}

function addPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    // Validate and add the post to the postList div
    if (title && content) {
        const postItem = document.createElement('div');
        postItem.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
        postList.appendChild(postItem);

        // Clear the form
        document.getElementById('postTitle').value = '';
        document.getElementById('postContent').value = '';

        // Hide the form after submission
        createPostForm.style.display = 'none';
    }
}

function deletePost() {
    // Implement post deletion logic as needed
    // You can use postList.removeChild() or other methods
}
