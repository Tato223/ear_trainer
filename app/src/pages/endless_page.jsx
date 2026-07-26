import Header from "../components/header";
import EndlessContent from "../components/endless-content";
import Footer from "../components/footer";

function EndlessPage() {
    return(
        <div className="page">
            <Header/>
            <EndlessContent/>
            <Footer/>
        </div>
    );
}

export default EndlessPage;