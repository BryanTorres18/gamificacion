import { motion } from "framer-motion";

export default function QuestionList({ questions, foundWords }) {
    return (
        <div className="bg-white rounded-xl p-6 space-y-4">
            {questions.map((q, index) => {
                const isFound = foundWords.includes(q.answer);

                return (
                    <motion.div
                        key={index}
                        initial={false}
                        animate={{
                            opacity: isFound ? 0.8 : 1,
                            scale: isFound ? 0.98 : 1
                        }}
                        className={`
                            p-4 
                            rounded-lg 
                            border
                            transition-all 
                            duration-300
                            ${isFound
                            ? 'bg-[#DEC5E3] border-[#7F5C9C]'
                            : 'border-gray-200'}
                        `}
                    >
                        <p className="text-gray-700">
                            <span className="font-bold mr-2">
                                {index + 1}.
                            </span>
                            {q.question}
                        </p>
                    </motion.div>
                );
            })}
        </div>
    );
}
