// Initialize Firebase with your project config
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
const postList = document.getElementById('postList');
const createPostModal = document.getElementById('createPostModal');

// Function to open the create post modal
function openCreatePostModal() {
    createPostModal.style.display = 'block';
}

// Function to close the create post modal
function closeCreatePostModal() {
    createPostModal.style.display = 'none';
}

// Function to create a new post
function createPost() {
    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;

    // Add the new post to the database
    const newPostRef = database.ref('posts').push();
    newPostRef.set({
        title: postTitle,
        content: postContent
    });

    // Clear the form and close the modal
    document.getElementById('createPostForm').reset();
    closeCreatePostModal();
}

// Listen for changes in the posts collection
database.ref('posts').on('value', (snapshot) => {
    postList.innerHTML = ''; // Clear the existing posts

    // Iterate through the posts and display them
    snapshot.forEach((childSnapshot) => {
        const post = childSnapshot.val();
        const postItem = document.createElement('div');
        postItem.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
        postList.appendChild(postItem);
    });
});
 
