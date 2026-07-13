import Event from "../../EventCard";
import { useState, useEffect } from 'react';


const EventsPage = () =>{
    
    const [eventData, setEventData] = useState([]);




    const fetchEventData = async () => {
        const response = await fetch('http://localhost:3000/events');
        if (response.ok) {
            const data = await response.json();
            setEventData(data);
        }
        // console.log(eventData);

    };



    useEffect(() => {
        fetchEventData();
    }, []);

return(
    <div className="bg-[#090147]">
        <h1 className="text-3xl font-bold mb-6 text-[#FF8212] text-center pt-8">ICC T2🥎 WorldCup </h1>
        <div className="flex flex-wrap justify-center">
           {eventData.map((event)=>(
            <Event propname={event}/>
           ))}
        </div>
    </div>
)
}
export default EventsPage;