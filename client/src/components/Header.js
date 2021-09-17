
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
function Header(props) {
    function renderContent() {
        switch (props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login with google</a></li>;
            default:
                return [
                    <li key="payments"><Payments></Payments> </li>,
                    <li key="credits" style={{ margin: "0 10px" }}>Credits: {props.auth.credits}</li>,
                    <li key="logout"><a href="/api/logout">Logout</a></li>]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to={props.auth ? "/surveys" : "/"} className=" left brand-logo"> Emaily</Link>
                <ul id="" className="right">
                    {renderContent()}
                </ul>
            </div>
        </nav>
    )
}
function mapStateToProps({ auth }) {
    return { auth }
}
export default connect(mapStateToProps)(Header);