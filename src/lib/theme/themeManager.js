export const switchTheme = (theme) => {
    if (typeof window === "undefined") return;
    document.querySelector(":root")?.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
};

export const resolveTheme = () => {
    const theme = getTheme();
    if (theme) {
        switchTheme(theme);
    }
    return theme;
};

export const resetTheme = () => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem("theme");
    document.querySelector(":root")?.removeAttribute("data-theme");
};

export const getTheme = () => {
    if (typeof window === "undefined") return;
    return window.localStorage.getItem("theme");
};