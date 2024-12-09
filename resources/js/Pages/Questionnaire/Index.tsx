import { Head, useForm } from '@inertiajs/react';
import { PageProps, LocationPreference } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { router } from '@inertiajs/react';

interface QuestionnaireData {
    location_preference: LocationPreference;
    extroversion: number;
    openness: number;
    conscientiousness: number;
    food_preferences: string[];
    conversation_topics: string[];
    preferred_breakfast_time: string;
    bio: string;
}

export default function Questionnaire({ auth }: PageProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const { data, setData, post, processing, errors } = useForm<QuestionnaireData>({
        location_preference: '' as LocationPreference,
        extroversion: 3,
        openness: 3,
        conscientiousness: 3,
        food_preferences: [],
        conversation_topics: [],
        preferred_breakfast_time: '09:00',
        bio: ''
    });

    const questions = [
        {
            id: 'location',
            title: "Where do you prefer to meet?",
            subtitle: "Select your preferred area for breakfast meetups",
            type: 'select',
            field: 'location_preference',
            options: [
                { value: 'NW', label: 'Northwest DC' },
                { value: 'NE', label: 'Northeast DC' },
                { value: 'SW', label: 'Southwest DC' },
                { value: 'SE', label: 'Southeast DC' },
                { value: 'NOVA', label: 'Northern Virginia' },
                { value: 'MD', label: 'Maryland' }
            ]
        },
        {
            id: 'personality-extroversion',
            title: "How do you feel about social interactions?",
            subtitle: "Rate your comfort level in social situations",
            type: 'scale',
            field: 'extroversion',
            labels: {
                1: 'Very Introverted',
                3: 'Balanced',
                5: 'Very Extroverted'
            }
        },
        {
            id: 'personality-openness',
            title: "How do you approach new experiences?",
            subtitle: "Rate your openness to trying new things",
            type: 'scale',
            field: 'openness',
            labels: {
                1: 'Prefer Routine',
                3: 'Balanced',
                5: 'Love Adventure'
            }
        },
        {
            id: 'personality-conscientiousness',
            title: "How do you approach tasks and responsibilities?",
            subtitle: "Rate your level of organization and planning",
            type: 'scale',
            field: 'conscientiousness',
            labels: {
                1: 'Spontaneous',
                3: 'Balanced',
                5: 'Very Organized'
            }
        },
        {
            id: 'food-preferences',
            title: "What are your favorite breakfast foods?",
            subtitle: "Select all that apply",
            type: 'multiSelect',
            field: 'food_preferences',
            options: [
                'Pancakes',
                'Waffles',
                'Eggs Benedict',
                'Avocado Toast',
                'Omelette',
                'Breakfast Burrito',
                'Acai Bowl',
                'French Toast',
                'Bagels',
                'Croissants'
            ]
        },
        {
            id: 'conversation-topics',
            title: "What topics interest you most?",
            subtitle: "Select your favorite conversation topics",
            type: 'multiSelect',
            field: 'conversation_topics',
            options: [
                'Technology',
                'Arts & Culture',
                'Business',
                'Sports',
                'Travel',
                'Food',
                'Politics',
                'Science',
                'Books',
                'Movies & TV'
            ]
        },
        {
            id: 'breakfast-time',
            title: "When do you prefer to have breakfast?",
            subtitle: "Select your ideal breakfast time",
            type: 'time',
            field: 'preferred_breakfast_time'
        },
        {
            id: 'bio',
            title: "Tell us about yourself",
            subtitle: "Share a brief bio with potential breakfast companions",
            type: 'text',
            field: 'bio'
        }
    ];

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        post(route('questionnaire.store'), {
            onSuccess: () => {
                // Show success message and redirect to dashboard
                router.visit(route('dashboard'), {
                    preserveScroll: true,
                    preserveState: true,
                    only: ['upcomingEvents', 'recommendedConnections'],
                    data: {
                        success: 'Profile completed successfully!'
                    }
                });
            },
            onError: (errors) => {
                console.error('Submission errors:', errors);
            }
        });
    };

    const renderQuestion = (question: any) => {
        switch (question.type) {
            case 'select':
                return (
                    <div className="space-y-4">
                        {question.options.map((option: { value: string; label: string }) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    const field = question.field as keyof QuestionnaireData;
                                    const currentValue = Array.isArray(data[field]) ? data[field] as string[] : [];
                                    const newValue = currentValue.includes(option.value)
                                        ? currentValue.filter(item => item !== option.value)
                                        : [...currentValue, option.value];
                                    setData(field, newValue);
                                }}
                                className={`w-full p-4 rounded-lg text-left transition-all
                                    ${Array.isArray(data[question.field as keyof QuestionnaireData]) &&
                                        (data[question.field as keyof QuestionnaireData] as string[]).includes(option.value)
                                        ? 'bg-orange-100 text-orange-700 border-2 border-orange-500'
                                        : 'bg-white text-gray-600 border-2 border-transparent hover:bg-orange-50'}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                );


            case 'scale':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between px-8">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                    key={value}
                                    onClick={() => setData(question.field as keyof QuestionnaireData, value)}
                                    className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold transition-all
                                        ${data[question.field as keyof QuestionnaireData] === value
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-white text-gray-600 hover:bg-orange-100'}`}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between px-6 text-sm text-gray-500">
                            <span>{question.labels[1]}</span>
                            <span>{question.labels[3]}</span>
                            <span>{question.labels[5]}</span>
                        </div>
                    </div>
                );

            case 'multiSelect':
                return (
                    <div className="grid grid-cols-2 gap-3">
                        {question.options.map((option: string) => (
                            <button
                                key={option}
                                onClick={() => {
                                    const field = question.field as keyof QuestionnaireData;
                                    const currentValue = data[field] as string[];
                                    const newValue = currentValue.includes(option)
                                        ? currentValue.filter(item => item !== option)
                                        : [...currentValue, option];
                                    setData(field, newValue);
                                }}
                                className={`p-4 rounded-lg text-left transition-all
                                    ${(data[question.field as keyof QuestionnaireData] as string[]).includes(option)
                                        ? 'bg-orange-100 text-orange-700 border-2 border-orange-500'
                                        : 'bg-white text-gray-600 border-2 border-transparent hover:bg-orange-50'}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                );

            case 'time':
                return (
                    <input
                        type="time"
                        value={data[question.field as keyof QuestionnaireData] as string}
                        onChange={(e) => setData(question.field as keyof QuestionnaireData, e.target.value)}
                        className="w-full p-4 text-2xl text-center bg-white rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    />
                );

            case 'text':
                return (
                    <textarea
                        value={data[question.field as keyof QuestionnaireData] as string}
                        onChange={(e) => setData(question.field as keyof QuestionnaireData, e.target.value)}
                        className="w-full h-32 p-4 bg-white rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                        placeholder="Type your answer here..."
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
            <Head title="Questionnaire - The Breakfast Club" />

            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Progress bar */}
                <motion.div
                    className="h-1 bg-orange-200 rounded-full mb-12"
                    initial={{ width: '0%' }}
                >
                    <motion.div
                        className="h-1 bg-orange-500 rounded-full"
                        animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    />
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl shadow-xl p-8"
                    >
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {questions[currentQuestionIndex].title}
                            </h2>
                            <p className="text-gray-600">
                                {questions[currentQuestionIndex].subtitle}
                            </p>
                        </div>

                        <div className="mb-8">
                            {renderQuestion(questions[currentQuestionIndex])}
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={handleBack}
                                disabled={currentQuestionIndex === 0}
                                className="px-6 py-3 text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Back
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={processing}
                                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {currentQuestionIndex === questions.length - 1 ? 'Complete' : 'Next'}
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}