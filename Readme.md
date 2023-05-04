# react-native-toast-mith

Toast message with animated functionality, You can customize UI element according to your requirement,

Use this Props for changing background color
BackgroundSuccessColor
BackgroundErrorColor
TitleStyle
MessageStyle
ShowCloseIcon

![Alt text](/relative/path/to/img.png?raw=true 'Optional Title')
![Alt text](/relative/path/to/img2.png?raw=true 'Optional Title')
![Alt text](/relative/path/to/img3.png?raw=true 'Optional Title')
![Alt text](/relative/path/to/img4.png?raw=true 'Optional Title')

## Installation

```sh
npm install react-native-toast-mith
```

## Usage

```js
import {Toast, Type} from 'react-native-toast-mith';

Usage
Render the Toast component in your app's entry file, as the LAST CHILD in the View hierarchy (along with any other components that might be rendered there):

// App.jsx
import {Toast} from 'react-native-toast-mith';

export function App(props) {
  return (
    <>
      {/* ... */}
      <Toast />
    </>
  );
}

Then use it anywhere in your app (even outside React components), by calling any Toast method directly:
// Foo.jsx
import {Type} from 'react-native-toast-mith';
import { Button } from 'react-native'

export function Foo(props) {
    onClick = () => {
    Type({
      type: 'success',
      message: 'Test',
    });
  }

 onClick = () => {
    Type({
      type: 'error',
      message: 'Test',
    });
  }

  return (
    <Button
      title='Show toast'
      onPress={()=>onClick()}
    />
  )
}
// ...

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
