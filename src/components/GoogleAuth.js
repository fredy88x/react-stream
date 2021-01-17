import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "129907669916-0lbr3h5c0cbdqt5k9cohbqb4q1lot707.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId());
    }else{
      this.props.signOut();
    }
  };

  onSigInClick = () => {
      this.auth.signIn();
  };

  onSigOutClick = () => {
      this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn == null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSigOutClick} className="ui red google button">
          <em className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSigInClick} className="ui red google button">
          <em className="google icon" />
          Sign In with google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);