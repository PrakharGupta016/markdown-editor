import { ClassificationType } from "typescript";
import { Textarea } from "./components/common/shadcn/TextArea";
import MarkDownEditor from "./components/markdown-editor/markdownEditor";
import Navigation from "./components/navigation/naviagation";



function App() {
  return (
    <div>
        <Navigation/>
        <MarkDownEditor/>
    </div> 
  );
}

export default App;
