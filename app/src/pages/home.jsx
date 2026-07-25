import Header from '../components/header'
import HomeContent from '../components/home-content';
import Footer from '../components/footer'

function Home(){
    return(
        <div className='page'>
            <Header/>
            <HomeContent/>
            <Footer/>
        </div>
    );
}

export default Home