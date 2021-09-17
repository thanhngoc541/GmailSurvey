
import SurveyFormReview from './SurveyFormReview';
import SurveyForm from './SurveyForm';
import { useState } from 'react';
import { reduxForm } from 'redux-form';
function SurveyNew(props) {
    const [showFormReview, setShowFormReview] = useState(false)
    return (
        <div>
            {showFormReview ?
                <SurveyFormReview onCancel={() => setShowFormReview(false)}></SurveyFormReview> :
                <SurveyForm onSurveySubmit={() => setShowFormReview(true)}></SurveyForm>}
        </div>
    )
}
export default reduxForm({ form: 'surveyForm' })(SurveyNew);