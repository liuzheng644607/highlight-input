import { useCallback, useState } from 'react';

/**
 * 强制更新
 * @returns
 */
const useUpdate = () => {
  const [, setState] = useState({});
  return useCallback(() => setState({}), []);
};

export default useUpdate;
