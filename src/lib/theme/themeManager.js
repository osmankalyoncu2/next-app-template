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

export const ThemeUpdated = (callback) => {
    if (typeof window === "undefined") return null;

    const targetNode = document.documentElement;

    const config = { attributes: true, attributeFilter: ['data-theme'] };

    const callbackWrapper = (mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                callback(mutation.target.getAttribute('data-theme'));
            }
        }
    };

    const observer = new MutationObserver(callbackWrapper);

    observer.observe(targetNode, config);

    // Return a function to disconnect the observer when no longer needed
    return () => observer.disconnect();
};
