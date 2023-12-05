import { SetStateAction, useCallback, useRef } from 'react';
import useUpdate from './useUpdate';

type Props<T> = {
  value?: T;
  defaultValue?: T;
  onChange?: (v: T) => void;
};

/**
 * 用于实现受控与非受控特性
 * @param props
 * @param controlKeys
 * @returns
 */
export default function useControlValue<V, T extends Props<V>>(
  props: T,
  controlKeys: {
    valueKey: keyof T;
    defaultValueKey: keyof T;
    eventKey: keyof T;
  } = {
    valueKey: 'value',
    defaultValueKey: 'defaultValue',
    eventKey: 'onChange',
  },
) {
  const { valueKey, defaultValueKey: defaultKey, eventKey } = controlKeys;
  const value = props[valueKey] as T[keyof T];
  const defaultValue = props[defaultKey];
  const onChange = props[eventKey];

  const update = useUpdate();

  const stateRef = useRef<V>(
    value !== undefined ? value : (defaultValue! as any),
  );
  if (value !== undefined) {
    stateRef.current = value as any;
  }

  const setState = useCallback(
    (v: SetStateAction<V>, forceTrigger: boolean = false, ...args: any[]) => {
      // `forceTrigger` means trigger `onChange` even if `v` is the same as `stateRef.current`
      const nextValue =
        typeof v === 'function'
          ? (v as (prevState: V) => V)(stateRef.current)
          : v;
      if (!forceTrigger && nextValue === stateRef.current) return;
      stateRef.current = nextValue;
      update();
      return (onChange as any)?.(nextValue, ...args);
    },
    [onChange, update],
  );
  return [stateRef.current, setState] as const;
}
