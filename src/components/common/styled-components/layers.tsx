import { PropsWithChildren } from "react";

const Layers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">{children}</div>
    </>
  );
};
export default Layers;
