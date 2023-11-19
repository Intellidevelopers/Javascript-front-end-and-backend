// Include Firebase SDK (as mentioned above)

const postList = document.getElementById('postList');
const createPostForm = document.getElementById('createPostForm');

function showCreatePostForm() {
    createPostForm.style.display = 'block';
}

function addPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    // Validate and add the post to the Firebase database
    if (title && content) {
        const postRef = database.ref('posts').push({
            title: title,
            content: content
        });

        // Clear the form
        document.getElementById('postTitle').value = '';
        document.getElementById('postContent').value = '';

        // Hide the form after submission
        createPostForm.style.display = 'none';
    }
}

function deletePost() {
    // Implement post deletion logic as needed
    // You can use database.ref('posts').child(postId).remove() or other methods
}
