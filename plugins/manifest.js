const {
  AndroidConfig,
  ConfigPlugin,
  withAndroidManifest,
} = require("expo/config-plugins");

const withClearTextTraffic = (config) => {
  return withAndroidManifest(config, async (config) => {
    config.modResults = await setClearTextTraffic(config, config.modResults);
    return config;
  });
};

async function setClearTextTraffic(config, androidManifest) {
  const application =
    AndroidConfig.Manifest.getMainApplicationOrThrow(androidManifest);
  application.$["android:usesCleartextTraffic"] = "true";

  return androidManifest;
}

module.exports = withClearTextTraffic;
