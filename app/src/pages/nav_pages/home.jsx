import Header from "../../components/header";
import Footer from "../../components/footer";

export default function Home() {
  return (
    <div className="page">
      <Header />
      <HomeContent />
      <Footer />
    </div>
  );
}

export function HomeContent() {
  return (
    <div className="content-container">
      <div className="hero-container">
        <h1 className="hero">
          Hear Better. <br /> <em>Play</em> Better.
        </h1>
        <p className="hero__subtitle">
          Develop confident pitch recognition with quizzes, endless challenges,
          and a complete note library.
        </p>

        <div className="cta-btns">
          <button className="cta-button">Get Started</button>
          <button className="secondary-cta-button">Sign in</button>
        </div>
      </div>
    </div>
  );
}
