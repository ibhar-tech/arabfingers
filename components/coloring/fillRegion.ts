/** Fill only the connected area touched by the child, respecting outline and paint. */
export function fillRegion(paint: HTMLCanvasElement, outline: HTMLCanvasElement, point: { x: number; y: number }, color: string) {
  const paintContext = paint.getContext("2d");
  const outlineContext = outline.getContext("2d");
  if (!paintContext || !outlineContext) return;
  const { width, height } = paint;
  const x = Math.max(0, Math.min(width - 1, Math.floor(point.x)));
  const y = Math.max(0, Math.min(height - 1, Math.floor(point.y)));
  const paintPixels = paintContext.getImageData(0, 0, width, height);
  const boundary = outlineContext.getImageData(0, 0, width, height).data;
  const start = y * width + x;
  // Do not flood from an outline stroke: a small missed tap should be harmless.
  if (boundary[start * 4 + 3] > 70) return;
  const pixels = paintPixels.data;
  const target = Array.from(pixels.subarray(start * 4, start * 4 + 4));
  const rgb = [1, 3, 5].map(offset => parseInt(color.slice(offset, offset + 2), 16));
  const seen = new Uint8Array(width * height);
  const stack = new Int32Array(width * height);
  let length = 1;
  stack[0] = start;
  seen[start] = 1;
  const addPixel = (position: number) => {
    if (seen[position] || boundary[position * 4 + 3] > 70) return;
    const offset = position * 4;
    if (target.some((channel, index) => Math.abs(pixels[offset + index] - channel) > 32)) return;
    seen[position] = 1;
    stack[length++] = position;
  };
  while (length > 0) {
    const position = stack[--length];
    const offset = position * 4;
    pixels[offset] = rgb[0];
    pixels[offset + 1] = rgb[1];
    pixels[offset + 2] = rgb[2];
    pixels[offset + 3] = 255;
    const column = position % width;
    if (column > 0) addPixel(position - 1);
    if (column < width - 1) addPixel(position + 1);
    if (position >= width) addPixel(position - width);
    if (position < width * (height - 1)) addPixel(position + width);
  }
  paintContext.putImageData(paintPixels, 0, 0);
}
