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
}
