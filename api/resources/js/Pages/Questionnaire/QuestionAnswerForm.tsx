import QuestionHeader from "./QuestionHeader";
import Question from "./Question";


export default function QuestionAnswerForm({ questions, currentQuestionIndex, data, setData, handleBack, handleNext, processing }: { questions: Question[], currentQuestionIndex: number, data: any, setData: any, handleBack: any, handleNext: any, processing: boolean }) {
    return (
        <>
            <QuestionHeader question={questions[currentQuestionIndex]} />

            <div className="mb-8">
                <Question question={questions[currentQuestionIndex]} data={data} setData={setData} />
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
        </>
    );
}