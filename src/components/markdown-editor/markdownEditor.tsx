import { useState } from "react";
import { Textarea } from "../common/shadcn/TextArea";
import Layers from "../common/styled-components/layers";
import parse from "html-react-parser";
import { headingStyles } from "@/helpers/helpers";

const trimHashes = (hashString: string) => {
  if (hashString == "") {
    return "<br/>";
  }
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
      `<h${idx + 1} className=${headingStyles[idx + 1]}>` +
      hashString.substring(idx + 1, sz) +
      `</h${idx + 1}>`;
  }

  text = text.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");

  // Convert Bold
  text = text.replace(/\*\*(.*?)\*\*|__(.*?)__/g, "<strong>$1$2</strong>");

  // Convert Italic
  text = text.replace(/\*(.*?)\*|_(.*?)_/g, "<em>$1$2</em>");
  if (idx == -1) {
    text = "<p>" + text + "</p>";
  }

  return text;
};

const MarkDownEditor = () => {
  const [markdownString, setMarkDownString] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const convertMarkdown = (markdown: string) => {
    const lines = markdown.split("\n");
    let result = lines.map((val) => trimHashes(val));
    console.log(result);
    setResult((prev) => result);
    setMarkDownString((prev) => markdown);
  };

  return (
    <>
      <Layers>
        <div className="p-4 grid grid-cols-2 gap-4">
          <div>
            <h1 className={headingStyles[2]}>Enter your markdown here </h1>
            <Textarea
              value={markdownString}
              onChange={(e) => convertMarkdown(e.target.value)}
              rows={10}
            />
          </div>
          <div>
            <h1 className={headingStyles[2]}>Preview</h1>
            <div>
              {result.map((val) => (
                <>{parse(val)}</>
              ))}
            </div>
          </div>
        </div>
      </Layers>
    </>
  );
};

export default MarkDownEditor;
