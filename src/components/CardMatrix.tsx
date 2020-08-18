import React from "react";
import Matrix from "./Matrix";
import { ComboState } from "../redux/range/types";

type Props = {
  elements: Array<any>;
  states: ComboState[];
  selectElement: (index: number) => void;
  deselectElement: (index: number) => void;
};
type State = {};

const CardMatrix: React.FC<Props> = ({
  elements,
  states,
  selectElement,
  deselectElement,
}) => {
  return (
    <Matrix
      elements={elements}
      states={states}
      selectElement={selectElement}
      deselectElement={deselectElement}
      width={"624px"}
      height={"624px"}
      rows={13}
      cols={13}
    />
  );
};

export default CardMatrix;
