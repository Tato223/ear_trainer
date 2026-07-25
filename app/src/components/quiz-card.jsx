function QuizCard(props) {
    return (
        <div className="quiz-card">
            <h3 className="quiz-card__title">{props.name}</h3>
            <p className="quiz-card__text">{props.text}</p>
            <button className="quiz-card__button">Select &rarr;</button>
        </div>
    );
}

export default QuizCard