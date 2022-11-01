import React, { FC, Fragment, useCallback, useRef, useEffect } from "react";
import { validationInput } from "../modules/functions";
import "../style/form.css";
type InputType = {
  id: string;
  type: "text" | "number";
  name: string;
  label?: string;
  data?: string;
};

interface BaseFromProps {
  refArr: InputType[];
  buttonLabel?: string;
  actionFunction: Function;
}

const BaseFrom: FC<BaseFromProps> = ({
  refArr = [],
  actionFunction,
  buttonLabel = "확인",
}) => {
  const inputRef = useRef<null | HTMLInputElement[]>([]);
  const submitHandler = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const obj: { [key: string]: string } = {};
      for (let i = 0; i < inputRef.current!.length; i++) {
        const { value, name } = inputRef.current![i];
        obj[name] = value;
      }
      actionFunction(obj);
    },
    [actionFunction],
  );

  useEffect(() => {
    for (let i = 0; i < inputRef.current!.length; i++) {
      inputRef.current![i].value = "";
    }
  }, [actionFunction]);

  return (
    <form id="base_form" onSubmit={submitHandler}>
      <div id="form_content">
        {refArr.map((refInfo, idx) => (
          <Fragment key={refInfo.id.toString()}>
            <label className="form_label" htmlFor={refInfo.id}>
              {refInfo.label}
            </label>
            <input
              className="form_input"
              id={refInfo.id}
              type={refInfo.type}
              name={refInfo.name}
              ref={(el: HTMLInputElement) => (inputRef.current![idx] = el)}
            />
          </Fragment>
        ))}
      </div>
      <button id="todo_form_Btn" type="submit">
        {buttonLabel}
      </button>
    </form>
  );
};

export default BaseFrom;
