
import { connect } from "react-redux"
import formFields from "./formFields"
import * as actions from '../../actions';
import { withRouter } from "react-router";
function SurveyReview({ onCancel, formValues, submitSurvey, history }) {
    console.log(formValues)
    return (
        <div>
            <h5>Please confirm your entries</h5>
            <div>
                {formFields.map(({ label, name }) => (
                    <div key={name}>
                        <label>{label}</label>
                        <div>{formValues[name]}</div>
                    </div>
                ))}
            </div>
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>Back</button>
            <button className="green  white-text btn-flat right" onClick={onCancel} onClick={submitSurvey.bind(null, formValues, history)}>
                Send Survey
                <i className='material-icons right'>email</i>
            </button>
        </div>
    )
}
function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values }
}
export default connect(mapStateToProps, actions)(withRouter(SurveyReview))