

import { QuestionAnswer } from '../../types';

export default function QuestionInterface({ question, data, setData }: { question: any, data: any, setData: any }) {

    switch (question.type) {
        case 'select':
            return (
                <div className="space-y-4">
                    {question.options.map((option: { value: string; label: string }) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                const currentAnswer = data.answers.find((a: QuestionAnswer) => a.question_id === question.id);
                                if (currentAnswer) {
                                    const newOptions = currentAnswer.options.includes(option.value)
                                        ? currentAnswer.options.filter((item: string) => item !== option.value)
                                        : [...currentAnswer.options, option.value];
                                    setData('answers', data.answers.map((a: QuestionAnswer) =>
                                        a.question_id === question.id ? { ...a, options: newOptions } : a
                                    ));
                                }
                            }}
                            className={`w-full p-4 rounded-lg text-left transition-all
                                    ${data.answers.find((a: QuestionAnswer) => a.question_id === question.id)?.options.includes(option.value)
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
                                onClick={() => setData('answers', data.answers.map((a: QuestionAnswer) =>
                                    a.question_id === question.id ? { ...a, answer: value.toString() } : a
                                ))}
                                className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold transition-all
                                        ${data.answers.find((a: QuestionAnswer) => a.question_id === question.id)?.answer === value.toString()
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
                                const currentAnswer = data.answers.find((a: QuestionAnswer) => a.question_id === question.id);
                                if (currentAnswer) {
                                    const newOptions = currentAnswer.options.includes(option)
                                        ? currentAnswer.options.filter((item: string) => item !== option)
                                        : [...currentAnswer.options, option];
                                    setData('answers', data.answers.map((a: QuestionAnswer) =>
                                        a.question_id === question.id ? { ...a, options: newOptions } : a
                                    ));
                                }
                            }}
                            className={`p-4 rounded-lg text-left transition-all
                                    ${data.answers.find((a: QuestionAnswer) => a.question_id === question.id)?.options.includes(option)
                                    ? 'bg-orange-100 text-orange-700 border-2 border-orange-500'
                                    : 'bg-white text-gray-600 border-2 border-transparent hover:bg-orange-200 hover:text-black'}`}
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
                    value={data.answers.find((a: QuestionAnswer) => a.question_id === question.id)?.answer || '09:00'}
                    onChange={(e) => setData('answers', data.answers.map((a: QuestionAnswer) =>
                        a.question_id === question.id ? { ...a, answer: e.target.value } : a
                    ))}
                    className="w-full p-4 text-2xl text-center bg-white rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
            );

        case 'text':
            return (
                <textarea
                    value={data.answers.find((a: QuestionAnswer) => a.question_id === question.id)?.answer || ''}
                    onChange={(e) => setData('answers', data.answers.map((a: QuestionAnswer) =>
                        a.question_id === question.id ? { ...a, answer: e.target.value } : a
                    ))}
                    className="w-full h-32 p-4 bg-white rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    placeholder="Type your answer here..."
                />
            );
    }
};
