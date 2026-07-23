function Header() {
    return (
        <header>
            <h2 className="header-title">EarTrainer</h2>

            <nav className="nav-container">
                <ul className="nav-links">
                    <a>Quizzes</a>
                    <a>Endless Mode</a>
                    <a>Leaderboard</a>
                    <a>Library</a>
                    <button className="signup-button">Sign up</button>
                </ul>
            </nav>
        </header>
    );
}

export default Header;