import { Link } from "react-router";

export default function UserDropdown() {
  return (
    <div className="user-dropdown" aria-expanded="false" aria-haspopup="true">
      <ul className="user-dropdown__list">
        <li>
          <Link to="/me">Profile</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
}
