import Header from "../components/header";
import Footer from "../components/footer";
import FormBlock from "../components/form_block";
import { Form , Link } from "react-router";

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

        <form className="signup-form">

          <h2 className="signup-prompt">Create an Account</h2>

          <FormBlock label="Username" id="username-entry" type="text" min={3} max={12} isRequired={true} placeholder="Enter your username."/>
          <FormBlock label="Password" id="password-entry" type="password" min={3} max={12} isRequired={true} placeholder="Ex. MyPassword123"/>
          <FormBlock label="Email" id="email-entry" type="email" min={3} max={12} isRequired={true} placeholder="Ex. yourEmail321@domain.com"/>

          <input className="submit-btn" type="submit" />

          <p className="signup-redirect">Already have an account? 
            <Link className="signup-redirect__link" to="/auth/login"> Log in</Link>
          </p>

        </form>
      </div>
    </div>
  );
}
