
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmail from '../../utils/validateEmail';
import formFields from "./formFields"
function SurveyForm({ handleSubmit, onSurveySubmit }) {
    function renderField() {
        return formFields.map(({ label, name }) =>
            <Field key={name} component={SurveyField} type="text" label={label} name={name}></Field>)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSurveySubmit)}>
                {renderField()}
                <Link to='/surveys' className="red btn-flat white-text" >Cancel</Link>
                <button className="teal btn-flat right white-text" type="submit">Next
                    <i className="material-icons right">done</i></button>
            </form>

        </div >
    )
}

function validate(values) {
    const errors = {};
    errors.recipients = validateEmail(values.recipients || '')
    formFields.forEach(({ name }) => {
        if (!values[name]) errors[name] = `You must provide a ${name}`
    })

    return errors
}

export default reduxForm({
    form: 'surveyForm',
    validate,
    destroyOnUnmount: false
})(SurveyForm);