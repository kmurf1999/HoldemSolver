import React, { ReactElement } from "react";
import Matrix from "./Matrix";
import { ComboState } from "../redux/range/types";

type Props = {
  combo: Array<{ element: ReactElement; state: ComboState }>;
  selectElement: (index: number) => void;
  deselectElement: (index: number) => void;
};
const SuitMatrix: React.FC<Props> = ({
  combo,
  selectElement,
  deselectElement,
}) => {
  return (
    <Matrix
      selectElement={selectElement}
      deselectElement={deselectElement}
      elements={combo.map((c) => c.element)}
      states={combo.map((c) => c.state)}
      width={"312px"}
      height={"194px"}
      rows={4}
      cols={4}
    />
  );
};

export default SuitMatrix;
