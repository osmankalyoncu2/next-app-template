export const switchTheme = (theme) => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
};