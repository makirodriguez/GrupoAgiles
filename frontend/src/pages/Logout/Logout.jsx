import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutIcon from '@mui/icons-material/Logout';

export const LogoutButton = () => {
    const { logout, isAuthenticated} = useAuth0();
  
    return(
        isAuthenticated && (
            <button className="btn btn-primary" onClick={() => logout()}>
                Log Out  <LogoutIcon />
            </button>
        )
    ) 
    
  };