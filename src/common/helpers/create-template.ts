import { templateJoin } from "./template-join";

export function createTemplate(
  html: TemplateStringsArray,
  ...parameters: Array<any>
): string {
  const parser = new DOMParser();

  const dom = parser.parseFromString(
    templateJoin(html, parameters),
    "text/html"
  );
  const element = dom.body.firstElementChild as HTMLElement;

  element.style.width = "400px";
  document.body.appendChild(element);

  const { firstElementChild } = parser.parseFromString(
    templateJoin(html, parameters, element),
    "text/html"
  ).body;

  if (!firstElementChild) {
    throw new Error("Template must have single root node");
  }

  element.remove();

  return firstElementChild.outerHTML;
}
