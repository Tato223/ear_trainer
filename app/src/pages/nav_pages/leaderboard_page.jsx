import Header from "../../components/header";
import Footer from "../../components/footer";
import { use, useEffect, useState } from "react";
import { data } from "react-router";

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

  async function fetchHighscoresFromDB() {
    const url = "http://127.0.0.1:8000/highscores/";
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
          .then((data) => { setHighscores(data); })
          .catch((error) => { setError(error); })
          .finally(() => { setIsLoading(false); });
    }, []);


  console.log(highscores, error, isLoading)


  return (
    <div className="content-container">
      <h2 className="leaderboard-heading">Endless Mode Leaderboard</h2>

      <div className="leaderboard-container">
        {highscores.map(
          (entry, index) => (
            <LeaderboardEntry
              position={index + 1}
              name={entry.owned_by}
              points={entry.value}
            />
          ))}
      </div>
    </div>
  );
}

export function LeaderboardEntry(props) {
  return (
    <div className="leaderboard-entry">
      <h2 className="leaderboard__position">{props.position}</h2>
      <img className="leaderboard__pfp" src="https://placehold.co/60" />
      <h3 className="leaderboard__username">{props.name}</h3>
      <h2 className="leaderboard__points">{props.points}</h2>
    </div>
  );
}