export default function LibraryOptionCard(props) {
    return(
        <div className="library-option-card">
            <div className="library-card__placeholder-img"></div>
            <h2 className="library-card__text">{props.text}</h2>
        </div>
    );
}