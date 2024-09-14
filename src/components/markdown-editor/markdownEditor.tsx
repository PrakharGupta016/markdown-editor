import { useState } from "react";
import { Textarea } from "../common/shadcn/TextArea";
import Layers from "../common/styled-components/layers";
import parse from "html-react-parser";
import { headingStyles } from "@/helpers/helpers";
import { Button } from "../common/shadcn/Button";

const convertMarkdown = (markdown: string) => {

  let text = markdown;

  // Handle headings (e.g., #, ##, ###, etc.)
  text = text.replace(/^(#{1,6})\s(.*)/gm, (_, hashes, content) => {
    const level = hashes.length;
    return `<h${level} class="${headingStyles[level]}">${content}</h${level}>`;
  });

  // Convert blockquotes (e.g., "> quote")
  text = text.replace(/^\> (.*)$/gm, "<blockquote classname='p-4 my-4 bg-gray-50 border-l-4 border-gray-300 dark:border-gray-500 dark:bg-gray-800'><p classname='text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white'>$1</p></blockquote>");

  // Convert bold and italic markdown
  text = text.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
  text = text.replace(/\*\*(.*?)\*\*|__(.*?)__/g, "<strong>$1$2</strong>");
  text = text.replace(/\*(.*?)\*|_(.*?)_/g, "<em>$1$2</em>");
  text = text.replace(/^\s*$/gm,'<br/>')
  //code 
  text = text.replace(/\`(.*?)\`/g, "<code>$1</code>");
  //strike
  text = text.replace(/\~\~(.*?)\~\~/g, "<strike>$1</strike>");
  //link
  text = text.replace(/\[(.*?)\]\((.*?)\)/g,'<a href=$2>$1</a>')
  text = text.replace(/^\d+\.\s+(.*)/gm, '<li>$1</li>');

// If needed, wrap the whole list in <ol> tags
  text = text.replace(/(<li>.*<\/li>)/gms, '<ol className="list-decimal ml-3 pl-4">$1</ol>');

  // Wrap standalone lines with <p> tags (except if they are headings or blockquotes)
  text = text.replace(/^(?!<h|<blockquote|<br|<ol)(.*)$/gm, "<p>$1</p>");

  return text;
};

const MarkDownEditor = () => {
  const [markdownString, setMarkDownString] = useState("");
  const [result, setResult] = useState("");

  const onChangeHandler = (markdown: string) => {
    const result :string  = convertMarkdown(markdown)
    setResult((prev) => result);
    setMarkDownString((prev) => markdown);
  };
  const downloadHandler = (markdown:string) => {
    const blob = new Blob([markdown], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Layers>
        <div className="p-5">
        <Button onClick={()=>downloadHandler(result)}> download </Button>
        </div>
        <div className="p-5 grid grid-cols-2 gap-4">
          <div>
            <h1 className={headingStyles[2]}>Enter your markdown here </h1>
            <Textarea
              className="min-h-[80vh]"
              value={markdownString}
              onChange={(e) => onChangeHandler(e.target.value)}
            />
          </div>
          <div>
            <h1 className={headingStyles[2]}>Preview</h1>
            <div>
              {parse(result)}
            </div>
          </div>
        </div>
      </Layers>
    </>
  );
};

export default MarkDownEditor;
