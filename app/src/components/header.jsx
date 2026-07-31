import { Link } from "react-router";

// Later fetch from users API endpoint
let isLoggedIn = false;

/*TODO -> 
- Figure out React states
- Created /auth page
- Figure out MIDI logic
- Additional pages for quiz, endless, and library selections
- User sidebar with basic optio
- PRIVACY POLICT & TOS
*/

function Header({isLoggedIn}) {
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

                    <div>
                        {isLoggedIn ? 
                        
                        (<Link to="/signup">
                            <button className="signup-button">Sign up</button>
                        </Link>) :
                        (<Link to="/auth">
                            <img className="user-pfp__header" src="https://placehold.co/40"/>
                        </Link>)
                        }   

                    </div>

                </ul>
            </nav>
        </header>
    );
}

export default Header;