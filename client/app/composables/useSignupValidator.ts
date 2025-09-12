const emailRegex = "^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\\.(com|net|co\\.kr)$";
const passwordRegex = "^(?=.*[A-Za-z0-9])(?=.*[^A-Za-z0-9]).{6,15}$";

export function useSignupValidator() {
    const emailValidate = (email: string) => {
        return RegExp(emailRegex).test(email);
    };

    const nameValidate = (name: string) => {
        return name.length >= 2 && name.length <= 5;
    };

    const passwordValidate = (password: string, passwordConfirm: string) => {
        return RegExp(passwordRegex).test(password) && password === passwordConfirm;
    };

    const phoneValidate = (phone: string) => {
        return phone.length === 13;
    };

    const birthdayValidate = (birthday: string) => {
        return birthday.length === 10;
    };

    return {
        emailValidate,
        nameValidate,
        passwordValidate,
        phoneValidate,
        birthdayValidate,
    };
}
