export const API_BASE = 'https://ludo.devtechnosys.tech:17177/admin/';
// export const API_BASE = "http://172.16.11.201:17164/api/"

// export const BASE_API = API_BASE + "/api";
// export const MAIN_URL = BASE_API + "/api/admin";

export const MOBILE_REGEX = /^[0-9]{10}$/;

export const PASSWORDS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%^&*?])[A-Za-z\d#$@!%^&*?]{8,}$/g;

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z ]{2,}))$/;

export const NOSPACE_REGEX = /^(?!\s+$).*/;

export const NOSPACE = "Spaces are not allowed";

export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif", "video/mp4", "video/x-ms-wmv", "video/quicktime", "video/webm", "application/pdf", "text/plain", "application/msword", "application/vnd.ms-excel", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.presentationml.presentation"];

export const MULTIPLESPACE = /  +/g;

export const CARD_REGEX = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/g;

export const NODIGITREGEX = /^([^0-9]*)$/

export const DECIMALPATTERN = /^[0-9]+(\.[0-9]{1,2})?$/;