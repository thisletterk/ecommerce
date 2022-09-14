import React from "react";
import { Link, Redirect } from "react-router-dom";
import logo from "../assets/eCommerce_logo.png";
import { auth } from "../firebase/firebase";
import HomePage from "../HomePage";

const Header = ({ isCurrentUser, isName, isImage }) => {
	return (
		<nav
			className='
			relative
			w-full
			flex flex-wrap
			items-center
			justify-between
			py-0
			bg-gray
			text-gray-500
			hover:text-gray-700
			focus:text-gray-700
			shadow-md
			navbar navbar-expand-lg navbar-light
			'
		>
			<div className='container-fluid w-full flex flex-wrap items-center justify-between px-6'>
				<button
					className='
					navbar-toggler
					text-gray-500
					border-0
					hover:shadow-none hover:no-underline
					py-2
					px-2.5
					bg-transparent
					focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
					'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<svg
						aria-hidden='true'
						focusable='false'
						data-prefix='fas'
						data-icon='bars'
						className='w-6'
						role='img'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 448 512'
					>
						<path
							fill='currentColor'
							d='M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z'
						></path>
					</svg>
				</button>
				<div
					className='collapse navbar-collapse flex-grow items-center'
					id='navbarSupportedContent'
				>
					<Link
						className='
						flex
						items-center
						text-gray-900
						hover:text-gray-900
						focus:text-gray-900
						mt-2
						lg:mt-0
						mr-1
					'
						to='/'
					>
						<img src={logo} style={{ height: "90px" }} alt='' loading='lazy' />
					</Link>
					{/* <!-- Left links --> */}
					<ul className='navbar-nav flex flex-col pl-0 list-style-none mr-auto '>
						<li className='nav-item p-2'>
							<Link
								className='nav-link font-poppins text-white hover:text-gray-700 focus:text-gray-700 p-0'
								to='/shop'
							>
								Shop
							</Link>
						</li>
						<li className='nav-item p-2'>
							<Link
								className='nav-link font-poppins text-white hover:text-gray-700 focus:text-gray-700 p-0'
								href='#'
							>
								{isCurrentUser ? (
									<Link
										data-mdb-ripple='true'
										data-mdb-ripple-color='light'
										to='/dashboard'
									>
										Dashboard
									</Link>
								) : null}
							</Link>
						</li>
						<li className='nav-item p-2'>
							<Link
								className='nav-link font-poppins text-white hover:text-gray-700 focus:text-gray-700 p-0'
								href='#'
							>
								{isCurrentUser ? (
									<Link
										data-mdb-ripple='true'
										data-mdb-ripple-color='light'
										onClick={() => {
											auth.signOut();
											<Redirect to='/' />;
										}}
									>
										Sign Out
									</Link>
								) : (
									<Link
										to='/login'
										data-mdb-ripple='true'
										data-mdb-ripple-color='light'
									>
										Login
									</Link>
								)}
							</Link>
						</li>
					</ul>
					{/* <!-- Left links --> */}
				</div>
				{/* <!-- Collapsible wrapper --> */}

				{/* <!-- Right elements --> */}
				<div className='flex items-center relative'>
					<div className='mx-10'>
						{/* --------DISPLAY USER NAME---------- */}
						{isName ? (
							<div className='text-white font-poppins'>Welcome, {isName}</div>
						) : (
							<div></div>
						)}

						{/* --------DISPLAY USER NAME---------- */}
					</div>
					{/* <!-- Icon --> */}
					<Link
						className='text-gray-500 hover:text-gray-700 focus:text-gray-700 mr-6'
						to='/shop'
					>
						<svg
							aria-hidden='true'
							focusable='false'
							data-prefix='fas'
							data-icon='shopping-cart'
							className='w-4'
							role='img'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 576 512'
						>
							<path
								fill='white'
								d='M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z'
							></path>
						</svg>
						<span className='text-white bg-red-700 absolute rounded-full text-xs -mt-2.5 ml-2 py-0 px-1.5'>
							12
						</span>
					</Link>
					<div className='dropdown relative'>
						<ul
							className='
							dropdown-menu
							min-w-max
							absolute
							hidden
							bg-white
							text-base
							z-50
							float-left
							py-2
							list-none
							text-left
							rounded-lg
							shadow-lg
							mt-1
							
							m-0
							bg-clip-padding
							border-none
							left-auto
							right-0
							'
							aria-labelledby='dropdownMenuButton1'
						>
							<li>
								<a
									className='
								dropdown-item
								text-sm
								py-2
								px-4
								font-normal
								block
								w-full
								whitespace-nowrap
								bg-transparent
								text-gray-700
								hover:bg-gray-100
								'
									href='#'
								>
									Action
								</a>
							</li>
							<li>
								<a
									className='
							dropdown-item
							text-sm
							py-2
							px-4
							font-normal
							block
							w-full
							whitespace-nowrap
							bg-transparent
							text-gray-700
							hover:bg-gray-100
							'
									href='#'
								>
									Another action
								</a>
							</li>
							<li>
								<a
									className='
								dropdown-item
								text-sm
								py-2
								px-4
								font-normal
								block
								w-full
								whitespace-nowrap
								bg-transparent
								text-gray-700
								hover:bg-gray-100
								'
									href='#'
								>
									Something else here
								</a>
							</li>
						</ul>
					</div>
					<div className='dropdown relative'>
						<a
							className='dropdown-toggle flex items-center hidden-arrow'
							href='#'
							id='dropdownMenuButton2'
							role='button'
							data-bs-toggle='dropdown'
							aria-expanded='false'
						>
							<img
								src={
									isImage === ""
										? `https://mdbootstrap.com/img/new/avatars/2.jpg`
										: isImage
								}
								className='rounded-full'
								style={{ height: "30px", width: "30px" }}
								alt=''
								loading='lazy'
							/>
						</a>
						<ul
							className='
							dropdown-menu
							min-w-max
							absolute
							
							bg-white
							text-base
							z-50
							float-left
							py-2
							list-none
							text-left
							rounded-lg
							shadow-lg
							mt-1
							hidden
							m-0
							bg-clip-padding
							border-none
							left-auto
							right-0
  '
							aria-labelledby='dropdownMenuButton2'
						>
							<li>
								<a
									className='
								dropdown-item
								text-sm
								py-2
								px-4
								font-normal
								block
								w-full
								whitespace-nowrap
								bg-transparent
								text-gray-700
								hover:bg-gray-100
							'
									href='#'
								>
									Action
								</a>
							</li>
							<li>
								<a
									className='
							dropdown-item
							text-sm
							py-2
							px-4
							font-normal
							block
							w-full
							whitespace-nowrap
							bg-transparent
							text-gray-700
							hover:bg-gray-100
						'
									href='#'
								>
									Another action
								</a>
							</li>
							<li>
								<a
									className='
							dropdown-item
							text-sm
							py-2
							px-4
							font-normal
							block
							w-full
							whitespace-nowrap
							bg-transparent
							text-gray-700
							hover:bg-gray-100
						'
									href='#'
								>
									Something else here
								</a>
							</li>
						</ul>
					</div>
				</div>
				{/* <!-- Right elements --> */}
			</div>
		</nav>
	);
};

export default Header;
