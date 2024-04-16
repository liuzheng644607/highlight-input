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
