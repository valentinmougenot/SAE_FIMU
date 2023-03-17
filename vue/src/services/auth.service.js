function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}

function authUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        return user;
    }
    else {
        return {};
    }
}

export { authHeader, authUser };