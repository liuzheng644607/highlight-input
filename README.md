# highlight-input

[![NPM version](https://img.shields.io/npm/v/highlight-input.svg?style=flat)](https://npmjs.org/package/highlight-input)
[![NPM downloads](http://img.shields.io/npm/dm/highlight-input.svg?style=flat)](https://npmjs.org/package/highlight-input)

highlight-input

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
    fileName: '',
  });
  return (
    <>
      <HighlightInput
        ref={inputInstanceRef}
        placeholder="请输入..."
        value={state.fileName}
        onChange={(v) => {
          setState((prev) => {
            return {
              ...prev,
              fileName: v,
            };
          });
        }}
      />
      <button
        onClick={() => {
          inputInstanceRef.current?.insertKeywords({
            label: '操作人',
            value: '${user}',
          });
        }}
      >
        操作人
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

## Development

```bash
# install dependencies
$ npm install

# develop library by docs demo
$ npm start

# build library source code
$ npm run build

# build library source code in watch mode
$ npm run build:watch

# build docs
$ npm run docs:build

# check your project for potential problems
$ npm run doctor
```

## LICENSE

MIT
