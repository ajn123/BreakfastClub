interface Question {
    title: string;
    subtitle: string;
}

export default function QuestionHeader({ question }: { question: Question }) {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{question.title}</h2>
            <p className="text-gray-600">{question.subtitle}</p>
        </div>
    );
}