export function GalleryItem(src: string) {
  return `
    <div class="silentbox-item" style="position: relative; z-index: 999;">
      <img src="${src}" alt="" width="100%" height="auto" loading="lazy">
    </div>
  `;
}
