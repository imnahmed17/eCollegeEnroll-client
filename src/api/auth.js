import axios from 'axios';

export const saveUser = user => {
    axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
    })
        .then(data => console.log(data));
};