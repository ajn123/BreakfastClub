import EventItem from '@/Components/EventItem';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Event } from '../types';
import axios from 'axios';

import { useState, useEffect } from 'react';
import EventSwiper from '@/Components/EventSwiper';

const Panel: React.FC<{
  bgColor?: string;
  children: React.ReactNode;
}> = ({ bgColor = "bg-white", children }) => (
  <div className={`min-h-screen ${bgColor} flex items-center justify-center p-8`}>
    <div className="max-w-6xl w-full">
      {children}
    </div>
  </div>
);

const GrassBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grass-container">
      <div className="grass-background">
        {/* Create multiple grass blades */}
        {[...Array(20)].map((_, index) => (
          <div key={index} className="grass-blade" style={{
            left: `${index * 5}%`,
            animationDelay: `${index * 0.1}s`
          }} />
        ))}
      </div>
      {/* Content overlay */}
      <div className="content-overlay">
        {children}
      </div>
      <style>{`
        .grass-container {
          width: 100%;
          height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .grass-background {
          width: 100%;
          height: 100%;
          background-color: #4CAF50;
          position: absolute;
          top: 0;
          left: 0;
        }

        .content-overlay {
          position: relative;
          z-index: 10;
          height: 100%;
        }

        .grass-blade {
          position: absolute;
          bottom: 0;
          width: 10px;
          height: 40px;
          background: linear-gradient(to top, #2E7D32, #388E3C);
          border-radius: 10px 10px 0 0;
          transform-origin: bottom center;
          animation: sway 4s ease-in-out infinite;
        }

        @keyframes sway {
          0%, 100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
};

export default function Welcome() {
    const [searchQuery, setSearchQuery] = useState('');
    const [query, setQuery] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    return (
        <div className="snap-y snap-proximity h-screen overflow-y-auto">
            {/* Hero Panel */}
            <div className="snap-start h-screen">
                <GrassBackground>
                    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 my-16">
                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-center max-w-4xl mx-auto"
                        >
                            {/* Logo/Title */}
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="mb-8"
                            >
                                <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
                                    Touch Grass DC
                                </h1>
                                <div className="h-1 w-24 bg-white mx-auto rounded-full"></div>
                            </motion.div>

                            {/* Tagline */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl md:text-3xl text-white mb-8 font-light"
                            >
                                Welcome to a group dedicated to getting off screens and connecting with each other.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                            >
                                <Link
                                    href={"#regular-events"}
                                    className="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transform hover:scale-105 transition shadow-lg hover:shadow-xl"
                                >
                                    Find Events
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-orange-500 transform hover:scale-105 transition shadow-lg hover:shadow-xl"
                            
                                >
                                    Sign Up 
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </GrassBackground>
            </div>

            {/* Events Panel */}
            <div className="snap-start h-screen" id="regular-events">
                <Panel bgColor="bg-blue-300">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl font-bold  mb-8" >Regular Events</h2>
                        
                        <EventSwiper />
                    </motion.div>
                </Panel>
            </div>

            {/* Community Panel */}
            <div className="snap-start h-screen">
                <Panel bgColor="bg-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row items-center gap-12"
                    >
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">Join Our Community</h2>
                            <p className="text-xl text-gray-600 mb-8">
Studies show that devices are stealing our attention, let's reconnect to the world and each other with time off screens.
                            </p>
                            <div className="flex gap-4">
                                {/* <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">500+</div>
                                    <div className="text-gray-600">Members</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">50+</div>
                                    <div className="text-gray-600">Events</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">4.9★</div>
                                    <div className="text-gray-600">Rating</div>
                                </div> */}
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            {/* <img 
                                src="/images/community.jpg" 
                                alt="Community" 
                                className="rounded-xl shadow-2xl"
                            /> */}
                        </div>
                    </motion.div>
                </Panel>
            </div>

            {/* Upcoming Events Preview */}
            <div className="snap-start h-screen">
                <Panel bgColor="bg-green-900">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-white"
                    >
                        <h2 className="text-4xl font-bold mb-8">Upcoming Events</h2>
                        <h3 className="text-xl mb-8"> Sign up for our newsletter to stay up to date on our events</h3>


                    </motion.div>
                </Panel>
            </div>

            {/* Call to Action Panel */}
            <div className="snap-start h-screen">
                <Panel bgColor="bg-gradient-to-br from-green-500 to-green-800">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-white"
                    >
                        <h2 className="text-4xl font-bold mb-6">Ready to Touch Grass?</h2>
                        <p className="text-xl mb-8">Join us and start making real connections in DC</p>
                        <Link
                            href={route('register')}
                            className="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transform hover:scale-105 transition shadow-lg hover:shadow-xl"
                        >
                            Get Started Today
                        </Link>
                    </motion.div>
                </Panel>
            </div>
        </div>
    );
}