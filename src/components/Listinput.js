import Input from "./Input";
import { memo } from "react";

const Listinput = ({ text, placeholder, onChange }) => {
    return (
      <div>
        <p>{text}</p>
        <Input placeholder={placeholder} onChange={onChange} />
      </div>
    );
  };

  export default memo(Listinput)
