import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import {
    createUserWithEmailAndPassword,
    handleFbSignIn,
    handleGoogleSignin,
    handleSignOut,
    initializeLoginFramework,
    signInWithEmailAndPassword,
} from './LoginManager';

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: '',
    });

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();
    const { from } = location.state || { from: { pathname: '/' } };

    const googleSignin = () => {
        handleGoogleSignin().then(res => {
            handleResponse(res, true);
        });
    };

    const fbSignIn = () => {
        handleFbSignIn().then(res => {
            handleResponse(res, true);
        });
    };

    const signOut = () => {
        handleSignOut().then(res => {
            handleResponse(res, false);
        });
    };

    const handleSubmit = e => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(
                user.name,
                user.email,
                user.password
            ).then(res => {
                handleResponse(res, true);
            });
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password).then(res => {
                handleResponse(res, true);
            });
        }
        e.preventDefault();
    };

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    };

    const handleBlur = e => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const passwordValid = e.target.value.length > 6;
            const passwordHasNum = /\d{1}/.test(e.target.value);
            isFieldValid = passwordValid && passwordHasNum;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
        e.preventDefault();
    };

    return (
        <div style={{ textAlign: 'center' }}>
            {!user.isSignIn ? (
                <button onClick={googleSignin}>Sign in</button>
            ) : (
                <button onClick={signOut}>Sign out</button>
            )}
            <br />
            <button onClick={fbSignIn}>Sign in using Facebook</button>
            {user.isSignIn && (
                <div>
                    <p>Welcome {user.name}</p>
                    <p>Email {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            )}

            <h1>Our own authentication</h1>

            <input
                type="checkbox"
                onClick={() => setNewUser(!newUser)}
                name="newUser"
                id=""
            />
            <label htmlFor="newUser">New user Sign up</label>

            <form onSubmit={handleSubmit}>
                {newUser && (
                    <input
                        type="text"
                        onBlur={handleBlur}
                        name="name"
                        placeholder="your name"
                    />
                )}
                <br />
                <input
                    type="email"
                    onBlur={handleBlur}
                    name="email"
                    placeholder="your email"
                    required
                />
                <br />
                <input
                    type="password"
                    onBlur={handleBlur}
                    name="password"
                    placeholder="enter password"
                    required
                />
                <br />{' '}
                <input type="submit" value={newUser ? 'Sign up' : 'Sign In'} />
            </form>
            {user.success ? (
                <p style={{ color: 'green' }}>
                    User {newUser ? 'created ' : 'logged In'} success
                </p>
            ) : (
                <p style={{ color: 'red' }}>{user.error}</p>
            )}
        </div>
    );
}

export default Login;
