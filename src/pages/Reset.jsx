import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { sendPasswordReset } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Reset = () => {
	const [email, setEmail] = useState("");
	const [user, loading, error] = useState("");

	useEffect(() => {
		if (loading) return;
		if (user) <Redirect to='/login' />;
	}, [user, loading]);
	return (
		<div>
			<section class='h-screen'>
				<div class='container px-6 py-12 h-full'>
					<div class='flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
						<div class='md:w-8/12 lg:w-6/12 mb-12 md:mb-0'>
							<img
								src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
								class='w-full'
								alt='Phone image'
							/>
						</div>
						<div class='md:w-8/12 lg:w-5/12 lg:ml-20'>
							<form>
								{/* <!-- Email input --> */}
								<div class='mb-6'>
									<input
										type='text'
										class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
										placeholder='Email address'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								{/* <!-- Reset button --> */}
								<button
									type='submit'
									class='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'
									data-mdb-ripple='true'
									data-mdb-ripple-color='light'
									onClick={() => sendPasswordReset(email)}
								>
									Reset password
								</button>
								<Link
									class='px-7 py-3 mt-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3'
									style={{ backgroundColor: "#3b5998" }}
									to='/login'
									role='button'
									data-mdb-ripple='true'
									data-mdb-ripple-color='light'
								>
									LOGIN
								</Link>
								<Link
									class='px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center'
									style={{ backgroundColor: "#55acee" }}
									to='/login'
									role='button'
									data-mdb-ripple='true'
									data-mdb-ripple-color='light'
								>
									Register
								</Link>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Reset;
