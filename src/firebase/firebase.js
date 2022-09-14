// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithEmailAndPassword,
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

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDWyG1twYlzvOAieW6JTC3pU0Ny7KQ_FTI",
	authDomain: "ecommerce-a03ea.firebaseapp.com",
	projectId: "ecommerce-a03ea",
	storageBucket: "ecommerce-a03ea.appspot.com",
	messagingSenderId: "91869070031",
	appId: "1:91869070031:web:a95fe64d14d95351d6edba",
	measurementId: "G-2ZVHD3L4NG",
};

///////// ----------- GOOGLE SIGN UP STARTS HERE -------------------------------//////////

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase DATABASE
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const provider = new GoogleAuthProvider();

const auth = getAuth();

const signInWithGoogle = () => {
	signInWithPopup(auth, provider)
		.then(async (result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;

			//Add user to database
			const q = query(collection(db, "users"), where("uid", "==", user.uid));
			const docs = await getDocs(q);

			if (docs.docs.length === 0) {
				await addDoc(collection(db, "users"), {
					uid: user.uid,
					name: user.name,
					authProvider: "google",
					email: user.email,
				});
			}
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
};

///////// ----------- GOOGLE SIGN UP ENDS HERE --------------------------------------//////////

// ------------FUNCTION TO HANDLE SIGN IN WITH EMAIL & PASSWORD-----------
const logInWithEmailAndPassword = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

// ------------FUNCTION TO HANDLE SIGN UP WITH EMAIL & PASSWORD-----------
const registerWithEmailAndPassword = async (displayName, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await addDoc(collection(db, "users"), {
			uid: user.uid,
			displayName,
			authProvider: "local",
			email,
		});
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

// ------------FUNCTION TO RESET USER WITH EMAIL ---------------------
const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert("Password reset link sent!");
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

///////// ----------- FACEBOOK SIGN IN STARTS HERE --------------------------------------//////////

const signInWithFacebook = () => {
	const provider_facebook = new FacebookAuthProvider();
	const auth = getAuth();
	const provider = new FacebookAuthProvider();
	signInWithPopup(auth, provider_facebook)
		.then((result) => {
			// The signed-in user info.
			const user = result.user;

			// This gives you a Facebook Access Token. You can use it to access the Facebook API.
			const credential = FacebookAuthProvider.credentialFromResult(result);
			const accessToken = credential.accessToken;

			// ...
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = FacebookAuthProvider.credentialFromError(error);

			// ...
		});
};
///////// ----------- FACEBOOK SIGN IN ENDS HERE --------------------------------------//////////

///////-------------------LOG OUT FUNCTION--------------------
const logoutUser = () => {
	signOut(auth);
};

// --------------------EXPORT FUNCTIONS HERE----------------------

export {
	auth,
	signInWithGoogle,
	signInWithFacebook,
	logoutUser,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	db,
};
