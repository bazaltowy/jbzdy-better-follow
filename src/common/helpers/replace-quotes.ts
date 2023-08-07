export function replaceQuotes(text: string) {
  return text
    .replaceAll(
      /\[quote\]/gm,
      `
        <blockquote>
        <span class="ion-quote"></span>
      `
    )
    .replaceAll(
      /\[\/quote\]/gm,
      `
        <span class="ion-quote"></span>
        </blockquote>
      `
    );
}
