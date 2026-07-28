import Header from "../components/header";
import Footer from "../components/footer";
import PropTypes from "prop-types";
import { Form } from "react-router";

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

  /* props = [
    "label",
    "text",
    "id",
    "max",
    "min",
    "placeholder"
  ] */

  return (
    <div className="content-container">
      <div className="signup-container">

        <form className="signup-form">

          <h2 className="signup-prompt">Create an Account</h2>

          <FormBlock label="Username" id="username-entry" type="text" min={3} max={12} isRequired={true} placeholder="Enter your username."/>
          <FormBlock label="Password" id="password-entry" type="password" min={3} max={12} isRequired={true} placeholder="Ex. MyPassword123"/>
          <FormBlock label="Email" id="email-entry" type="email" min={3} max={12} isRequired={true} placeholder="Ex. yourEmail321@domain.com"/>

          <input className="submit-btn" type="submit" />
        </form>
      </div>
    </div>
  );
}

export function FormBlock(props) {
    return(
        <div className="form-block">
            <label for="#form-entry">{props.label}</label>
            <input id={props.id} type={props.type} min={props.min} max={props.max} required={props.isRequired} placeholder={props.placeholder}></input>
        </div>
    );
}

// Define datatypes for component props
FormBlock.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    min: PropTypes.number ? PropTypes.number : 3,
    max: PropTypes.number ? PropTypes.number : 12,
    isRequired: PropTypes.bool,
    placeholder: PropTypes.string
};
