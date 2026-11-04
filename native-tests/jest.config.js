module.exports = {
    preset: 'jest-expo/android',
    // @molulabs/ds is linked from the parent, which has no node_modules of its own
    modulePaths: ['<rootDir>/node_modules'],
    roots: ['<rootDir>'],
    // Fonts are assets: Metro gives them as a number
    moduleNameMapper: { '\\.ttf$': '<rootDir>/asset.js' },
};
