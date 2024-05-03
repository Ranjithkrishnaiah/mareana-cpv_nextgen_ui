

class Auth {
    constructor() {
        this.authentacation = false;
    }

    login(callback) {
        const jwt = localStorage.getItem('usertoken');
        const jwtRefresh = localStorage.getItem('userrefreshtoken');
        if (!jwt) {
            this.authentacation = false;
            if (!jwtRefresh) {
                this.authentacation = false;
            } else {
                this.authentacation = true;
            }
        }
        else {
            this.authentacation = true;
        }
        callback();
    }
    logOut(callback) {
        this.authentacation = false;
        localStorage.removeItem('user');
        localStorage.removeItem('usertoken');
        localStorage.removeItem('userrefreshtoken');
        localStorage.clear();

        callback();
    }

    isAuthentication() {
        const jwt = localStorage.getItem('usertoken');
        const jwtRefresh = localStorage.getItem('userrefreshtoken');
        if (!jwt) {
            this.authentacation = false;
            if (!jwtRefresh) {
                this.authentacation = false;
            } else {
                this.authentacation = true;
            }
        }
        else {
            this.authentacation = true;
        }
        return this.authentacation;
    }


}

export default new Auth();