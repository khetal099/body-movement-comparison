import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
console.log("This is being called : ", process.env.REACT_APP_API_KEY);
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
var storage = getStorage(app);

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const registerUserWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            type:"user",
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const UploadVideoToStorage = async (videoFile, imageFile, metadata) => {
    // Get the selected file
    console.log("this is being called : ",videoFile, imageFile, metadata);
    // Create a new reference in Firebase Storage
    var videoRef = ref(storage, 'videos/' + videoFile.name);

    // Upload the file to Firebase Storage
    return new Promise((res, rej)=>{uploadBytes(videoRef, videoFile).then(function (snapshot) {
        getDownloadURL(videoRef).then((videoURL) => {

            const thumbnailRef = ref(storage, `thumbnails/${imageFile.name}`);
            uploadBytes(thumbnailRef, imageFile).then(()=>{
                getDownloadURL(thumbnailRef).then((thumbnailURL) => {
                    addDoc(collection(db, "poses"), {
                        videoURL: videoURL,
                        thumbnailURL: thumbnailURL,
                        title: metadata.title,
                        description: metadata.description,
                        impPoints: metadata.ImpPoints,
                    }).then(() => {
                        console.log('Video and thumbnail URLs stored in Firestore!');
                        res("Done!")
                      }).catch((error) => {
                        console.error('Error storing video and thumbnail URLs in Firestore:', error);
                      });
                }).catch(function (error) {
                    console.error('Error getting image:', error);
                })
            }).catch(function (error) {
                console.error('Error uploading image:', error);
            })

        }).catch(function (error) {
            console.error('Error getting video:', error);
        })
    }).catch(function (error) {
        console.error('Error uploading video:', error);
    })})
};

const fetchPosesData = async (user) => {
    try {
        const q = query(collection(db, "poses"));
        
        const doc = await getDocs(q);
        let data = []
        // console.log(doc.docs)
        doc.docs.map((item) => {
            let d = item.data()
            data.push(d)
            
        });
        return data;
    } catch (err) {
        console.error(err);
        alert("An error occurred  while fetching  data");
    }
};

const logout = () => {
    signOut(auth);
};
export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerUserWithEmailAndPassword,
    sendPasswordReset,
    UploadVideoToStorage,
    fetchPosesData,
    logout,
};