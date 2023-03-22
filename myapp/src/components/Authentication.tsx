import {signInWithGoogle, signOut} from "../config/firebase"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext"

export function Authentication(){ 
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSignIn = async () => {
        await signInWithGoogle();
        navigate('/home');
    }

    return( 
        <div>
            {
                user == null ?
                <button  onClick={handleSignIn}>Sign in with Google</button>
                :
                <button onClick={signOut}>Sign out</button>
            }
        </div>
    )
}