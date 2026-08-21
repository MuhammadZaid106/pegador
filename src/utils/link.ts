export const isExternalLink = (href: string): boolean => {
  return href.startsWith("http");
};
