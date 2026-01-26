import { useNavigate, useParams } from "react-router-dom";

export const useStep = () => {
  const navigate = useNavigate();
  const { step } = useParams();

  const changeStep = (step) => {
    if (step < 0) step = 0;

    const path = `../${step}`;
    navigate(path, { relative: "path" });
  };

  return {
    step: Math.max(0, Math.floor(Number(step)) || 0),
    changeStep,
  };
};
