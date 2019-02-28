import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "567129969081-s1vk81liipg0ti8kfrvil7op8p0h70vu.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedin.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  renderAuthButton() {
    if (this.state.isSignedin === null) {
      return <div>Idk if we're signed in</div>;
    } else if (this.state.isSignedIn) {
      return <div>I'm signed in!</div>;
    } else {
      return <div> I am not signed in :(</div>;
    }
  }

  render() {
    return <div>{this.renderAuthButton}</div>;
  }
}

export default GoogleAuth;
