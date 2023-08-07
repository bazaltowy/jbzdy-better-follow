import { createTemplate } from "../helpers/create-template";

export function ReadMore(content: string) {
  const shouldBeHidden = ({ firstElementChild }: HTMLElement) => {
    if (!firstElementChild) {
      return false;
    }

    return firstElementChild.clientHeight > 150;
  };

  return createTemplate`
    <div class="read-more comment-text">
      <div class="read-more-content" style="max-height: ${(
        readMore: HTMLElement
      ) => (shouldBeHidden(readMore) ? "150px" : "none")}">
        ${content}
      </div>
      ${(readMore: HTMLElement) =>
        shouldBeHidden(readMore) &&
        '<button class="read-more-button">pokaż</button>'}
      </div>
    </div>
  `;
}
