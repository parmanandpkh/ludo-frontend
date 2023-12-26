import { EMAIL_REGEX } from "./constants";

export const complexEmailRegex = (val) => {
    if (EMAIL_REGEX.test(val)) {
        if (val.match(/\+/g)?.length > 1) {
            return false;
        }


        if (val.includes(".+.")) {
            return false;
        }
        if (val.includes(".+")) {
            return true;
        }
        if (val.includes("+.")) {
            return true;
        }
        if (val.includes("++")) {
            return false;
        }

        return true;
    }
    return false;
};
