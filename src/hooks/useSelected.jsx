import { useNavigate, useParams } from "react-router-dom";

export const useSelected = () => {
  const navigate = useNavigate();
  const { selected } = useParams();

  const changeSelected = (selected) => {
    if (selected < 0) selected = 0;

    const path = `../${selected}`;
    navigate(path, { relative: "path" });
  };

  return {
    step: Math.max(0, Math.floor(Number(selected)) || 0),
    changeSelected,
  };
};
