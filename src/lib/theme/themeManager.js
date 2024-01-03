export const switchTheme = (theme) => {
    if (typeof window === "undefined") return;
    document.querySelector(":root")?.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
};

export const resolveTheme = () => {
    if (typeof window === "undefined") return;
    const theme = window.localStorage.getItem("theme");
    if (theme) {
        switchTheme(theme);
    }
};

export const resetTheme = () => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem("theme");
    document.querySelector(":root")?.removeAttribute("data-theme");
};