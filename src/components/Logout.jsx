import React from 'react';

export const Logout = ({history, keycloak}) => {

    const logout = () => {
        history.push('/');
        keycloak.logout();
    }

    return (
        <div>
            <button onClick={() => logout()}>
                Logout
            </button>
        </div>
    )
}

// import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom'

// class Logout extends Component {

//   logout() {
//     this.props.history.push('/');
//     this.props.keycloak.logout();
//   }

//   render() {
//     return (
//       <button onClick={ () => this.logout() }>
//         Logout
//       </button>
//     );
//   }
// }
// export default withRouter(Logout);