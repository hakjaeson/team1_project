import { FadeLoader } from "react-spinners";
import { ColorStyle } from "../../styles/common/CommonStyle";

const MenuListWireframe = () => {
  const laodingCss = {
    position: "relative",
    width: "160px",
    height: "160px",
    background: "rgba(255,255,255,0.8)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    boxShadow: " 4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  };
  return (
    <div style={laodingCss}>
      <FadeLoader color={ColorStyle.g200} loading={true} />
    </div>
  );
};

export default MenuListWireframe;
