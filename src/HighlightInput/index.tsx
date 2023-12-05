import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import useControlValue from '../hooks/useControlValue';
import './index.scss';

import { InputInstance, Keywords, Props, RichValue } from './types';
import {
  convertHTMLStringToRichValue,
  convertRichValueToHTMLString,
  htmlEncode,
  insertHtmlAtCaret,
  makeKeywordsNodeString,
} from './utils';

function trigger(el: HTMLDivElement, type: string) {
  const e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

const RichTextInput = forwardRef<InputInstance, Props>((props, ref) => {
  const {
    disabled,
    placeholder,
    className = '',
    editorClassName = '',
    keywordsStyle,
    onFocus,
    onBlur,
    prefix,
    suffix,
  } = props;
  const [value, setValue] = useControlValue<RichValue, Props>(props);
  const editorRef = useRef<HTMLDivElement>(null);
  const isComposing = useRef(false);
  const range = useRef<Range>();
  const handleChange = (value: RichValue) => {
    range.current = window.getSelection()?.getRangeAt(0)?.cloneRange();
    setValue(value);
  };
  const getKeywordsStyle = (keywords: Keywords) => {
    const rootStyle = editorRef.current && getComputedStyle(editorRef.current);
    const defaultStyle: React.CSSProperties = {
      fontSize: rootStyle?.fontSize,
      fontFamily: rootStyle?.fontFamily,
      color: rootStyle?.color,
      wordBreak: 'keep-all',
      whiteSpace: 'nowrap',
      backgroundColor: 'rgba(194, 224, 255, 0.5)',
      lineHeight: rootStyle?.lineHeight,
      textAlign: 'center',
      // padding: '1px 0 1px 0'
    };
    let styles = {
      ...defaultStyle,
    };
    if (typeof keywordsStyle === 'function') {
      styles = {
        ...styles,
        ...keywordsStyle?.(defaultStyle, keywords),
      };
    } else {
      styles = {
        ...styles,
        ...keywordsStyle,
      };
    }

    return styles;
  };
  // 拦截粘贴，只允许粘贴文本
  const handlePaste: React.ClipboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      const { clipboardData } = e;
      let pastedText = (clipboardData || (window as any).clipboardData).getData(
        'text/html',
      );

      if (pastedText) {
        // 不要换行符
        pastedText = pastedText.replace(/[\r\n]/g, '');
        // 去掉meta标签及换行,去掉内联样式
        const regex = /(<(meta|br).*?>)|(\sstyle=".*?")|(\n)/gi;
        pastedText = pastedText.replace(regex, '');
        // 尝试把复制的内容格式化成richValue
        let pastedRichValue = convertHTMLStringToRichValue(pastedText);
        const includeKeywords = pastedRichValue.find(
          (item) => typeof item !== 'string',
        );
        // 否则只留纯文本
        if (!includeKeywords) {
          pastedText = htmlEncode(
            (clipboardData || (window as any).clipboardData).getData(
              'text/plain',
            ),
          );
          pastedRichValue = convertHTMLStringToRichValue(pastedText);
        }
        if (editorRef.current) {
          pastedText = convertRichValueToHTMLString(
            pastedRichValue,
            getKeywordsStyle,
          );
          document.execCommand('insertHTML', false, pastedText);
          const richValue = convertHTMLStringToRichValue(
            editorRef.current.innerHTML,
          );
          handleChange(richValue);
        }
      }
      return false;
    },
    [setValue],
  );

  const handleKeydown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      // 防止输入换行
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    },
    [],
  );

  useImperativeHandle(ref, () => {
    return {
      insertKeywords: (keywords) => {
        if (!editorRef.current) {
          return;
        }
        const keywordsNodeString = makeKeywordsNodeString(
          keywords,
          getKeywordsStyle,
        );
        editorRef.current?.focus();
        insertHtmlAtCaret(keywordsNodeString, range.current);
        const richValue = convertHTMLStringToRichValue(
          editorRef.current.innerHTML,
        );
        handleChange(richValue);
      },
    };
  });

  const handleSelectCapture = useCallback(() => {
    range.current = window.getSelection()?.getRangeAt(0)?.cloneRange();
  }, []);

  const clsPrefix = 'c-highlight';

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }
    const htmlString = convertRichValueToHTMLString(value, getKeywordsStyle);

    const innerHtmlString = editorRef.current.innerHTML?.replace(
      /&nbsp;/g,
      ' ',
    );

    const innerValue = convertHTMLStringToRichValue(innerHtmlString) || [];
    let isEqual = true;
    if (innerValue.length !== value?.length) {
      isEqual = false;
    } else {
      for (let index = 0; index < innerValue.length; index++) {
        const element = innerValue[index];
        const receivedElement = value?.[index];
        if (
          typeof element === 'string' ||
          typeof receivedElement === 'string'
        ) {
          if (element !== receivedElement) {
            isEqual = false;
            break;
          }
        } else {
          if (
            element.value !== receivedElement.value &&
            element.label !== receivedElement.label
          ) {
            isEqual = false;
          }
        }
      }
    }

    if (!isEqual) {
      editorRef.current.innerHTML = htmlString;
    }
  }, [value]);
  useEffect(() => {
    const el = editorRef.current;
    const customEventName = 'input';
    const handleCompositionStart = () => {
      isComposing.current = true;
    };
    const handleCompositionEnd = (e: any) => {
      if (!isComposing.current) return;
      isComposing.current = false;
      trigger(e.target, customEventName);
    };
    const handleInput = (e: any) => {
      if (isComposing.current) return;
      const innerHTML = e.currentTarget.innerHTML;
      const richValue = convertHTMLStringToRichValue(innerHTML);
      handleChange(richValue);
    };
    el?.addEventListener('compositionstart', handleCompositionStart);
    el?.addEventListener('compositionend', handleCompositionEnd);
    // el?.addEventListener("change", handleCompositionEnd);
    el?.addEventListener(customEventName, handleInput);
    return () => {
      if (el) {
        el.removeEventListener('compositionstart', handleCompositionStart);
        el.removeEventListener('compositionend', handleCompositionEnd);
        // el.removeEventListener("change", handleCompositionEnd);
        el.removeEventListener(customEventName, handleInput);
      }
    };
  }, []);
  return (
    <div className={`${clsPrefix}-input ${className}`} contentEditable={false}>
      {prefix}
      <div
        className={`${clsPrefix}-input__input-editor ${editorClassName}`}
        ref={editorRef}
        contentEditable={!disabled}
        onPaste={handlePaste}
        onKeyDown={handleKeydown}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        {...{
          disabled,
        }}
        onSelectCapture={handleSelectCapture}
      />
      {suffix}
    </div>
  );
});

export default RichTextInput;
