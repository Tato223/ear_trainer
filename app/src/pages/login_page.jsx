import Header from "../components/header";
import Footer from "../components/footer";
import FormBlock from "../components/form_block";
import PropTypes from "prop-types";
import { Form } from "react-router";

export default function LoginPage() {
  return (
    <>
      <Header />
      <LoginContent />
      <Footer />
    </>
  );
}

export function LoginContent() {

  return (
    <div className="content-container">
      <div className="signup-container">

        <form className="login-form">

          <h2 className="login-prompt">Log in to Your Account</h2>

          <FormBlock label="Username" id="username-entry" type="text" min={3} max={12} isRequired={true} placeholder="Enter your username."/>
          <FormBlock label="Password" id="password-entry" type="password" min={3} max={12} isRequired={true} placeholder="Ex. MyPassword123"/>

          <input className="submit-btn" type="submit" />
        </form>
      </div>
    </div>
  );
}