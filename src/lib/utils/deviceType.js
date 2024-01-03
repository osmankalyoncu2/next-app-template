// Returns: "mac" | "windows" | "android" | "ios" | "unknown"

export default function deviceType() {
    if (typeof navigator === "undefined") return "unknown";
    
    const userAgent = navigator.userAgent;

    if (/windows/i.test(userAgent)) {
        return "windows";
    }
    if (/macintosh|mac os x/i.test(userAgent)) {
        return "mac";
    }
    if (/android/i.test(userAgent)) {
        return "android";
    }
    if (/iphone|ipad|ipod/i.test(userAgent)) {
        return "ios";
    }
    return "unknown";
}
