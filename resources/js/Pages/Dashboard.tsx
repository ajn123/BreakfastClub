import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { PageProps } from '@/types/index';
import { XMarkIcon } from '@heroicons/react/24/outline';
export default function Dashboard({ auth, hasCompletedQuestions, toast }: PageProps) {
    return (
        <AuthenticatedLayout
        >

            <div className="py-12">

                {toast && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9 }}
                        className="py-4 px-6 m-12 mx-auto max-w-5xl p-4 bg-green-100 text-green-800 border-l-4 border-green-500 rounded-lg shadow-lg toast"
                    >
                        <button onClick={() => { const toastElement = document.querySelector('.toast'); if (toastElement) { toastElement.classList.add('opacity-0'); setTimeout(() => { toastElement.classList.add('hidden'); }, 0); } }}>
                            <div className="flex items-center space-x-2">
                                <XMarkIcon className="w-6 h-6" />
                                <p className="text-lg font-semibold">{toast.message}</p>
                            </div>
                        </button>
                    </motion.div>
                )}

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg"
                    >
                        <div className="p-6 text-center">
                            <h1 className="text-3xl font-bold text-orange-600 mb-4">
                                Welcome to The Breakfast Club DC
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Your next breakfast adventure awaits!
                            </p>
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg hover:shadow-lg transition">
                            <div className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Host Breakfast</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Create a new breakfast event</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg hover:shadow-lg transition">
                            <div className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Find Events</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Browse upcoming breakfasts</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg hover:shadow-lg transition">
                            <div className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">My Network</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">View your connections</p>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {!hasCompletedQuestions && (
                            <Link
                                href={route('question-answers.index')}
                                className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg hover:shadow-lg transition"
                            >
                                <div className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Complete Profile</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Fill out your questionnaire</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </motion.div>

                    {/* Featured Events */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg"
                    >
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Featured Events</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Coffee & Conversation</h3>
                                    <p className="text-orange-600 dark:text-orange-400">Tomorrow, 8:00 AM</p>
                                    <p className="text-gray-500 dark:text-gray-400">La Colombe Coffee Roasters</p>
                                </div>
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Breakfast Networking</h3>
                                    <p className="text-orange-600 dark:text-orange-400">Saturday, 9:00 AM</p>
                                    <p className="text-gray-500 dark:text-gray-400">Ted's Bulletin</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-center">
                                <div className="text-3xl font-bold text-orange-500 mb-2">12</div>
                                <div className="text-gray-500 dark:text-gray-400">Events Attended</div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-center">
                                <div className="text-3xl font-bold text-orange-500 mb-2">24</div>
                                <div className="text-gray-500 dark:text-gray-400">Connections Made</div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-center">
                                <div className="text-3xl font-bold text-orange-500 mb-2">4.9</div>
                                <div className="text-gray-500 dark:text-gray-400">Average Rating</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
