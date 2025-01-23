import { motion } from "framer-motion";

export default function QuestionList({ questions, foundWords }) {
    return (
        <div className="space-y-4">
            <ul className="space-y-2">
                {questions.map((q, index) => {
                    const isFound = foundWords.includes(q.answer);

                    return (
                        <motion.li
                            key={index}
                            initial={false}
                            animate={{
                                opacity: isFound ? 0.6 : 1,
                                scale: isFound ? 0.98 : 1
                            }}
                            className={`
                                p-3 rounded-lg transition-colors duration-200
                                ${isFound
                                ? 'bg-gray-100 line-through text-gray-500'
                                : 'bg-blue-50 text-blue-900'}
                            `}
                        >
                            {q.question}
                        </motion.li>
                    );
                })}
            </ul>
        </div>
    );
}
