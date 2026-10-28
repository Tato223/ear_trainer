import { useAuth } from "../auth_context";
import BackButton from "../components/back_button";
import Footer from "../components/footer";
import Header from "../components/header";

export default function ProfilePage() {
  const { user }: { user: any } = useAuth();

  if (!user) return null;

  console.log(user);

  return (
    <>
      <Header />
      <BackButton />
      <div className="content-container">
        <div className="profile-page-container">
          <div className="profile-page__profile-info">
            <img
              className="profile-page__profile-picture"
              src="https://placehold.co/100" /*{user?.profilePicture} */
              alt={`${user?.username}'s profile`}
            />
            <h1 className="profile-page__username">{user?.username}</h1>
            <p className="profile-page__email">{user?.email}</p>
            <hr className="profile-page__divider"></hr>

            <span className="profile-page__member-since">
              <p>Member Since:</p>
              <p>
                {new Date(user.date_joined).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {new Date(user.date_joined).getFullYear()}
              </p>
            </span>

            <hr className="profile-page__divider"></hr>

            <span className="profile-page__leaderboard-rank">
              <p>Leaderboard Rank:</p>
              <p>{user?.leaderboardRank}</p>
            </span>

            <hr className="profile-page__divider"></hr>

            <div className="profile-page__buttons">
              <button className="profile-page__edit-profile-btn">
                Edit Profile
              </button>
              <button className="profile-page__share-btn">Share Profile</button>
            </div>
          </div>

          <div className="profile-page__scores-info">
            <h2>Endless Mode Highscores</h2>
            <span className="profile-page__scores-heading">
              <h3>Category</h3>
              <h3>Score</h3>
            </span>
            <ul className="profile-page__scores-list">
              <li>
                <p>Pitch Recognition</p>
                <p className="profile-page__score">100</p>
              </li>
              <hr className="profile-page__divider"></hr>
              <li>
                <p>Major Scales</p>
                <p className="profile-page__score">95</p>
              </li>
              <hr className="profile-page__divider"></hr>
              <li>
                <p>Intonation</p>
                <p className="profile-page__score">90</p>
              </li>
              <hr className="profile-page__divider"></hr>
              <li>
                <p>Intervals</p>
                <p className="profile-page__score">85</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
