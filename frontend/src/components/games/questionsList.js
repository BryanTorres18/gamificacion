"use client";

import React from "react";

export default function QuestionList({ questions, foundWords }) {
    return (
        <ul>
            {questions.map((q, index) => (
                <li
                    key={index}
                    style={{
                        textDecoration: foundWords.includes(q.answer)
                            ? "line-through"
                            : "none",
                        color: foundWords.includes(q.answer) ? "gray" : "black",
                    }}
                >
                    {q.question}
                </li>
            ))}
        </ul>
    );
}
