import { useNavigate } from "react-router-dom";

export function useNavigateTransition() {
  const navigate = useNavigate();

  const navigateWithTransition = (to: string | number) => {
    if (!document.startViewTransition) {
      typeof to === "number" ? navigate(to) : navigate(to);
      return;
    }

    document.startViewTransition(() => {
      typeof to === "number" ? navigate(to) : navigate(to);
    });
  };

  return navigateWithTransition;
}
