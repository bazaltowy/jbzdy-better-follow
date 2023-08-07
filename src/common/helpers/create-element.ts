export function createElement<ElementType extends HTMLElement = HTMLElement>(
  html: string
): ElementType {
  const div = document.createElement("div");

  div.innerHTML = html;

  return div.firstElementChild as ElementType;
}
