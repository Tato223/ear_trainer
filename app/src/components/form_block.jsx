import PropTypes from "prop-types";

function FormBlock(props) {
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

export default FormBlock