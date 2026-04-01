import { useState, useEffect } from 'react';
const Event = (props) => {
    const { propname } = props;
    const{name, eventImage, date, location, description} = propname;

// bg-[#FF8212] 
    return (
        <div className='rounded-lg flex flex-col  rounded-lg border-2 border-[#D81B9A] bg-orange-400  m-6 hover:-translate-y-2 transition duration-300 '>
            <div className='items-center'>
                <img className="h-[250px] w-full rounded-lg" src={eventImage} />
            </div>
            <div className='text-white p-4 w-full'>
                <h1 className='font-sans font-bold'>{name}</h1>
                <p className='font-sans'>Date:{date}</p>
                <p className='font-sans'>Venue:{location}</p>
                <button className='cursor-pointer bg-[#D81B9A] text-white px-4 py-2 rounded-lg mt-4 hover:bg-pink-500'>Book Now</button>
            </div>
        </div>

    )
};

export default Event;
