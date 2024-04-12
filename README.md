# highlight-input

[![NPM version](https://img.shields.io/npm/v/highlight-input.svg?style=flat)](https://npmjs.org/package/highlight-input)
[![NPM downloads](http://img.shields.io/npm/dm/highlight-input.svg?style=flat)](https://npmjs.org/package/highlight-input)

highlight-input is a React component designed to enhance user experience by providing keyword highlighting functionality within text input fields. Easily integrate this component into your React applications to dynamically highlight specified keywords as users type or interact with the input, facilitating easier navigation and comprehension within large text datasets.

<iframe src="https://codesandbox.io/embed/2jfstl?view=Preview&module=%2Fsrc%2FApp.tsx&hidenavigation=1"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="highlight-input"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Usage

```bash
npm i highlight-input
```

```typescript
import React, { useRef, useState } from 'react';
import HighlightInput from 'highlight-input';

export default () => {
  const inputInstanceRef = useRef(null);
  const [state, setState] = useState({
    inputValue: '',
  });
  return (
    <>
      <HighlightInput
        ref={inputInstanceRef}
        placeholder="Enter some stuff..."
        value={state.inputValue}
        onChange={(v) => {
          setState((prev) => {
            return {
              ...prev,
              inputValue: v,
            };
          });
        }}
      />
      <button
        onClick={() => {
          inputInstanceRef.current?.insertKeywords({
            label: 'Operator',
            value: '${model.operator}',
          });
        }}
      >
        Insert operator
      </button>
    </>
  );
};
```

## Options

```typescript
export interface Keywords {
  label?: string;
  value?: string;
  [key: string]: any;
}

export interface InputInstance {
  insertKeywords: (keywords: Keywords) => void;
}

export type RichValue = Array<Keywords | string>;

export interface Props {
  /**
   * placeholder
   */
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  editorClassName?: string;
  defaultValue?: RichValue;
  value?: RichValue;
  onChange?: (value: RichValue) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement, Element>) => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /**
   * 自定义keywords样式
   */
  keywordsStyle?:
    | React.CSSProperties
    | ((
        defaultStyle: React.CSSProperties,
        keywords: Keywords,
      ) => React.CSSProperties);
}
```

## LICENSE

MIT
