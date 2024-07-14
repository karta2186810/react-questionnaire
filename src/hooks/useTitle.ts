import { useEffect } from 'react';

const DEFAULT_TITLE = import.meta.env.VITE_DEFAULT_TITLE! as string;

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
};
