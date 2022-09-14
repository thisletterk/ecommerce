import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";
import HomePage from "./HomePage";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Header from "./components/Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Reset from "./pages/Reset";

function App() {
	const [isCurrentUser, setCurrentUser] = useState("");
	const [isName, setIsName] = useState("");
	const [isImage, setIsImage] = useState("");

	const auth = getAuth();

	const authListener = () => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				const name = user.displayName;
				const photo = user.photoURL;
				// ...
				setCurrentUser(user);
				setIsName(name.split(" ")[0].toUpperCase());
				setIsImage(photo);
				// console.log(name.split(" ")[0].toUpperCase());
			} else {
				// User is signed out
				// ...
				setCurrentUser("");
				setIsName("");
			}
		});
	};

	useEffect(() => {
		authListener();
	}, []);

	return (
		<div>
			<Header isCurrentUser={isCurrentUser} isName={isName} isImage={isImage} />
			<Switch>
				<Route exact path='/'>
					<HomePage />
				</Route>
				<Route path='/shop'>
					<Shop />
				</Route>
				<Route path='/reset'>
					<Reset />
				</Route>

				{isCurrentUser ? <Dashboard /> : <Login />}
			</Switch>
		</div>
	);
}

export default App;
