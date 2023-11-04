const isValid = function(value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value === Number && value.trim().length === 0) return false;
    return true;

};

let isValidBody = function(body) {
    return Object.keys(body).length > 0;
};

let isValidName = /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u;
let isValidEmail =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let isValidMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/;
module.exports = {isValid, isValidBody, isValidEmail, isValidMobile};


