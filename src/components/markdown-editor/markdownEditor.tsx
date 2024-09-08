import { useState } from "react";
import { Textarea } from "../common/shadcn/TextArea";
import Layers from "../common/styled-components/layers";
import parse from "html-react-parser";

const trimHashes = (hashString: string) => {
  const ch: string = "#";
  const sz: number = hashString.length;
  let idx = -1;
  let text = "";
  for (let i = 0; i < sz; i++) {
    if (hashString.charAt(i) == ch) {
      idx = i;
    } else break;
  }

  if (idx < 6 && idx >= 0) {
    text =
      `<h${idx + 1}>` + hashString.substring(idx + 1, sz) + `</h${idx + 1}>`;
  }

  text = text.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");

  // Convert Bold
  text = text.replace(/\*\*(.*?)\*\*|__(.*?)__/g, "<strong>$1$2</strong>");

  // Convert Italic
  text = text.replace(/\*(.*?)\*|_(.*?)_/g, "<em>$1$2</em>");

  return text;
};

const MarkDownEditor = () => {
  const [markdownString, setMarkDownString] = useState("");
  const [result, setResult] = useState("");

  const convertMarkdown = (markdown: string) => {
    const lines = markdownString.split("\n");
    const filteredLines = lines.filter((val) => val !== "");
    let result = filteredLines.map((val) => trimHashes(val));
    const stringResult = result.join("\n");

    setResult((prev) => stringResult);
    setMarkDownString((prev) => markdown);
  };

  return (
    <>
      <Layers>
        <h1>Enter your markdown here </h1>
        <Textarea
          value={markdownString}
          onChange={(e) => convertMarkdown(e.target.value)}
        />
        <h1>result</h1>
        <div>{parse(result)}</div>
      </Layers>
    </>
  );
};

export default MarkDownEditor;
