import { useState } from "react";
import { Textarea } from "../common/shadcn/TextArea";
import Layers from "../common/styled-components/layers";

const trimHashes = (hashString: string) => {
  const ch: string = "#";
  const sz: number = hashString.length;
  let idx = -1;
  for (let i = 0; i < sz; i++) {
    if (hashString.charAt(i) == ch) {
      idx = i;
    } else break;
  }
  if (idx == -1) return hashString;
  if (idx <= 2) {
    return hashString.substring(idx + 1, sz);
  }
  return hashString;
};

const MarkDownEditor = () => {
  const [markdownString, setMarkDownString] = useState("");
  const [result, setResult] = useState("");

  const convertMarkdown = (markdown: string) => {
   
    const lines = markdownString.split("\n");
    const filteredLines = lines.filter((val) => val != "");
    let result = filteredLines;
    for (let i = 0 ; i <filteredLines.length ; i++) {
            result[i] = trimHashes(filteredLines[i]);
    }
    const stringResult = result.join("\n")
    console.log(stringResult)
    setResult(stringResult);
    setMarkDownString(markdown);
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
        <Textarea value={result}/>
      </Layers>
    </>
  );
};

export default MarkDownEditor;
