<script type="module">
  // Import the necessary Firebase functions
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
  import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-storage.js";
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB3WiXtOXsYive5jp1ydAWzpl5X0teZMaw",
    authDomain: "wintertube-c8bd9.firebaseapp.com",
    projectId: "wintertube-c8bd9",
    storageBucket: "wintertube-c8bd9.firebasestorage.app",
    messagingSenderId: "799467371305",
    appId: "1:799467371305:web:9a538e70c8a48778de9538"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // Handle video upload
  document.querySelector('.upload-btn').addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'video/*';

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const storageRef = ref(storage, 'videos/' + file.name);
        
        uploadBytes(storageRef, file).then((snapshot) => {
          console.log('Video uploaded successfully!');
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('Video available at', downloadURL);

            // Create and display video card
            const videoCard = document.createElement('div');
            videoCard.classList.add('video-card');

            const videoElement = document.createElement('video');
            videoElement.src = downloadURL;
            videoElement.controls = true;
            videoElement.width = 300;

            const titleElement = document.createElement('div');
            titleElement.classList.add('video-title');
            titleElement.textContent = file.name;

            videoCard.appendChild(videoElement);
            videoCard.appendChild(titleElement);
            document.querySelector('.video-grid').appendChild(videoCard);
          });
        }).catch((error) => {
          console.error('Error uploading video:', error);
        });
      }
    });

    fileInput.click(); // Trigger file selection
  });

  // Authentication (Sign in with Google)
  document.querySelector('.login-btn').addEventListener('click', () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('Signed in as:', user.displayName);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  });
</script>
