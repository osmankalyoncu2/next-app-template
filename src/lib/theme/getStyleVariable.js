export function getStyleVariable(variableName, convertToHex = false) {
    const style = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();

    if (!convertToHex) {
        return style;
    }

    // Assuming the style is in HSL format like '240 10% 3.9%'
    const hsl = style.match(/\d+(\.\d+)?/g);
    if (hsl) {
        return hslToHex(...hsl);
    }

    return null;
}

function hslToHex(h, s, l) {
    h = parseInt(h);
    s = parseInt(s) / 100;
    l = parseInt(l) / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    return `#${r.padStart(2, '0')}${g.padStart(2, '0')}${b.padStart(2, '0')}`;
}
