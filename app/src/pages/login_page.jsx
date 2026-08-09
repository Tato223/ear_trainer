import Header from "../components/header";
import Footer from "../components/footer";
import FormBlock from "../components/form_block";
import PropTypes from "prop-types";
import { Form, Link } from "react-router";

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

        <form className="login-form" onSubmit={postLoginData}>

          <h2 className="login-prompt"><em>Log in</em> to Your Account</h2>

          <FormBlock label="Username" id="username-entry" type="text" min={3} max={12} isRequired={true} placeholder="Enter your username."/>
          <FormBlock label="Password" id="password-entry" type="password" min={3} max={12} isRequired={true} placeholder="Ex. MyPassword123"/>

          <input className="submit-btn" type="submit" />

          <p className="signup-redirect">Don't have an account? 
            <Link className="signup-redirect__link" to="/auth/signup"> Sign up</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

async function postLoginData(event) {
  event.preventDefault();

  const url = "http://127.0.0.1:8000/auth/login/";
  const payload = {
    username: document.querySelector("#username-entry")?.value,
    password: document.querySelector("#password-entry")?.value,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const responseData = await response.json();
    localStorage.setItem("authToken", responseData.token)
    responseData? console.log(`Response: ${responseData}`) : null;
  } catch (error) {
    console.error(error);
  }
};