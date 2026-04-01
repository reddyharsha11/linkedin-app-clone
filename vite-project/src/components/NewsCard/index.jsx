const NewsCard = (props) => {

    const { newsprop } = props;
    const { headline, newsImage, date, description } = newsprop;

    return (
        <div className=" rounded-lg flex gap-6 p-6 mx-4 my-4 shadow-sm overflow-hidden bg-[#090147]">

            {/* Left Image */}
            <div className="h-[300px] flex-[4] rounded-lg overflow-hidden">
                <img
                    className="w-full h-full object-cover max-w-full"
                    src={newsImage}
                    alt={headline}
                />
            </div>

            {/* Right Content */}
            <div className="flex flex-col justify-between flex-[6] pr-2 ">

                <div>
                    <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold text-white bg-[#D81B9A] rounded-full">
                        T20 World Cup 2026
                    </span>

                    <h2 className="text-2xl font-extrabold text-gray-900 mb-3 text-white">
                        {headline}
                    </h2>

                    <div className="w-16 h-[2px] bg-gray-200 mb-3"></div>

                    <p className="text-base text-gray-700 leading-relaxed text-white">
                        {description}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <p className="text-sm text-white">{date}</p>
                    <p className="text-sm font-semibold   cursor-pointer text-[#D81B9A]">
                        Read more →
                    </p>
                </div>

            </div>
        </div>


    )
}

export default NewsCard;