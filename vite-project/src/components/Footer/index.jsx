import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#090147] text-white pt-12 pb-8 font-sans">
            <div className="container mx-auto px-4">
                {/* Top Section: Brand & Newsletter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-6 md:space-y-0">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-extrabold tracking-tight">
                            <span className="text-[#FF8212]">EASY</span>
                            <span className="text-[#D81B9A]">BOOKINGS</span>
                        </h2>
                        <p className="text-gray-300 mt-2 text-sm">
                            Your gateway to live cricket action.
                        </p>
                    </div>

                    <div className="w-full md:w-auto">
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-[#D81B9A] text-white placeholder-gray-400 w-full sm:w-64"
                            />
                            <button
                                type="button"
                                className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-[#D81B9A] to-[#FF8212] hover:opacity-90 transition-opacity text-white"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Middle Section: Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-t border-white/10 pt-12">
                    {/* Column 1: About */}
                    <div>
                        <h3 className="text-[#FF8212] font-bold mb-4 uppercase text-sm tracking-wider">About Us</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            We provide the seamless ticket booking experience for all major cricket matches. Official partner of major leagues.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-[#FF8212] font-bold mb-4 uppercase text-sm tracking-wider">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a href="#" className="hover:text-[#D81B9A] transition-colors">Upcoming Matches</a></li>
                            <li><a href="#" className="hover:text-[#D81B9A] transition-colors">Teams</a></li>
                            <li><a href="#" className="hover:text-[#D81B9A] transition-colors">Venues</a></li>
                            <li><a href="#" className="hover:text-[#D81B9A] transition-colors">Season Pass</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div>
                        <h3 className="text-[#FF8212] font-bold mb-4 uppercase text-sm tracking-wider">Support</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a href="#" className="hover:text-[#D81B9A] transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-[#D81B9A] transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-[#D81B9A] transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-[#D81B9A] transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Follow Us */}
                    <div>
                        <h3 className="text-[#FF8212] font-bold mb-4 uppercase text-sm tracking-wider">Follow Us</h3>
                        <div className="flex space-x-4">
                            {/* Social Icons (using simple SVGs/Classes for now) */}
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D81B9A] transition-colors group">
                                <span className="sr-only">Facebook</span>
                                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D81B9A] transition-colors group">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D81B9A] transition-colors group">
                                <span className="sr-only">Instagram</span>
                                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.315 2zm-1.2 1.802c-2.436 0-2.72.01-3.67.053-.948.044-1.469.197-1.815.333a3.109 3.109 0 00-1.134.735A3.109 3.109 0 003.86 6.13c-.136.346-.289.867-.333 1.815-.043.95-.053 1.234-.053 3.67s.01 2.72.053 3.67c.044.948.197 1.469.333 1.815.22.56.51 1.02.93 1.44s.88.71 1.44.93c.346.136.867.289 1.815.333.95.043 1.234.053 3.67.053s2.72-.01 3.67-.053c.948-.044 1.469-.197 1.815-.333.56-.22 1.02-.51 1.44-.93s.71-.88.93-1.44c.136-.346.289-.867.333-1.815.043-.95.053-1.234.053-3.67s-.01-2.72-.053-3.67c-.044-.948-.197-1.469-.333-1.815-.22-.56-.51-1.02-.93-1.44s-.88-.71-1.44-.93c-.346-.136-.867-.289-1.815-.333-.95-.043-1.234-.053-3.67-.053zm3.763 3.243a1.2 1.2 0 11-1.584 1.584 1.2 1.2 0 011.584-1.584zM12 7.15A4.85 4.85 0 117.15 12 4.856 4.856 0 0112 7.15zm0 1.8A3.05 3.05 0 1015.05 12 3.054 3.054 0 0012 8.95z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-center md:text-left text-gray-500">
                    <p>&copy; {new Date().getFullYear()} EASYBOOKINGS. All rights reserved.</p>
                    <div className="flex items-center space-x-1 mt-2 md:mt-0">
                        <span>Made with</span>
                        <span className="text-red-500 animate-pulse text-lg">❤️</span>
                        <span>for Cricket Fans</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
