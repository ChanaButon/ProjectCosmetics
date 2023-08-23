export function isValidPhoneNumber(){
    if(! /^\d+$/.test(a)){
        return false
    }
    if(a.length < 9 || a.length > 10)
    {
        return false
    }
    if(a.length === 10 &&  a.startsWith('05')){
        return true
    }
    if(a.length === 9  ){
        const validPrefixes = ['02', '03', '04', '08', '09'];
        const startsWithValidPrefix = validPrefixes.some(prefix => a.startsWith(prefix));
        return startsWithValidPrefix
    }
    
}