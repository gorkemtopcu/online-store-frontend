const Validators = {
     isStrongPassword: (password) => {
        const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
        return passwordRegex.test(password);
    },

    validatePassword: (_, password) => {
        if (password && !Validators.isStrongPassword(password)) {
            return Promise.reject(new Error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.'));
        }
        return Promise.resolve();
    },

    validateConfirmPassword: (password, confirmPassword) => {
        if (password !== confirmPassword && confirmPassword) {
            return Promise.reject(new Error('Passwords do not match!'));
        }
        return Promise.resolve();
    }
};

export default Validators;