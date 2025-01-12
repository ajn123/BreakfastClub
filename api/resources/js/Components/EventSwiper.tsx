import React, { useState, useEffect } from 'react';
import { motion, PanInfo, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface Event {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
}

export default function EventSwiper() {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);


    // Load more events when we're running low
    useEffect(() => {
        if (events.length - currentIndex <= 2 && !loading) {
            loadMoreEvents();
        }
    }, [currentIndex, events.length, loading]);

    const loadMoreEvents = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axios.get(`/api/events?limit=5&page=${page}`);
            setPage(page + 1);
            const newEvents = response.data;
            setEvents(prev => [...prev, ...newEvents]);
        } catch (error) {
            console.error('Error loading events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeThreshold = 100;

        if (Math.abs(info.offset.x) > swipeThreshold) {
            const direction = info.offset.x > 0 ? 'right' : 'left';
            handleSwipe(direction);
        }
    };

    const handleSwipe = (direction: 'left' | 'right') => {
        // Handle the swipe (e.g., save to liked events if swiped right)
        if (direction === 'right') {
            // Save to liked events
            saveLikedEvent(events[currentIndex]);
        }
        else {
            // Dislike the event
        }

        // Move to next event
        setCurrentIndex(prev => prev + 1);
    };

    const saveLikedEvent = async (event: Event) => {
        try {
            axios.post('/api/liked-events', { eventId: event.id });
        } catch (error) {
            console.error('Error saving liked event:', error);
        }
    };

    if (events.length === 0) return <div>Loading events...</div>;

    return (
        <div className="relative h-[600px] w-full max-w-md mx-auto">
            <AnimatePresence>
                {events[currentIndex] && (
                    <motion.div
                        key={events[currentIndex].id}
                        className="absolute w-full h-full"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={handleDragEnd}
                        whileDrag={{ scale: 1.05 }}
                    >
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden h-full relative">
                            <div className="relative h-1/2">
                                <img
                                    src={events[currentIndex].image}
                                    alt={events[currentIndex].title}
                                    className="w-full h-full object-cover brightness-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h2 className="text-3xl font-bold mb-1 drop-shadow-lg">
                                        {events[currentIndex].title}
                                    </h2>
                                    <p className="text-lg opacity-90 drop-shadow-md">
                                        {events[currentIndex].date}
                                    </p>
                                </div>
                            </div>
                            <div className="p-6 bg-white">
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    {events[currentIndex].description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Swipe buttons */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                <button
                    onClick={() => handleSwipe('left')}
                    className="bg-red-500 text-white p-8 w-1/2 text-2xl hover:bg-red-600 transition-colors"
                >
                    ✕
                </button>
                <button
                    onClick={() => handleSwipe('right')}
                    className="bg-green-500 text-white p-8 w-1/2 text-2xl hover:bg-green-600 transition-colors"
                >
                    ♥
                </button>
            </div>
        </div>
    );
} 