const postList = document.getElementById('postList');
const createPostForm = document.getElementById('createPostForm');

function showCreatePostForm() {
    createPostForm.style.display = 'block';
}

function addPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    // Validate and add the post to local storage
    if (title && content) {
        savePost(title, content);

        // Clear the form
        document.getElementById('postTitle').value = '';
        document.getElementById('postContent').value = '';

        // Update the homepage with the new post
        displayPostsOnHomepage();

        // Hide the form after submission
        createPostForm.style.display = 'none';
    }
}

function deletePost() {
    // Implement post deletion logic as needed
    // You can use postList.removeChild() or other methods
}
