import Header from "../../components/header";
import Footer from "../../components/footer";
import { use, useEffect, useState } from "react";
import { data } from "react-router";
import { useAuth } from "../../auth_context";
import { useNavigate } from "react-router";

const CATEGORIES = {
  pitch_recognition: { name: "Pitch Recognition", url: "pitch_recognition" },
  scales: { name: "Scales", url: "scales" },
  intonation: { name: "Intonation", url: "intonation" },
  intervals: { name: "Intervals", url: "intervals" },
};

export default function LeaderboardPage() {
  return (
    <>
      <Header />
      <LeaderboardContent />
      <Footer />
    </>
  );
}

export function LeaderboardContent() {
  const [highscores, setHighscores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORIES.pitch_recognition.url,
  );

  async function fetchHighscoresFromDB() {
    const url = `http://127.0.0.1:8000/highscores/?category=${selectedCategory}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ERROR: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Fetch failed: ${error.message}`);
    }
  }

  useEffect(() => {
    fetchHighscoresFromDB()
      .then((data) => {
        setHighscores(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedCategory]);

  console.log(highscores, error, isLoading);

  return (
    <div className="content-container">
      <h2 className="leaderboard-heading">Endless Mode Leaderboard</h2>
      <div className="leaderboard-container">
        <UserLeaderboardCard selectedCategory={selectedCategory} />

        <LeaderboardCategoryPicker
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {highscores.length === 0 ? (
          <EmptyLeaderboardPlaceholder />
        ) : (
          highscores.map((entry, index) => (
            <LeaderboardEntry
              position={index + 1}
              name={entry.owned_by}
              points={entry.value}
            />
          ))
        )}
      </div>
    </div>
  );
}

export function EmptyLeaderboardPlaceholder() {
  const navigate = useNavigate();

  return (
    <div className="empty-leaderboard-placeholder">
      <h2 className="empty-leaderboard-placeholder__heading">
        There are no high scores for this category yet!
      </h2>
      <p className="empty-leaderboard-placeholder__text">
        Be the first and set the standard! Click below and select an endless
        mode challenge.
      </p>
      <button
        className="empty-leaderboard-placeholder__button"
        onClick={() => navigate("/endless")}
      >
        Play Endless Mode
      </button>
    </div>
  );
}

export function LeaderboardEntry(props) {
  return (
    <div className="leaderboard-entry">
      <h2 className="leaderboard__position">{props.position}</h2>
      <img className="leaderboard__pfp" src="https://placehold.co/40" />
      <h3 className="leaderboard__username">{props.name}</h3>
      <h2 className="leaderboard__points">{props.points} points</h2>
    </div>
  );
}

export function LeaderboardCategoryPicker(props) {
  return (
    <div className="leaderboard-category-picker">
      {Object.entries(CATEGORIES).map(([category, label]) => (
        <button
          key={category}
          className={`leaderboard-category-picker__button ${
            props.selectedCategory === label.url ? "active" : ""
          }`}
          onClick={() => props.setSelectedCategory(label.url)}
        >
          {label.name}
        </button>
      ))}
    </div>
  );
}

export function UserLeaderboardCard({ selectedCategory }) {
  const { user } = useAuth();
  const [userHighScore, setUserHighScore] = useState(null);

  useEffect(() => {
    if (user) fetchUserHighscore();
  }, [user, selectedCategory]);

  if (!user) return null;

  async function fetchUserHighscore() {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/users/${user.username}/highscore/?category=${selectedCategory}`,
      );
      const data = await response.json();
      setUserHighScore(data.data?.value ?? null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="user-leaderboard-card">
      <img
        className="user-leaderboard-card__pfp"
        src="https://placehold.co/60"
      ></img>
      <h2 className="user-leaderboard-card__username">{user?.username}</h2>
      <hr></hr>

      <div
        className={
          userHighScore
            ? "user-leaderboard-card__stats"
            : "user-leaderboard-card__stats--empty"
        }
      >
        {userHighScore ? `${userHighScore} points` : "No high score yet"}
      </div>
    </div>
  );
}
