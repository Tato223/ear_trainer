import { Link } from "react-router";
import { useAuth } from "../auth_context";
import { useEffect } from "react";

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

export default function Header() {
  const { user, isLoading, logout } = useAuth();

  const checkIsLoggedIn = useEffect(() => {
    console.log("User login status changed:", user);
  }, [user]);

  if (isLoading) {
    return null;
  }

  return (
    <header user={user}>
      <Link to="/">
        <h2 className="header-title">EarTrainer</h2>
      </Link>

      <nav className="nav-container">
        <ul className="nav-links">
          <Link to="/quizzes">Quizzes</Link>
          <Link to="/endless">Endless Mode</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/library">Library</Link>

          {user ? (
            <Link to={`/users/${user?.username}`}>
              <img className="user-pfp__header" src="https://placehold.co/40" />
            </Link>
          ) : (
            <Link to="/auth/signup">
              <button className="signup-button">Sign up</button>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
}
