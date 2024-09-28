console.warn('Running: setupSystemBackground.js');

let colorPrimary = '#' + process.env.RSP_COLOR_PRIMARY,
    colorSecondary = '#' + process.env.RSP_COLOR_SECONDARY,
    colorGroundient = process.env.RSP_COLOR_GROUNDIENT;

const colorPrimaryRgba = toRgba(colorPrimary, 1)
const colorSecondaryRgba = toRgba(colorSecondary, 0.77)
const colorGroundientRgba = `linear-gradient(${colorGroundient}, ${colorPrimaryRgba} 0%, ${colorSecondaryRgba} 100%)`;

console.debug('colorPrimary', colorPrimary)
console.debug('colorSecondary', colorSecondary)
console.debug('colorGroundient', colorGroundient)
console.debug('colorGroundientRgba', colorGroundientRgba)

console.warn("Setting up the apps background in <html> tag.")
document.getElementsByTagName('html')[0].style.background = colorGroundientRgba;
