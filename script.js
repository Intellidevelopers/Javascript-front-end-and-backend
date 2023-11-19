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
const storage = firebase.storage();
const postForm = document.getElementById('postForm');
const postList = document.getElementById('postList');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
let selectedPostKey = null;

function createPost() {
    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;
    const imageFile = imageInput.files[0];

    if (postTitle && postContent && imageFile) {
        const imageRef = storage.ref().child(`images/${Date.now()}_${imageFile.name}`);

        // Upload image to Firebase Storage
        imageRef.put(imageFile).then((snapshot) => {
            return snapshot.ref.getDownloadURL();
        }).then((imageUrl) => {
            // Push post data to Firebase Database
            database.ref('posts').push({
                title: postTitle,
                content: postContent,
                imageUrl: imageUrl
            });

            // Clear the form fields
            postForm.reset();
            imagePreview.src = '';
        }).catch((error) => {
            console.error('Error uploading image: ', error);
        });
    } else {
        alert('Please fill in all fields and select an image.');
    }
}

function updatePost() {
    if (selectedPostKey) {
        const postTitle = document.getElementById('postTitle').value;
        const postContent = document.getElementById('postContent').value;
        const imageFile = imageInput.files[0];

        if (postTitle && postContent) {
            let updates = {
                title: postTitle,
                content: postContent
            };

            // If a new image is selected, upload it and update the imageUrl
            if (imageFile) {
                const imageRef = storage.ref().child(`images/${Date.now()}_${imageFile.name}`);

                imageRef.put(imageFile).then((snapshot) => {
                    return snapshot.ref.getDownloadURL();
                }).then((imageUrl) => {
                    updates.imageUrl = imageUrl;

                    // Update post data in Firebase Database
                    database.ref('posts').child(selectedPostKey).update(updates);

                    // Clear the form fields
                    postForm.reset();
                    imagePreview.src = '';
                    selectedPostKey = null;
                }).catch((error) => {
                    console.error('Error uploading image: ', error);
                });
            } else {
                // Update post data in Firebase Database without changing imageUrl
                database.ref('posts').child(selectedPostKey).update(updates);

                // Clear the form fields
                postForm.reset();
                imagePreview.src = '';
                selectedPostKey = null;
            }
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

        // Display post details
        postItem.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post Image">` : ''}
            <button onclick="editPost('${childSnapshot.key}')">Edit</button>
            <button onclick="deletePost('${childSnapshot.key}')">Delete</button>
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
        if (post.imageUrl) {
            imagePreview.src = post.imageUrl;
        } else {
            imagePreview.src = '';
        }
    });
}

// Display selected image preview
imageInput.addEventListener('change', () => {
    const imageFile = imageInput.files[0];
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(imageFile);
    } else {
        imagePreview.src = '';
    }
});
