export const removeHTMLTags = (text: string): string => {
  return text.replace(/<[^>]*>?/gm, '');
};
