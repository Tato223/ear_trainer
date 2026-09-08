export default function SubmitQuestionButton({onClick, className}) {
    return(
        <>
            <button className={className} onClick={onClick}>
                Submit
            </button>
        </>
    )
}