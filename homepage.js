const postForm = document.getElementById('postForm');

function createPost() {
    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;

    // Get a reference to the database
    const database = firebase.database();

    // Push a new post to the database
    const newPostRef = database.ref('posts').push({
        title: postTitle,
        content: postContent
    });

    // Clear the form after creating the post
    postForm.reset();

    alert('Post created successfully!');
}
