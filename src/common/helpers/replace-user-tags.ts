export function replaceUserTags(text: string) {
  return text.replaceAll(
    /\@\[(?<name>[a-z0-9A-Z_-]+)\]/gm,
    `<a href="https://jbzd.com.pl/uzytkownik/$<name>">
      @$<name>
    </a>`
  );
}
