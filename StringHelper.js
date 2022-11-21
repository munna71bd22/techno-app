class StringHelper {

    static checkPalindrome(str = '') {
        /*if I got more time i would optimize this code
          i divided this string into two part then compare
         */

        let reverseWord = "";
        for (let i = 0; i < str.length; i++) {
            reverseWord += str[str.length - i - 1]
        }
        if (reverseWord == str) {
            return true
        }
        return false;
    }

    static getGroupAnagram(arr = []) {
        if (arr.length === 0) {
            return arr;
        }
        ;
        const map = new Map();
        for (let str of arr) {
            let sorted = [...str];
            sorted.sort();
            sorted = sorted.join('');
            if (map.has(sorted)) {
                map.get(sorted).push(str);
            } else {
                map.set(sorted, [str])
            }
            ;
        }
        ;
        return [...map.values()];
    }
}

module.exports = StringHelper