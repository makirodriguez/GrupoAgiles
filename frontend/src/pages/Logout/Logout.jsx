import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";


export const LogoutButton = () => {
    const { logout } = useAuth0();
    const url = 'http://localhost:3000';
  
    return <button className="btn btn-primary" onClick={() => logout({ returnTo: url })}>
        Log Out
        <span class="glyphicon glyphicon-log-out"></span>
        </button>;
    
  };