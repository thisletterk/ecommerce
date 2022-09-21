import React, { useEffect, useState } from "react";
import Signup_Login from "../components/Signup_Login";
import { Link, Redirect } from "react-router-dom";
import {
	signInWithGoogle,
	signInWithFacebook,
	auth,
	signUpNewUsers,
	signInUsers,
} from "../firebase/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const Login = ({ props }) => {
	const [signInEmail, setSignInEmail] = useState("");
	const [signInPassword, setSignInPassword] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [user, loading] = useState("");
	const [name, setName] = useState("");

	//----function to register new user
	// const register = () => {
	// 	if (!name) alert("Please enter name");
	// 	// signUpNewUsers(name, email, password);
	// 	alert("user has been added");
	// };

	const validatePassword = (props) => {
		let isValid = true;
		if (password !== "" && confirmPassword !== "") {
			if (password !== confirmPassword) {
				isValid = false;
				alert("Passwords does not match");
				setError("Passwords does not match");
			}
		}
		return isValid;
	};

	const register = (e) => {
		e.preventDefault();
		setError("");
		if (!name) alert("Please enter name");
		if (validatePassword()) {
			// Create a new user with email and password using firebase
			createUserWithEmailAndPassword(auth, email, password)
				.then(async (res) => {
					console.log(res.user);
					// if (res.user.displayName === null) {
					// 	const showName = name;

					// 	props.setName(showName);
					// 	console.log("OKs " + showName);
					// }
					const user = res.user;
					// await addDoc(collection(db, "users"), {
					// 	uid: user.uid,
					// 	name,
					// 	authProvider: "local",
					// 	email,
					// });

					// ok//////////
					if (!userAuth) return;
					const userRef = firestore.doc(`users/${userAuth.uid}`);

					const snapShot = await userRef.get();

					if (!snapShot.exists) {
						try {
							const docRef = await setDoc(collection(db, "users"), {
								uid: user.uid,
								name: user.displayName,
								authProvider: "local",
								email: user.email,
							});
							console.log("Document written with ID: ", docRef.id);
						} catch (e) {
							console.error("Error adding document: ", e);
						}
					}

					// ok//////////
				})
				.catch((err) => setError(err.message));
		}
		setName("");
		setEmail("");
		setPassword("");
		setConfirmPassword("");
	};

	useEffect(() => {
		if (loading) {
			//maybe show loading/spinner image
			return;
		}
		if (user) <Redirect to='/dashboard' />;
	}, [user, loading]);

	// function for login
	const login = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, signInEmail, signInPassword)
			.then(() => {
				if (!auth.currentUser.emailVerified) {
					sendEmailVerification(auth.currentUser)
						.then(() => {
							<Redirect to='/dashboard' />;
						})
						.catch((err) => alert(err.message));
				} else {
					<Redirect to='/' />;
				}
			})
			.catch((err) => setError(err.message));
	};

	return (
		<div>
			<section className='h-screen'>
				<div className='container px-6 py-12 h-full'>
					<div className='flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
						{/* ------------------------------SIGN UP--------------------- */}
						<div className='md:w-8/12 lg:w-5/12 lg:ml-20 '>
							<form onSubmit={register}>
								<h2 className='text-white font-poppins '>SIGN UP</h2>
								{/* <!-- Name input --> */}
								<div className='mb-6'>
									<input
										type='text'
										className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
										placeholder='Enter Your Name'
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								{/* <!-- Email input --> */}
								<div className='mb-6'>
									<input
										type='text'
										className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
										placeholder='Email address'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								{/* <!-- Password input --> */}
								<div className='mb-6'>
									<input
										type='password'
										className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
										placeholder='Password'
										onChange={(e) => setPassword(e.target.value)}
										value={password}
									/>
								</div>
								<div className='mb-6'>
									<input
										type='password'
										className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
										placeholder='Password'
										onChange={(e) => setConfirmPassword(e.target.value)}
										value={confirmPassword}
									/>
								</div>
								{error && (
									<div className='text-red-900 flex justify-center items-center mb-6'>
										{error}
									</div>
								)}

								{/* <div className='flex justify-between items-center mb-6'>
									<div className='form-group form-check'>
										<label
											className='form-check-label inline-block text-white'
											for='exampleCheck2'
										>
											Remember me
										</label>
										<input
											type='checkbox'
											className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
											id='exampleCheck3'
											checked
										/>
									</div>
								</div> */}

								{/* <!-- Submit button --> */}
								<button
									type='submit'
									className='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'
									data-mdb-ripple='true'
									data-mdb-ripple-color='light'
								>
									Sign Up
								</button>

								<div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
									<p className='text-center font-semibold mx-4 mb-0 text-white font-poppins'>
										OR
									</p>
								</div>

								<a
									className='px-7 py-3 text-white bg-blue-900 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3'
									role='button'
									data-mdb-ripple='true'
									data-mdb-ripple-color='light'
								>
									{/* <!-- Facebook --> */}
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 320 512'
										className='w-3.5 h-3.5 mr-2'
									>
										{/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
										<path
											fill='currentColor'
											d='M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z'
										/>
									</svg>
									Sign up Facebook
								</a>
								<a
									className='px-7 py-3 text-white bg-red-600 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center'
									role='button'
									data-mdb-ripple='true'
									data-mdb-ripple-color='light'
									onClick={signInWithGoogle}
								>
									{/* <!-- Google --> */}
									<svg
										style={{ color: "white" }}
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='currentColor'
										className='w-3.5 h-3.5 mr-2'
										viewBox='0 0 16 16'
									>
										{" "}
										<path
											d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z'
											fill='white'
										></path>{" "}
									</svg>
									Sign up Google
								</a>
							</form>
						</div>

						{/* -------------------LOG IN----------------------- */}
						<div className='md:w-8/12 lg:w-5/12 lg:ml-20 '>
							<form onSubmit={login}>
								<h2 className='text-white font-poppins '>LOGIN</h2>

								{/* <!-- Email input --> */}
								<div className='mb-6'>
									<input
										type='text'
										className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
										placeholder='Email address'
										value={signInEmail}
										onChange={(e) => setSignInEmail(e.target.value)}
									/>
								</div>

								{/* <!-- Password input --> */}
								<div className='mb-6'>
									<input
										type='password'
										className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
										placeholder='Password'
										onChange={(e) => setSignInPassword(e.target.value)}
										value={signInPassword}
									/>
								</div>

								{error && (
									<div className='text-red-900 flex justify-center items-center mb-6'>
										{error}
									</div>
								)}

								{/* <div className='flex justify-between items-center mb-6'>
									<div className='form-group form-check'>
										<label
											className='form-check-label inline-block text-white'
											for='exampleCheck2'
										>
											Remember me
										</label>
										<input
											type='checkbox'
											className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
											id='exampleCheck3'
											checked
										/>
									</div>
								</div> */}

								{/* <!-- Submit button --> */}
								<button
									type='submit'
									className='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'
									data-mdb-ripple='true'
									data-mdb-ripple-color='light'
								>
									Login
								</button>

								<div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
									<p className='text-center font-semibold mx-4 mb-0 text-white font-poppins'>
										OR
									</p>
								</div>

								<a
									className='px-7 py-3 text-white bg-blue-900 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3'
									role='button'
									data-mdb-ripple='true'
									data-mdb-ripple-color='light'
								>
									{/* <!-- Facebook --> */}
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 320 512'
										className='w-3.5 h-3.5 mr-2'
									>
										{/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
										<path
											fill='currentColor'
											d='M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z'
										/>
									</svg>
									Sign up Facebook
								</a>
								<a
									className='px-7 py-3 text-white bg-red-600 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center'
									role='button'
									data-mdb-ripple='true'
									data-mdb-ripple-color='light'
									onClick={signInWithGoogle}
								>
									{/* <!-- Google --> */}
									<svg
										style={{ color: "white" }}
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='currentColor'
										className='w-3.5 h-3.5 mr-2'
										viewBox='0 0 16 16'
									>
										{" "}
										<path
											d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z'
											fill='white'
										></path>{" "}
									</svg>
									Sign up Google
								</a>
							</form>
						</div>
						{/* /////----------LOGIN END------------///// */}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Login;
