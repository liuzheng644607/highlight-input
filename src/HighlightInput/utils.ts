import React from 'react';
import { Keywords, RichValue } from './types';

export function insertHtmlAtCaret(html: string, r?: Range) {
  let range = r;
  let sel: Selection | null;
  if (window.getSelection) {
    // IE9 and non-IE
    sel = window.getSelection();
    if (sel?.getRangeAt && sel.rangeCount) {
      range = range || sel.getRangeAt(0).cloneRange();
      range?.deleteContents();
      // Range.createContextualFragment() would be useful here but is
      // non-standard and not supported in all browsers (IE9, for one)
      let el = document.createElement('div');
      el.innerHTML = html;
      let frag = document.createDocumentFragment(),
        node,
        lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range?.insertNode(frag);
      // Preserve the selection
      if (lastNode) {
        range = range?.cloneRange();
        range?.setStartAfter(lastNode);
        range?.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if (
    (document as any).selection &&
    (document as any).selection.type !== 'Control'
  ) {
    // IE < 9
    (document as any).selection.createRange().pasteHTML(html);
  }
}

const kebabCase = (str: string) => {
  const regex = new RegExp(/[A-Z]/g);
  return str.replace(regex, (v) => `-${v.toLowerCase()}`);
};

const convertCssPropertiesToStyleString = (style?: React.CSSProperties) => {
  if (!style) return '';
  return Object.keys(style).reduce((accumulator, key) => {
    // transform the key from camelCase to kebab-case
    const cssKey = kebabCase(key);
    // remove ' in value
    const cssValue = (style as any)[key].replace("'", '');
    // build the result
    // you can break the line, add indent for it if you need
    return `${accumulator}${cssKey}:${cssValue};`;
  }, '');
};

function isIE() {
  let ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  let msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  let trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    let rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  let edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

export const makeKeywordsNodeString = (
  keywords: Keywords,
  keywordsStyle?: (keywords: Keywords) => React.CSSProperties,
) => {
  const { label = '', value = '' } = keywords;
  const container = document.createElement('span');
  document.body.appendChild(container);
  const styles = keywordsStyle?.(keywords);
  const styleString = convertCssPropertiesToStyleString({
    ...styles,
    display: 'inline-block',
  });
  container.innerText = label;
  container.setAttribute('style', styleString);
  // 测量宽高
  const { width, height } = container.getBoundingClientRect();
  const src = [
    `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${width}px" height="${height}px">`,
    // 非IE用foreignobject
    (isIE()
      ? `<text x="50%" y="50%" dy=".5px" style="dominant-baseline:middle;text-anchor:middle;" font-size="${
          styles?.fontSize
        }" fill="${styles?.color}" font-family="${styles?.fontFamily?.replace(
          // 把单双引号去掉，防止解析出错
          /['"]/g,
          '',
        )}">${label}</text>`
      : `<foreignObject x="0" y="0" width="${width}" height="${height}">
<body xmlns="http://www.w3.org/1999/xhtml" style="padding:0;margin:0;font-size:0">
${container.outerHTML}
</body>
</foreignObject>`
    ).replace(/[\n\r]/g, ''),
    '</svg>',
  ].join('');
  const img = new Image();
  img.src = src;
  img.setAttribute('data-label', label);
  img.setAttribute('data-value', value);
  img.setAttribute('data-is-keywords', 'true');
  img.setAttribute('data-keywords-info', JSON.stringify(keywords));
  container.remove();
  return img.outerHTML;
};

function filterRichValue(
  node: any,
  allowLineBreak: boolean,
  cbk: (v: string | Keywords, node: any) => void,
) {
  // 文本节点
  if (node.nodeType === 3) {
    cbk(
      node?.data
        ?.replace?.(allowLineBreak ? '' : /[\n\r]/g, '')
        ?.replace(/\u00a0/g, ' ')
        ?.replace(/&nbsp;/g, ' '),
      node,
    );
  }
  // 字段节点
  else if (node.nodeType === 1 && node.dataset?.['isKeywords'] === 'true') {
    const info = node.dataset['keywordsInfo'];
    let v = {
      label: node.dataset?.label,
      value: node.dataset?.value,
    };
    try {
      v = JSON.parse(info);
    } catch (e) {
      console.error(e);
    }
    cbk(v, node);
  }
  // 查找下一个节点
  else {
    let i = 0,
      childNodes = node.childNodes,
      item,
      len = childNodes.length || 0;
    for (i; i < len; i++) {
      item = childNodes[i];
      filterRichValue(item, allowLineBreak, cbk);
    }
  }
}

export function htmlEncode(s: string) {
  let str = s;
  if (!str || typeof str !== 'string') {
    return str;
  }
  str = str.toString();
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * 解析html，获取RichValue
 * @param html
 * @returns
 */
export const convertHTMLStringToRichValue = (
  html?: string,
  allowLineBreak = false,
) => {
  if (!html) return [];
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  let value: RichValue = [];
  filterRichValue(tempDiv, allowLineBreak, (v) => {
    if (v) {
      value.push(v);
    }
  });

  return value;
};

/**
 * 将richValue还原成html字符串
 * @param richValue
 * @param rootNode contentEditable=true的节点
 * @returns
 */
export const convertRichValueToHTMLString = (
  richValue: RichValue,
  keywordsStyle?: (keywords: Keywords) => React.CSSProperties,
) => {
  if (!richValue?.length) return '';
  let htmlString = '';
  for (let index = 0; index < richValue.length; index++) {
    const element = richValue[index];
    htmlString +=
      typeof element === 'string'
        ? htmlEncode(element).replace(/ /g, '&nbsp;')
        : makeKeywordsNodeString(element, keywordsStyle);
  }
  return htmlString;
};
