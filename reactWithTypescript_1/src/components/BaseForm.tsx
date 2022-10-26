import React, { FC, Fragment, useCallback, useRef } from "react";
import { validationInput } from "../modules/functions";
import "../style/form.css";
type InputType = {
  id: string;
  type: "text" | "number";
  label?: String;
};

interface BaseFromProps {
  refArr: InputType[];
  submitHandler: () => void;
  buttonLabel?: string;
}

const BaseFrom: FC<BaseFromProps> = ({
  refArr = [],
  submitHandler,
  buttonLabel = "확인",
}) => {
  const inputRef = useRef<null | HTMLInputElement[]>([]);
  const todoSubmitHandler = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // const text = inputRef.current!.value;
    // const isValid = validationInput({ value: text, required: true });
    // console.log();
    // if (isValid) {
    //   // 함수로 넘기기
    //   inputRef.current!.value = "";
    // } else {
    //   alert("텍스트를 입력해주세요");
    //   inputRef.current!.focus();
    // }
  }, []);
  return (
    <form id="base_form" onSubmit={submitHandler}>
      <div id="form_content">
        {refArr.map((refInfo, idx) => (
          <Fragment key={refInfo.id.toString()}>
            <label htmlFor={refInfo.id} className="form_label">
              {refInfo.label}
              {/* {refInfo.label ? refInfo.label : null} */}
            </label>
            <input
              className="form_input"
              ref={(el: HTMLInputElement) => (inputRef.current![idx] = el)}
              type={refInfo.type}
              id={refInfo.id}
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
