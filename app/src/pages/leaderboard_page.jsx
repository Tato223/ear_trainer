import Header from "../components/header";
import Footer from "../components/footer";

export default function LeaderboardPage() {
    return(
        <>
            <Header/>
            <LeaderboardContent/>
            <Footer/>
        </>
    );
}

export function LeaderboardContent() {
    return(
        <div className="content-container">

            <h2 className="leaderboard-heading">Endless Mode Leaderboard</h2>

            <div className="leaderboard-container">
                <LeaderboardEntry position="1" name="Username" points="100"></LeaderboardEntry>
                <LeaderboardEntry position="1" name="Username" points="100"></LeaderboardEntry>
                <LeaderboardEntry position="1" name="Username" points="100"></LeaderboardEntry>
                <LeaderboardEntry position="1" name="Username" points="100"></LeaderboardEntry>
                <LeaderboardEntry position="1" name="Username" points="100"></LeaderboardEntry>
                <LeaderboardEntry position="1" name="Username" points="100"></LeaderboardEntry>
                <LeaderboardEntry position="1" name="Username" points="100"></LeaderboardEntry>
                <LeaderboardEntry position="1" name="Username" points="100"></LeaderboardEntry>
                <LeaderboardEntry position="1" name="Username" points="100"></LeaderboardEntry>
                <LeaderboardEntry position="1" name="Username" points="100"></LeaderboardEntry>
            </div>

        </div>
    );
}

export function LeaderboardEntry(props) {
    return(
        <div className="leaderboard-entry">
            <h2 className="leaderboard__position">{props.position}</h2>
            <img className="leaderboard__pfp" src="https://placehold.co/60"/>
            <h3 className="leaderboard__username">{props.name}</h3>
            <h2 className="leaderboard__points">{props.points}</h2>
        </div>
    );
}