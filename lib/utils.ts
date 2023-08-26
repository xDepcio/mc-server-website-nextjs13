import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/** changes any object to form data.
Put 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' in headers
*/
export function toFormBody(details: any) {
    let formBody: any = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
}
