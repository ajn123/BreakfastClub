import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
            {/* Decorative breakfast icons background */}
            <div className="absolute inset-0 z-0 opacity-5">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0ZM30 45C21.7157 45 15 38.2843 15 30C15 21.7157 21.7157 15 30 15C38.2843 15 45 21.7157 45 30C45 38.2843 38.2843 45 30 45Z' fill='%23EA580C' fill-opacity='0.1'/%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    {/* Logo/Title */}
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <h1 className="text-6xl md:text-7xl font-bold text-orange-600 mb-4">
                            DC Offline
                        </h1>
                        <div className="h-1 w-24 bg-orange-500 mx-auto rounded-full"></div>
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-3xl text-gray-700 mb-8 font-light"
                    >
                        Start Your Day with Great
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
                    >
                        Join DC's most vibrant morning community. We bring together professionals,
                        creatives, and early risers for meaningful conversations over delicious breakfasts.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                    >
                        <Link
                            href={route('register')}
                            className="px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transform hover:scale-105 transition shadow-lg hover:shadow-xl"
                        >
                            Join the Club
                        </Link>
                        <Link
                            href={route('login')}
                            className="px-8 py-4 bg-white text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transform hover:scale-105 transition shadow-lg hover:shadow-xl"
                        >
                            Sign In
                        </Link>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
                    >
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-500 mb-2">500+</div>
                            <div className="text-gray-600">Members</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
                            <div className="text-gray-600">Venues</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-500 mb-2">1000+</div>
                            <div className="text-gray-600">Connections Made</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="absolute bottom-8 text-center text-gray-500"
                >
                    <p>Available in Washington, DC and surrounding areas</p>
                </motion.div>
            </div>
        </div>
    );
}