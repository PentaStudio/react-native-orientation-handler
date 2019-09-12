## React Native Orientation
[![npm version](https://badge.fury.io/js/react-native-orientation-handler.svg)](https://badge.fury.io/js/react-native-orientation-handler)

Handle device orientation events and lock device screen to specific orientations.

## Getting started
Install the library using either Yarn:

```
yarn add react-native-orientation-handler
```

or npm:

```
npm install --save react-native-orientation-handler
```

You then need to link the native parts of the library for the platforms you are using. The easiest way to link the library is using the CLI tool by running this command from the root of your project:

```
react-native link react-native-orientation-handler
```

## Configuration

**iOS**

Add the following to your project's `AppDelegate.m`:

```objc
#import "OrientationHandler.h" // <--- import

@implementation AppDelegate

  // ...

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [OrientationHandler getOrientation];
}
  

@end
```

**Android**

Implement `onConfigurationChanged` method in `MainActivity.java`

```java
    import android.content.Intent; // <--- import
    import android.content.res.Configuration; // <--- import

    public class MainActivity extends ReactActivity {
      ......
      @Override
      public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }

      ......

    }
```

## Usage

To use the `react-native-orientation-handler` package in your codebase, you should use the OrientationHandler module:
```javascript
import OrientationHandler from 'react-native-orientation-handler';
```

```javascript
export default class AppScreen extends Component {
  // ...

  componentWillMount() {
    // The getOrientation method is async. It happens sometimes that
    // you need the orientation at the moment the JS runtime starts running on device.
    // `getInitialOrientation` returns directly because its a constant set at the
    // beginning of the JS runtime.

    const initial = OrientationHandler.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
    } else {
      // do something else
    }
  }

  componentDidMount() {
    // this locks the view to Portrait Mode
    OrientationHandler.lockToPortrait();

    // this locks the view to Landscape Mode
    // OrientationHandler.lockToLandscape();

    // this unlocks any previous locks to all Orientations
    // OrientationHandler.unlockAllOrientations();

    OrientationHandler.addOrientationListener(this._orientationDidChange);
  }

  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      // do something with landscape layout
    } else {
      // do something with portrait layout
    }
  }

  componentWillUnmount() {
    OrientationHandler.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });


    // Remember to remove listener
    OrientationHandler.removeOrientationListener(this._orientationDidChange);
  }

  render() {
    // ...

    return (
      // ...
    )
  }
}
```

## Orientation Events

```javascript
addOrientationListener((orientation) => {});
```

`orientation` will return one of the following values:
- `LANDSCAPE`
- `PORTRAIT`
- `UNKNOWN`

```javascript
removeOrientationListener((orientation) => {});
```

```javascript
addSpecificOrientationListener((specificOrientation) => {});
```

`specificOrientation` will return one of the following values:
- `LANDSCAPE-LEFT`
- `LANDSCAPE-RIGHT`
- `PORTRAIT`
- `PORTRAITUPSIDEDOWN`
- `UNKNOWN`

```javascript
removeSpecificOrientationListener((specificOrientation) => {});
```

## API

- `lockToPortrait()`
- `lockToLandscape()`
- `lockToLandscapeLeft()`
- `lockToLandscapeRight()`
- `unlockAllOrientations()`
- `getOrientation((err, orientation) => {})`
- `getSpecificOrientation((err, specificOrientation) => {})`
