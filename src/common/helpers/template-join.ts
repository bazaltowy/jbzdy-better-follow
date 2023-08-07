export function templateJoin(
  html: TemplateStringsArray,
  parameters: any[],
  element?: HTMLElement
) {
  const dummyElement = document.createElement("div");

  parameters = parameters.map((parameter) => {
    if (typeof parameter === "function") {
      return parameter(element || dummyElement) || "";
    }

    return parameter;
  });

  const htmlWithParameters = html.reduce((result, text) => {
    result += text;

    const parameter = parameters.shift();
    if (parameter) {
      result += String(parameter);
    }

    return result;
  }, "");

  return htmlWithParameters;
}
