export function replaceLink(text: string) {
  return (
    " " +
    text
      .replaceAll(
        /(?<=\s+|^)(https:\/\/.*?)(?=(\s+|$))/gim,
        '<a href="$1">$1</a>'
      )
      .trim()
  );
}
