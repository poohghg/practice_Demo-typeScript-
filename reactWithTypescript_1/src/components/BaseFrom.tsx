import React, { FC, Fragment, useRef } from "react";

type InputType = {
  id: string;
  label?: String;
  type: "text" | "number";
};

interface BaseFromProps {
  submitHandler: () => void;
  buttonLabel: string;
  refArr: InputType[];
}

const BaseFrom: FC<BaseFromProps> = ({
  refArr = [],
  submitHandler,
  buttonLabel = "확인",
}) => {
  const inputRef = useRef<null | HTMLInputElement[]>([]);
  return (
    <form id="todo_form" onSubmit={submitHandler}>
      <div>
        {refArr.map((refInfo, idx) => (
          <Fragment key={refInfo.id.toString()}>
            <label htmlFor={refInfo.id}>
              {refInfo.label}
              {/* {refInfo.label ? refInfo.label : null} */}
            </label>
            <input
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
