import Header from '../components/header'
import QuizzesContent from '../components/quizzes-content';
import Footer from '../components/footer'

function Quizzes(){
    return(
        <div className='page'>
            <Header/>
            <QuizzesContent/>
            <Footer/>
        </div>
    );
}

export default Quizzes