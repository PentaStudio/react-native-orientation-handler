import {NativeModules, DeviceEventEmitter} from 'react-native';

const {OrientationHandler} = NativeModules;

const orientationDidChangeEvent = 'orientationDidChange';
const specificOrientationDidChangeEvent = 'specificOrientationDidChange';
const META = '__listener_id';

let listeners = {};
let id = 0;

if (!OrientationHandler) {
  throw new Error(`[OrientationHandler]: NativeModule: OrientationHandler is null.

To fix this issue try these steps:

  • Run \`react-native link react-native-orientation-handler\` in the project root.

  • Rebuild and restart the app.

  • Run the packager with \`--clearCache\` flag.

  • If you are using CocoaPods on iOS, run \`pod install\` in the \`ios\` directory and then rebuild and re-run the app.

If none of these fix the issue, please open an issue on the Github repository: https://github.com/YatoStudio/react-native-orientation-handler/issues 
`);
}

const getKey = listener => {
    if (!listener.hasOwnProperty(META)) {
        if (!Object.isExtensible(listener)) {
            return 'F';
        }

        Object.defineProperty(listener, META, {
            value: 'L' + ++id,
        });
    }

    return listener[META];
};

const Orientation = {
    lockToPortrait: () => OrientationHandler.lockToPortrait,
    lockToLandscape: () => OrientationHandler.lockToLandscape,
    lockToLandscapeRight: () => OrientationHandler.lockToLandscapeRight,
    lockToLandscapeLeft: () => OrientationHandler.lockToLandscapeLeft,
    unlockAllOrientations: () => OrientationHandler.unlockAllOrientations,

    getOrientation: cb => {
        OrientationHandler.getOrientation((error, orientation) => {
            cb(error, orientation);
        });
    },

    getSpecificOrientation: cb => {
        OrientationHandler.getSpecificOrientation((error, orientation) => {
            cb(error, orientation);
        });
    },

    addOrientationListener: cb => {
        const key = getKey(cb);
        listeners[key] = DeviceEventEmitter.addListener(orientationDidChangeEvent,
            (body) => {
                cb(body.orientation);
            });
    },

    removeOrientationListener: cb => {
        const key = getKey(cb);

        if (!listeners[key]) {
            return;
        }

        listeners[key].remove();
        listeners[key] = null;
    },

    addSpecificOrientationListener: cb => {
        const key = getKey(cb);

        listeners[key] = DeviceEventEmitter.addListener(specificOrientationDidChangeEvent,
            (body) => {
                cb(body.specificOrientation);
            });
    },

    removeSpecificOrientationListener: cb => {
        const key = getKey(cb);

        if (!listeners[key]) {
            return;
        }

        listeners[key].remove();
        listeners[key] = null;
    },

    getInitialOrientation: () => OrientationHandler.initialOrientation
};

export default Orientation;
