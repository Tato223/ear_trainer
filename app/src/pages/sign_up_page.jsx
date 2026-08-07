import Header from "../components/header";
import Footer from "../components/footer";
import FormBlock from "../components/form_block";
import { Form, Link } from "react-router";

export default function SignupPage() {
  return (
    <>
      <Header />
      <SignupContent />
      <Footer />
    </>
  );
}

export function SignupContent() {
  return (
    <div className="content-container">
      <div className="signup-container">
        <form className="signup-form" onSubmit={postLoginData}>
          <h2 className="signup-prompt"><em>Create</em> an Account</h2>

          <FormBlock
            label="Username"
            id="username-entry"
            type="text"
            min={3}
            max={12}
            isRequired={true}
            placeholder="Enter your username."
          />
          <FormBlock
            label="Email"
            id="email-entry"
            type="email"
            min={3}
            max={12}
            isRequired={true}
            placeholder="Ex. yourEmail321@domain.com"
          />
          <FormBlock
            label="Password"
            id="password-entry"
            type="password"
            min={3}
            max={12}
            isRequired={true}
            placeholder="Ex. MyPassword123"
          />

          <input className="submit-btn" type="submit" />

          <p className="signup-redirect">
            Already have an account?
            <Link className="signup-redirect__link" to="/auth/login">
              {" "}
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

async function postLoginData(event) {
  event.preventDefault();

  const url = "http://127.0.0.1:8000/auth/signup/";
  const payload = {
    username: document.querySelector("#username-entry")?.value,
    email: document.querySelector("#email-entry")?.value,
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
    console.log(`Response: ${responseData}`);
  } catch (error) {
    console.error(error);
  }
};