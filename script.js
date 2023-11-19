// Initialize Firebase with your configuration
const firebaseConfig = {
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
const postForm = document.getElementById('postForm');
const postList = document.getElementById('postList');
let selectedPostKey = null;

function createPost() {
    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;

    if (postTitle && postContent) {
        // Push post data to Firebase Database
        database.ref('posts').push({
            title: postTitle,
            content: postContent
        });

        // Clear the form fields
        postForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
}

function updatePost() {
    if (selectedPostKey) {
        const postTitle = document.getElementById('postTitle').value;
        const postContent = document.getElementById('postContent').value;

        if (postTitle && postContent) {
            let updates = {
                title: postTitle,
                content: postContent
            };

            // Update post data in Firebase Database
            database.ref('posts').child(selectedPostKey).update(updates);

            // Clear the form fields
            postForm.reset();
            selectedPostKey = null;
        } else {
            alert('Please fill in all fields.');
        }
    } else {
        alert('Please select a post to update.');
    }
}

function deletePost(key) {
    if (confirm('Are you sure you want to delete this post?')) {
        // Delete post data from Firebase Database
        database.ref('posts').child(key).remove();
    }
}

// Listen for changes in the database and update the post list
database.ref('posts').on('value', (snapshot) => {
    postList.innerHTML = ''; // Clear previous posts

    snapshot.forEach((childSnapshot) => {
        const post = childSnapshot.val();
        const postItem = document.createElement('div');

        // Display post details without "Edit" and "Delete" buttons
        postItem.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post Image">` : ''}
        `;

        postList.appendChild(postItem);
    });
});


function editPost(key) {
    selectedPostKey = key;

    // Retrieve post details for editing
    database.ref('posts').child(key).once('value').then((snapshot) => {
        const post = snapshot.val();
        document.getElementById('postTitle').value = post.title;
        document.getElementById('postContent').value = post.content;
    });
}
