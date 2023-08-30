export function isValidPhoneNumber(phoneNumber) {
    if (!/^\d+$/.test(phoneNumber)) {
        return false;
    }
    if (phoneNumber.length < 9 || phoneNumber.length > 10) {
        return false;
    }
    if (phoneNumber.length === 10 && phoneNumber.startsWith('05')) {
        return true;
    }
    if (phoneNumber.length === 9) {
        const validPrefixes = ['02', '03', '04', '08', '09'];
        return validPrefixes.some(prefix => phoneNumber.startsWith(prefix));
    }
    return false;
};
 
export function isValidEmail(email) {
    // Regular expression pattern for basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

 export function isValidId(id){
    // Check if the input is exactly 8 digits long and contains only numbers
    const isValidFormat = /^\d{9}$/.test(id);

    // Additional validation rules can be added here based on your specific requirements

    return isValidFormat;
 }
