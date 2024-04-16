# highlight-input

[![NPM version](https://img.shields.io/npm/v/highlight-input.svg?style=flat)](https://npmjs.org/package/highlight-input)
[![NPM downloads](http://img.shields.io/npm/dm/highlight-input.svg?style=flat)](https://npmjs.org/package/highlight-input)

highlight-input is a React component designed to enhance user experience by providing keyword highlighting functionality within text input fields. Easily integrate this component into your React applications to dynamically highlight specified keywords as users type or interact with the input, facilitating easier navigation and comprehension within large text datasets.

[Example](https://codesandbox.io/p/sandbox/highlight-input-2jfstl?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clt5dtcr700063b6qdrejin88%2522%252C%2522sizes%2522%253A%255B100%252C0%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clt5dtcr700023b6qyrqpp7ai%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clt5dtcr700033b6q714aaja7%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clt5dtcr700053b6qxvc087hn%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clt5dtcr700023b6qyrqpp7ai%2522%253A%257B%2522id%2522%253A%2522clt5dtcr700023b6qyrqpp7ai%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clt5e9w2n00023b6qmcrzrobk%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A8%252C%2522startColumn%2522%253A13%252C%2522endLineNumber%2522%253A8%252C%2522endColumn%2522%253A13%257D%255D%252C%2522filepath%2522%253A%2522%252Fsrc%252Findex.tsx%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522id%2522%253A%2522clt5en8tw00023b6qebd5dg6t%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A9%252C%2522startColumn%2522%253A6%252C%2522endLineNumber%2522%253A9%252C%2522endColumn%2522%253A6%257D%255D%252C%2522filepath%2522%253A%2522%252Fsrc%252FApp.tsx%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clt5en8tw00023b6qebd5dg6t%2522%257D%252C%2522clt5dtcr700053b6qxvc087hn%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clt5dtcr700043b6ql2zpoqz1%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A0%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522id%2522%253A%2522clt5dtcr700053b6qxvc087hn%2522%252C%2522activeTabId%2522%253A%2522clt5dtcr700043b6ql2zpoqz1%2522%257D%252C%2522clt5dtcr700033b6q714aaja7%2522%253A%257B%2522tabs%2522%253A%255B%255D%252C%2522id%2522%253A%2522clt5dtcr700033b6q714aaja7%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Afalse%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

https://github.com/liuzheng644607/highlight-input/assets/8045477/aa1f6426-e308-4c3e-a124-ad127ca9a9f0

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
   * Whether to allow line breaks, like the textarea element
   */
  allowLineBreak?: boolean;
  /**
   * Custom keywords style
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
