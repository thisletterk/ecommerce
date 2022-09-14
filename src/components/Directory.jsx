import React, { useState } from "react";
import data from "../../data";
import Header from "./Header";

const Directory = () => {
	const [sections, isSections] = useState(data);
	// title, imageUrl, id, linkUrl;
	return (
		<div>
			<section className='overflow-hidden text-gray-700'>
				<div className='container px-5 py-2 mx-auto lg:pt-24 lg:px-32'>
					<div className='flex flex-wrap -m-1 md:-m-2 justify-center'>
						<div className='flex flex-wrap w-3/5 '>
							{sections.map(({ title, imageUrl, id, linkUrl }) => {
								return (
									<div
										key={id}
										className={` p-1 md:p-3 
                                    
                                    ${
																			title === "hats"
																				? "w-1/2"
																				: title === "jackets"
																				? "w-1/2"
																				: title === "mens"
																				? "w-1/2"
																				: title === "caps"
																				? "w-1/2"
																				: "w-full"
																		}
                                    
                                    `}
									>
										<img
											alt='gallery'
											className='block object-cover object-center w-full h-full rounded-lg  hover:scale-110 transition duration-300 ease-in-out'
											src={imageUrl}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Directory;
