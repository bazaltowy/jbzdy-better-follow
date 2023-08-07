export function replaceWypierdalaj(text: string) {
  return text.replaceAll(
    /(^|\s)wypierdalaj\b/gim,
    ' <span class="wyp">WYPIERDALAJ</span>'
  );
}
