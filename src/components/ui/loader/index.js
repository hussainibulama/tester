import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

function Loader({ size, color }) {
  const override = css`
    display: block;
    margin: 0;
    border-color: ${color};
    color: ${color};
  `;
  return <ClipLoader loading css={override} size={size} />;
}
Loader.defaultProps = {
  size: "20px",
  color: "white",
};

export default Loader;
