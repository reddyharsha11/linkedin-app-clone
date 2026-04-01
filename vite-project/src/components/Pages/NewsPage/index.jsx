import { useEffect, useState } from "react";
import NewsCard from "../../NewsCard";
import { useNavigate } from "react-router-dom";

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const navigate = useNavigate();

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
    <div className="bg-white px-6">
      <h1 className="text-[#090147] text-3xl font-bold mb-6 text-center pt-8">
        NEWS
      </h1>

      {/* Show only first 3 */}
      {newsData.slice(0, 3).map((newsItem, index) => (
        <NewsCard key={index} newsprop={newsItem} />
      ))}

      {/* Navigate Button */}
      {newsData.length > 3 && (
        <div className="flex justify-center my-8">
          <button
            onClick={() => navigate("/news")}
            className="cursor-pointer px-6 py-2 bg-[#090147] text-white rounded-lg font-semibold hover:bg-[#12027a] transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
