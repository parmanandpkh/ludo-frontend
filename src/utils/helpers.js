export function capitalize(str) {
    if (typeof str !== 'string' || !str) {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export function isInThePast(date) {
    const today = new Date();

    // 👇️ OPTIONAL!
    // This line sets the hour of the current date to midnight
    // so the comparison only returns `true` if the passed in date
    // is at least yesterday
    today.setHours(0, 0, 0, 0);

    return date < today;
}



export const getSiteDomain = ({ site }) => {
    try {
        return ((new URL(site.url)).origin).replace(/^http(s?):\/\//, '').replace(/\/$/, '');
    } catch (e) {
        return site.url.replace(/^http(s?):\/\//, '').replace(/\/$/, '');
    }
};


export const formatNumber = (amount) => {
    if (amount === undefined || amount === null) {
        return '';
    }
    return amount.toLocaleString();
};


// Check if member is a recent member, i.e. created in last 24 hours
export function isRecentMember({ member }) {
    if (!member?.created_at) {
        return false;
    }

    const now = new Date();
    const created = new Date(member.created_at);
    const diff = now.getTime() - created.getTime();
    const diffHours = Math.round(diff / (1000 * 60 * 60));

    return diffHours < 24;
}


export const safeCallback = (callback, arg1, arg2, arg3) => {
    if (!callback) {
        return;
    }

    if (arg3 !== undefined) {
        callback(arg1, arg2, arg3);
        return;
    }
    if (arg2 !== undefined) {
        callback(arg1, arg2);
        return;
    }
    callback(arg1);
};




export const runningOnBrowser = typeof window !== "undefined";

export const isBot =
    (runningOnBrowser && !("onscroll" in window)) ||
    (typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));

export const supportsIntersectionObserver = runningOnBrowser && "IntersectionObserver" in window;

export const supportsClassList = runningOnBrowser && "classList" in document.createElement("p");

export const supportsCreateImageBitmap = runningOnBrowser && "createImageBitmap" in window;

export const supportsFetch = runningOnBrowser && "fetch" in window;

export const isHiDpi = runningOnBrowser && window.devicePixelRatio > 1;