declare module "react-native-orientation-handler" {
    class OrientationHandler {
        static lockToPortrait(): void;

        static lockToLandscape(): void;

        static lockToLandscapeLeft(): void;

        static lockToLandscapeRight(): void;

        static unlockAllOrientations(): void;

        static addSpecificOrientationListener(handler: (orientation: OrientationType) => void): void;

        static removeSpecificOrientationListener(handler: (orientation: OrientationType) => void): void;
    }

    export default OrientationHandler;

    export type OrientationType =
        "LANDSCAPE-LEFT" |
        "LANDSCAPE-RIGHT" |
        "PORTRAIT" |
        "PORTRAITUPSIDEDOWN" |
        "UNKNOWN";
}