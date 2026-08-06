import { Link } from "react-router";

// Later fetch from users API endpoint
// let isLoggedIn = false;

/*TODO -> 
- Figure out React states
- Create /auth page
- Figure out MIDI logic
- Additional pages for quiz, endless, and library selections
- User sidebar with basic options
- PRIVACY POLICY & TOS
*/

function Header({isLoggedIn=false}) {



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

                        {isLoggedIn ? 

                        // change to /me later
                        (<Link to="/auth/login">
                            <img className="user-pfp__header" src="https://placehold.co/40"/>
                        </Link>) :
                        
                        (<Link to="/auth/signup">
                            <button className="signup-button">Sign up</button>
                        </Link>)

                        }   

                </ul>
            </nav>
        </header>
    );
}

export default Header;