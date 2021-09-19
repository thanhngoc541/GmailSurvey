
import { fetchSurveys } from "../../actions"
import { connect } from "react-redux"
import { useEffect } from "react";
function SurveyList({ fetchSurveys, surveys }) {
    useEffect(() => {
        fetchSurveys();
    }, [])
    function renderSurveys() {
        return surveys.map((survey) => {
            return (
                <div key={survey._id} className="card darken-1">
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
                    </div>
                    <div className="card-action">
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>
                    </div>
                </div>
            )
        }).reverse()
    }
    return (
        <div>
            {renderSurveys()}
        </div>
    )
}
function mapStateToProps({ surveys }) {
    return { surveys };
}
export default connect(mapStateToProps, { fetchSurveys })(SurveyList)