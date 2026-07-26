function EndlessCard(props) {
    return(
        <div className="endless-card">
            <h2 className="endless-card__name">{props.name}</h2>
            <p className="endless-card__text">{props.text}</p>
            <button className="endless-card__button">Select &rarr;</button>
        </div>
    );
}

export default EndlessCard;