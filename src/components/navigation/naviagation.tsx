import { headingStyles } from "@/helpers/helpers";
import { Button } from "../common/shadcn/Button";

const Navigation = ()=>{
    return(<div className="flex justify-center p-2">
            <h1 className={headingStyles[1]}>Welcome to markdown editor</h1>
    </div>)
}
export default Navigation;