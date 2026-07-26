import LeaderboardEntry from "./leaderboard-entry"

function LeaderboardContent() {
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

export default LeaderboardContent;