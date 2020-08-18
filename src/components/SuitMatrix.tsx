import React from "react";
import Matrix from "./Matrix";
import { ComboState } from "../redux/range/types";

type Props = {
  combo: Array<{ name?: string; state: ComboState }>;
};
const SuitMatrix: React.FC<Props> = ({ combo }) => {
  return (
    <Matrix
      elements={combo.map((c) => c.name)}
      states={combo.map((c) => c.state)}
      width={"312px"}
      height={"194px"}
      rows={4}
      cols={4}
    />
  );
};

export default SuitMatrix;
