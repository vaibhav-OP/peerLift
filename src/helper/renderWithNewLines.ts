export default function renderWithNewlines(text: string) {
  return { __html: text.replace(/\n/g, "<br>") };
}
