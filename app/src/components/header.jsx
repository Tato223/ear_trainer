import { Link } from "react-router";

function Header() {
    return (
        <header>
            <Link to="/">
                <h2 className="header-title">EarTrainer</h2>
            </Link>

            <nav className="nav-container">
                <ul className="nav-links">
                    <Link to="/quizzes">Quizzes</Link>
                    <Link to="/endless">Endless Mode</Link>
                    <Link to="/leaderboard">Leaderboard</Link>
                    <Link to="/library">Library</Link>
                    <Link to="/signup">
                        <button className="signup-button">Sign up</button>
                    </Link>
                </ul>
            </nav>
        </header>
    );
}

export default Header;