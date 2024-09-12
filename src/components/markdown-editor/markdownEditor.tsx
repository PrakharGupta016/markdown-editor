import { useState } from "react";
import { Textarea } from "../common/shadcn/TextArea";
import Layers from "../common/styled-components/layers";
import parse from "html-react-parser";


const headingStyles: { [key: number]: string } = {
  1: "text-3xl font-bold",
  2: "text-2xl font-semibold",
  3: "text-xl font-semibold",
  4: "text-lg font-medium",
  5: "text-base font-medium",
  6: "text-sm font-medium",
};

const trimHashes = (hashString: string) => {
  const ch: string = "#";
  const sz: number = hashString.length;
  let idx = -1;
  let text = hashString;
  for (let i = 0; i < sz; i++) {
    if (hashString.charAt(i) == ch) {
      idx = i;
    } else break;
  }

  if (idx < 6 && idx >= 0) {
    text =
      `<h${idx + 1} className=${headingStyles[idx+1]}>` + hashString.substring(idx + 1, sz) + `</h${idx + 1}>`;
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
  const [result, setResult] = useState<string[]>([]);

  const convertMarkdown = (markdown: string) => {
    const lines = markdown.split("\n");
    let result = lines.map((val) => trimHashes(val));
    console.log(result)
    setResult((prev) => result);
    setMarkDownString((prev) => markdown);
  };

  return (
    <>
      <Layers>
        <div className="p-4 grid ">
        <h1>Enter your markdown here </h1>
        <Textarea
          value={markdownString}
          onChange={(e) => convertMarkdown(e.target.value)}
        />
        <h1>result</h1>
        <div>{result.map((val)=>(<div>{parse(val)}</div>))}</div>
        </div>
      </Layers>
    </>
  );
};

export default MarkDownEditor;
