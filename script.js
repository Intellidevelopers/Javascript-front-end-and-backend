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

function createPost() {
    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;

    // Push the post data to Firebase
    database.ref('posts').push({
        title: postTitle,
        content: postContent
    });

    // Clear the form fields
    postForm.reset();
}

// Listen for changes in the database and update the post list
database.ref('posts').on('value', (snapshot) => {
    postList.innerHTML = ''; // Clear previous posts

    snapshot.forEach((childSnapshot) => {
        const post = childSnapshot.val();
        const postItem = document.createElement('div');
        postItem.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
        postList.appendChild(postItem);
    });
});
