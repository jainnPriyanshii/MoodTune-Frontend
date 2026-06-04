module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        // Note: 'react-native-reanimated/plugin' is no longer needed in SDK 54
        // with react-native-reanimated v4 — babel-preset-expo handles it automatically.
    };
};
