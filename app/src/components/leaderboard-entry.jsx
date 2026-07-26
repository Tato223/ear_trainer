function LeaderboardEntry(props) {
    return(
        <div className="leaderboard-entry">
            <h2 className="leaderboard__position">{props.position}</h2>
            <img className="leaderboard__pfp" src="https://placehold.co/60"/>
            <h3 className="leaderboard__username">{props.name}</h3>
            <h2 className="leaderboard__points">{props.points}</h2>
        </div>
    );
}

export default LeaderboardEntry;