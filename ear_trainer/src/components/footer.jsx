function Footer() {
    return (
        <footer>
            <ul className="footer-links">
                <li><a>Quizzes</a></li>
                <li><a>Endless Mode</a></li>
                <li><a>Leaderboard</a></li>
                <li><a>Support</a></li>
            </ul>

            <p className='copyright'>&copy; EarTrainer {new Date().getFullYear()}</p>
        </footer>
    );
}

export default Footer