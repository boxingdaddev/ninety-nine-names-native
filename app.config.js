export default {
  expo: {
    name: "Flipping99",
    slug: "flipping99",
    version: "1.0.1", // App version shared between Android & iOS
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/icon.png",
      resizeMode: "contain",
      backgroundColor: "#f9f5e7"
    },
    ios: {
      bundleIdentifier: "com.boxingdaddev.flipping99", // MUST match App Store Connect
      buildNumber: "1", // iOS build number (increment each submission: 1 → 2 → 3)
      supportsTablet: true
    },
    android: {
      package: "com.boxingdaddev.flipping99", // Android package (already set for Play Store)
      versionCode: 2, // Increment this for each Android update (2 → 3 → 4)
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#f9f5e7"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/icon.png"
    },
    extra: {
      eas: {
        projectId: "e422be18-bdaa-4a33-9522-09ed220ffa0e"
      }
    }
  }
};
