import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { setCallback } from "store/app";
type Callback_Type = {
  type: string;
  value: boolean;
};
export const useCallBackApi = (type: string) => {
  const isCallback = useAppSelector((state) => state.app.isCallBack) as any;
  return useMemo(() => isCallback[type], [isCallback, type]);
};

export const useFnCallbackApi = () => {
  const dispatch = useAppDispatch();

  const handleSetIsCallBack = useCallback(({ type, value }: Callback_Type) => {
    dispatch(setCallback({ type, value }));
  }, []);

  return {
    onCallback: handleSetIsCallBack,
  };
};
