// Firebase configuration
const firebaseConfig = {
    // Your Firebase config details
    apiKey: "AIzaSyC1kDtYIauw1KYF2OYK6zJBj_DtDxjuOWo",
        authDomain: "login-signup-authenticat-4fa75.firebaseapp.com",
        databaseURL: "https://login-signup-authenticat-4fa75-default-rtdb.firebaseio.com",
            projectId: "login-signup-authenticat-4fa75",
        storageBucket: "login-signup-authenticat-4fa75.appspot.com",
        messagingSenderId: "77434343036",
        appId: "1:77434343036:web:de2288d9664bae1c7483f9"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to create a new post
function createPost() {
    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;

    if (postTitle && postContent) {
        const newPostRef = database.ref('posts').push();
        newPostRef.set({
            title: postTitle,
            content: postContent
        });

        // Clear the form after creating a post
        document.getElementById('postTitle').value = '';
        document.getElementById('postContent').value = '';
    }
}

// Function to delete a post
function deletePost(postId) {
    const postRef = database.ref('posts/' + postId);
    postRef.remove();
}

// Function to display posts
function displayPosts() {
    const postListDiv = document.getElementById('postList');

    // Clear previous posts
    postListDiv.innerHTML = '';

    // Fetch posts from the database
    database.ref('posts').on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();
            const postId = childSnapshot.key;

            // Create post HTML element
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <button onclick="deletePost('${postId}')">Delete Post</button>
            `;

            // Append post to the postListDiv
            postListDiv.appendChild(postElement);
        });
    });
}

// Display posts on page load
displayPosts();
