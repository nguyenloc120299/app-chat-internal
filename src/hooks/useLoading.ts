import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { setLoading } from "store/app";
type LoadingType = {
  type: string;
  value: boolean;
};
export const useLoading = (type: string) => {
  const isLoading = useAppSelector((state) => state.app.loading) as any;
  return useMemo(() => isLoading[type], [isLoading, type]);
};

export const useFnLoading = () => {
  const dispatch = useAppDispatch();

  const handleSetIsLoading = useCallback(({ type, value }: LoadingType) => {
    dispatch(setLoading({ type, value }));
  }, []);

  return {
    onLoading: handleSetIsLoading,
  };
};
