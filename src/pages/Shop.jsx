import React, { useState } from "react";
import shopData from "../../shopData";

const Shop = () => {
	const [isShopData, setIsShopData] = useState(shopData);
	return (
		<div>
			<div className='text-white mt-20'>
				{shopData.map(({ title, id, items }) => {
					{
						console.log({ items });
					}
					return (
						<div key={id}>
							<div className='flex justify-center m-0 mt-5'>
								<h1 className='font-poppins text-[24px]'>
									{title.toUpperCase()}
								</h1>
							</div>

							<section className='overflow-hidden text-white font-poppins '>
								<div className='container px-5 py-2 mx-auto lg:pt-12 lg:px-32'>
									<div className='flex flex-wrap -m-1 md:-m-2'>
										{items
											.filter((i, x) => x < 3)
											.map(({ name, imageUrl }) => {
												return (
													<div className='flex flex-wrap w-1/3'>
														<h1 className='font-poppins text-[18px]'>{name}</h1>
														<div className='w-full p-1 md:p-2'>
															<img
																alt='gallery'
																className='block object-cover object-center w-full h-full rounded-lg'
																src={imageUrl}
															/>
														</div>
													</div>
												);
											})}
									</div>
								</div>
							</section>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Shop;
