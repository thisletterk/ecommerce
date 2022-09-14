import React from "react";
import Header from "../components/Header";
import Signup_Login from "../components/Signup_Login";
import { signInWithGoogle } from "../firebase/firebase";

const SignUp = () => {
	return (
		<div>
			<Signup_Login
				signin_signup='Sign Up'
				facebook='Sign Up with Facebook'
				google='Sign Up with Google'
			/>
		</div>
	);
};

export default SignUp;
