
import { useEffect, useState } from "react";
import "./styles.css";

interface props {
  value?: string;
  onChange?: (value: string) => void;
}
export default function App() {
  const [value, setValue] = useState<string>("受控");

  const Input = ({ value, onChange }: props) => {
    const [privateValue, setPrivateValue] = useState<string | undefined>(value);
    useEffect(() => {
      setPrivateValue(value);
    }, [value]);

    return (
      <input
        value={privateValue}
        onChange={(e) => {
          onChange?.(e.target.value);
          if (!value) {
            setPrivateValue(e.target.value);
          }
        }}
      />
    );
  };

  return (
    <div className="App">
      {/* 非受控 */}
      <Input />

      {/* 受控 */}
      <Input
        value={value}
        onChange={(curValue) => {
          const ret = curValue.replace(/[^0-9]/gi, "");
          setValue(ret);
        }}
      />

      {/* 非受控 */}
      {/* <input
        defaultValue="name:"
        onChange={(e) => {
          console.log(e.target.value);
        }}
      /> */}

      {/* 受控 */}
      {/* <input
        value={value}
        onChange={(e) => {
          console.log(e.target.value);
          const ret = e.target.value.replace(/[^0-9]/gi, "");
          setValue(ret);
        }}
      /> */}
    </div>
  );
}

