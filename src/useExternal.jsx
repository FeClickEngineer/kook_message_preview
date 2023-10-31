import { useEffect, useRef, useState } from 'react';

const EXTERNAL_USED_COUNT = {};

const loadScript = (path = '', props = {}) => {
  const script = document.querySelector(`script[src="${path}"]`);

  if (!script) {
    const newScript = document.createElement('script');
    newScript.src = path;

    Object.keys(props).forEach((key) => {
      newScript[key] = props[key];
    });

    newScript.setAttribute('data-status', 'loading');
    document.body.appendChild(newScript);

    return {
      ref: newScript,
      status: 'loading',
    };
  }

  return {
    ref: script,
    status: script.getAttribute('data-status') || 'ready',
  };
};

const useExternal = (path, options) => {
  const [status, setStatus] = useState(path ? 'loading' : 'unset');

  const ref = useRef();

  useEffect(() => {
    if (!path) {
      setStatus('unset');
      return;
    }
    const pathname = path.replace(/[|#].*$/, '');
    if (
      options?.type === 'js' ||
      (!options?.type && /(^js!|\.js$)/.test(pathname))
    ) {
      const result = loadScript(path, options?.js);
      ref.current = result.ref;
      setStatus(result.status);
    } else {
      // do nothing
      console.error(
        "Cannot infer the type of external resource, and please provide a type ('js' | 'css'). " +
          'Refer to the https://ahooks.js.org/hooks/dom/use-external/#options',
      );
    }

    if (!ref.current) {
      return;
    }

    if (EXTERNAL_USED_COUNT[path] === undefined) {
      EXTERNAL_USED_COUNT[path] = 1;
    } else {
      EXTERNAL_USED_COUNT[path] += 1;
    }

    const handler = (event) => {
      const targetStatus = event.type === 'load' ? 'ready' : 'error';
      ref.current?.setAttribute('data-status', targetStatus);
      setStatus(targetStatus);
    };

    ref.current.addEventListener('load', handler);
    ref.current.addEventListener('error', handler);
    return () => {
      ref.current?.removeEventListener('load', handler);
      ref.current?.removeEventListener('error', handler);

      EXTERNAL_USED_COUNT[path] -= 1;

      if (EXTERNAL_USED_COUNT[path] === 0 && !options?.keepWhenUnused) {
        ref.current?.remove();
      }

      ref.current = undefined;
    };
  }, [path]);

  return status;
};

export default useExternal;
