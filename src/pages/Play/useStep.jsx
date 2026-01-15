import { useParams } from "react-router-dom";

export const useStep = () => {
  const { step } = useParams();

  return Math.max(0, Math.floor(Number(step)) || 0);
};
