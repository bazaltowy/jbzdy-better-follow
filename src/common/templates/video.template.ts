export function Video(videoUrl: string) {
  return `
    <div class="article-image">
      <video controls>
        <source src="${videoUrl}" type="video/mp4" />
      </video>
    </div>
  `;
}
