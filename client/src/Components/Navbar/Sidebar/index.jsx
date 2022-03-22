import React from 'react'
import date from 'date-and-time';
import { FiFolder, FiGlobe, FiActivity } from "react-icons/fi"
import { IconContext } from 'react-icons';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

function Sidebar({ animate }) {


    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" }
    };

    const now = new Date()


    return (
        <motion.div
            animate={animate ? "open" : "closed"}
            variants={variants}
            initial={{ opacity: 0 }}
            transition={{
                x: { type: "tween" },
                default: { duration: 0.6 }
            }}
            className={`${animate ? "pointer-events-auto" : "pointer-events-none"} fixed top-16 left-2 w-56 normal:w-64 sm:w-72 bg-secondaryBackgroundDarkColor border-2 border-solid border-borderColor bottom-4 rounded-2xl shadow-xl flex flex-col justify-between`}
        >
            <div>
                <div className='flex items-center justify-center mt-6 pb-6 border-b-2 border-solid border-b-borderColor'>
                    <p className='text-tiny text-secondaryTextColor'>{date.format(now, 'ddd, MMM DD YYYY')}</p>
                </div>

                <ul className='w-full mt-4 '>
                    <Link to="/" className='text-lg h-12 w-11/12 cursor-pointer mx-auto flex items-center justify-start transition-all hover:border-transparent pl-4 rounded-lg hover:bg-mainButtonColor/10'>
                        <IconContext.Provider value={{ className: "text-secondaryTextColor mr-3 w-4 h-4" }}>
                            <FiGlobe />
                        </IconContext.Provider>
                        <span className='text-base text-mainTextColor'>Explore</span>
                    </Link>
                    <Link to="/UserProject" className='text-lg h-12 w-11/12 cursor-pointer mx-auto flex items-center justify-start transition-all mb-2 hover:border-transparent pl-4 rounded-lg hover:bg-mainButtonColor/10'>
                        <IconContext.Provider value={{ className: "text-secondaryTextColor mr-3 w-4 h-4" }}>
                            <FiFolder />
                        </IconContext.Provider>
                        <span className='text-base text-mainTextColor'>Your Work</span>
                    </Link>
                    <Link to="/activity" className='text-lg h-12 w-11/12 cursor-pointer mx-auto flex items-center justify-start transition-all mb-2 hover:border-transparent pl-4 rounded-lg hover:bg-mainButtonColor/10'>
                        <IconContext.Provider value={{ className: "text-secondaryTextColor mr-3 w-4 h-4" }}>
                            <FiActivity />
                        </IconContext.Provider>
                        <span className='text-base text-mainTextColor'>Statistics</span>
                    </Link>
                </ul>
            </div>
            <footer className='flex items-center justify-center mb-8 text-super-tiny text-secondaryTextColor'>
                Made with 💜 in india
            </footer>
        </motion.div>
    )
}

export default Sidebar