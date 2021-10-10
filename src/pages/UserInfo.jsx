import React, { useEffect, useState } from 'react';

export const UserInfo = ({ keycloak }) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        keycloak.loadUserInfo().then(userInfo => {
            setUser({ name: userInfo.name, email: userInfo.email, id: userInfo.sub })
        });
    }, [])

    return (
        <div className="UserInfo">
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>ID: {user?.id}</p>
        </div>
    );
}




// import React, { Component } from 'react';

// class UserInfo extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       email: "",
//       id: ""
//     };
//     this.props.keycloak.loadUserInfo().then(userInfo => {
//         this.setState({name: userInfo.name, email: userInfo.email, id: userInfo.sub})
//     });
//   }

//   render() {
//     return (
//       <div className="UserInfo">
//         <p>Name: {this.state.name}</p>
//         <p>Email: {this.state.email}</p>
//         <p>ID: {this.state.id}</p>
//       </div>
//     );
//   }
// }
// export default UserInfo;