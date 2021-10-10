import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '312187773943-4gdh22v5qnjdrjm6amjhe5g5pnmdekf4.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });

    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            const userId = this.auth.currentUser.get().getId();
            this.props.signIn(userId);
        } else {
            this.props.signOut();
        }
    }

    onSigninClick = () => {
        this.auth.signIn();
    };

    onSignoutClick = () => {
        this.auth.signOut();
    };

    renderOfButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (<button className="ui red google button" onClick={this.onSignoutClick}>
                <i className="google icon" />
                Signout
            </button>);
        } else {
            return (<button className="ui green google button" onClick={this.onSigninClick}>
                <i className="google icon" />
                Signin
            </button>);
        }
    }

    render() {
        return <div> {this.renderOfButton()} </div>
    }
}

// Mapping State to Props
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);