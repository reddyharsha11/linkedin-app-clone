import Navbar from "../../Navbar/index.jsx";
import NewsCard from "../../NewsCard";
import Footer from "../../Footer/index.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const MainNewsPage=()=>{

    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        fetchNewsData();
    }, []);

    const fetchNewsData = async () => {
        try {
            const response = await fetch("http://localhost:3000/getnews");
            if (response.ok) {
                const data = await response.json();
                setNewsData(data);
            }
        } catch (error) {
            console.error("Error fetching news data:", error);
        }
    };


    return (
       <Link to='/news' >
            <div>
            <Navbar />
            <div>
                {/* <h1 className="text-[#090147] text-3xl font-bold mb-6 text-center pt-8">
                    NEWS
                </h1> */}
                {newsData.map((news)=> <NewsCard newsprop={news}/>)}                
            </div>
            <Footer/>
        </div>
       </Link>
    )
}

export default MainNewsPage;