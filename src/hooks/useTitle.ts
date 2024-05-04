import { useState, useEffect } from 'react';

const DEFAULT_TITLE = process.env.DEFAULT_TITLE! as string;

export const useTitle = (title: string) => {
  const [text, setText] = useState(title);

  useEffect(() => {
    document.title = text;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [text]);

  return [text, setText];
};
