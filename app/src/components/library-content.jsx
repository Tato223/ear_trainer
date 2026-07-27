import LibraryOptionCard from "./library-option-card";

export default function LibraryContent() {
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