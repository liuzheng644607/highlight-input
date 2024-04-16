# Foo

Simple

```jsx
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

allowLineBreak

```jsx
import React, { useRef, useState } from 'react';
import HighlightInput from 'highlight-input';

export default () => {
  const inputInstanceRef = useRef(null);
  const [state, setState] = useState({
    fileName: `hello,
world
    `,
  });
  return (
    <>
      <HighlightInput
        ref={inputInstanceRef}
        placeholder="请输入..."
        value={state.fileName}
        allowLineBreak
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
