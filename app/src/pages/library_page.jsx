import Footer from "../components/footer";
import Header from "../components/header";

export default function LibraryPage() {
    return(
        <>
            <Header/>
            <LibraryContent/>
            <Footer/>
        </>
    )
}

export function LibraryContent() {
    return(
        <div className="content-container">

            <h2 className="instructions">Select an option to learn more.</h2>

            <div className="library-options-container">
                <LibraryOptionCard text="Major Scales"/>
                <LibraryOptionCard text="Notes"/>
            </div>


        </div>
    );
}

export function LibraryOptionCard(props) {
    return(
        <div className="library-option-card">
            <div className="library-card__placeholder-img"></div>
            <h2 className="library-card__text">{props.text}</h2>
        </div>
    );
}