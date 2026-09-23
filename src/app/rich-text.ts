/** A run of paragraph text; `em` marks text that was wrapped in *asterisks*. */
export interface Segment {
  text: string;
  em: boolean;
}

/**
 * Turns stored text into paragraphs of segments for the detail pages.
 * A string is split on line breaks; an array is taken as one entry per
 * paragraph. *text* becomes an italic segment. No HTML is ever produced, so
 * stored content cannot inject markup.
 */
export function parseParagraphs(source: string | string[] | undefined): Segment[][] {
  const lines = Array.isArray(source) ? source : (source ?? '').split(/\n+/);
  return lines
    .map(line => line.trim())
    .filter(Boolean)
    .map(line =>
      line
        .split(/\*([^*]+)\*/)
        .map((part, i) => ({ text: part, em: i % 2 === 1 }))
        .filter(seg => seg.text)
    );
}
