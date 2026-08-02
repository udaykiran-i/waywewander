import { useEffect } from 'react';

export default function Seo({ title, description, image = '/og-image.svg' }) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector, attribute, value) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attribute, value);
      }
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', image);
  }, [description, image, title]);

  return null;
}
