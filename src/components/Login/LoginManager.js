import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';

export const initializeLoginFramework = () => {
    !firebase.apps.length && firebase.initializeApp(firebaseConfig);
};

export const handleGoogleSignin = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const signInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true,
            };
            return signInUser;
        })
        .then(error => console.log(error));
};

export const handleFbSignIn = e => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then(result => {
            // const credential = result.credential;
            // const accessToken = credential.accessToken;
            const user = result.user;
            user.success = true;
            return user;
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            console.log(errorCode, errorMessage, email, credential);
        });
};

export const handleSignOut = () => {
    return firebase
        .auth()
        .signOut()
        .then(res => {
            const signOutUser = {
                isSignIn: false,
                name: '',
                email: '',
                photo: '',
                success: false,
            };
            return signOutUser;
        })
        .catch(err => console.log(err));
};

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
};

export const signInWithEmailAndPassword = (email, password) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
};

const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name,
    })
        .then(() => {
            console.log('updated name');
        })
        .catch(error => {
            console.log(error);
        });
};
