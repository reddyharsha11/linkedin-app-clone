import Navbar from "../../Navbar/index.jsx";
import EventsPage from "../EventsPage/index.jsx";
import { Link } from "react-router-dom";
import DomeGallery from '../../DomeGallery/index.jsx';
import NewsPage from "../NewsPage/index.jsx";
import Footer from "../../Footer/index.jsx";
const Home = () => {

    return (

        <>
            <div>
                <Navbar />
                <div className="w-full h-screen flex items-center justify-center bg-[url('https://images.icc-cricket.com/image/private/t_q-best/v1768390464/prd/assets/tournaments/mens-t20-world-cup-2026/Men%E2%80%99s%20T20WC%202026%20%E2%80%93%20(IND%20P)%20Tickets%20on%20Sale-21x9%20copy.jpg')] bg-cover bg-center">
                    {/* <h1 className="text-[#FF8212] ">HOME PAGE</h1> */}
                </div>
                <EventsPage />
            </div>
            <div style={{ height: '100vh' }}>
                <DomeGallery
                    fit={0.8}
                    minRadius={600}
                    maxVerticalRotationDeg={5}
                    segments={40}
                    dragDampening={6}
                    grayscale={false}
                />
            </div>
            <NewsPage/>
            <Footer/>
        </>
    )
}

export default Home;