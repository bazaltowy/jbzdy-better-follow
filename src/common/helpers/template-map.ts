export function templateMap<T>(
  items: T[],
  template: (...args: any[]) => Element | string
) {
  return items
    .map((item) => {
      const templateHtmlOrElement = template(item);
      const isElement = typeof templateHtmlOrElement !== "string";

      return isElement
        ? templateHtmlOrElement.outerHTML
        : templateHtmlOrElement;
    })
    .join("");
}
