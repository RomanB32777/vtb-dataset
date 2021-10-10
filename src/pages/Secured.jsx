import React, { useEffect, useState } from 'react';
import UserInfo from './UserInfo';
import Logout from '../components/Logout';
import { Link } from "react-router-dom";

import Keycloak from 'keycloak-js';

export const Secured = () => {

    const [authenticated, setAuthenticated] = useState(false)
    const [keycloak, setKeycloak] = useState(null)

    useEffect(() => {
        const keycloak = Keycloak('/keycloak.json');
        keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            setKeycloak(keycloak)
            setAuthenticated(authenticated)
        })

    }, [])

    useEffect(() => {
        console.log(keycloak);
    }, [keycloak])

    if (!keycloak)
        return (
            <span style={{ marginRight: '0.5rem' }}><Link to="/auth/admin/hack/console/">Вход</Link></span>
        );

    return (
        <div>
            {authenticated ? (
                <span style={{ marginRight: '0.5rem' }}>
                    <Link to="/">demo_vtb_client</Link>
                </span>
            ) : (
                <span style={{ marginRight: '0.5rem' }}><Link to="/auth/admin/hack/console/">Повторить вход</Link></span>
            )}
        </div>
    )
}

                // <div>
                //     <p>
                //         This is a Keycloak-secured component of your application. You shouldn't be able to see this
                //         unless you've authenticated with Keycloak.
                //     </p>
                //     <UserInfo keycloak={keycloak} />
                //     <Logout keycloak={keycloak} />
                // </div>



// import React, { Component } from 'react';
// import UserInfo from './UserInfo';
// import Logout from './Logout';
// import Keycloak from 'keycloak-js';

// class Secured extends Component {

//   constructor(props) {
//     super(props);
//     this.state = { keycloak: null, authenticated: false };
//   }

//   componentDidMount() {
//     const keycloak = Keycloak('/keycloak.json');
//     keycloak.init({onLoad: 'login-required'}).then(authenticated => {
//       this.setState({ keycloak: keycloak, authenticated: authenticated })
//     })
//   }

//   render() {
//     if(this.state.keycloak) {
//       if(this.state.authenticated) return (
//         <div>
//           <p>
//             This is a Keycloak-secured component of your application. You shouldn't be able to see this
//             unless you've authenticated with Keycloak.
//           </p>
//           <UserInfo keycloak={this.state.keycloak} />
//           <Logout keycloak={this.state.keycloak} />
//         </div>
//       ); else return (<div>Unable to authenticate!</div>)
//     }
//     return (
//       <div>Initializing Keycloak...</div>
//     );
//   }
// }

// export default Secured;