import SearchBar from "../Searchbar";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="bg-[#090147]  ">
            <div className="container mx-auto flex justify-around items-center">

                <div className="">
                    <Link to='/'>
                        <h1 className="font-sans text-[#FF8212] text-3xl cursor-pointer font-bold hover:text-[#D81B9A]">EASYBOOKINGS</h1>
                    </Link>

                </div>
                <SearchBar/>
                <div className="flex items-center  font-mono">
                    
                    <p className="mr-4 cursor-pointer text-[#FF8212] hover:text-[#D81B9A] font-bold text-xl" >
                        Events
                    </p>
                    <Link to='/news' >
                        <p className="mr-4 cursor-pointer text-[#FF8212] hover:text-[#D81B9A] font-bold text-xl">
                            News
                        </p>
                    </Link>
                    <p className="mr-4 cursor-pointer text-[#FF8212] hover:text-[#D81B9A] font-bold text-xl">
                        About
                    </p>
                    <p className="cursor-pointer text-[#FF8212] hover:text-[#D81B9A] font-bold text-xl">
                        Contact
                    </p>
                </div>


            </div>
        </nav>
    );
}

export default Navbar;
