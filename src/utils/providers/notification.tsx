import { notification } from "antd";
import { type ArgsProps } from "antd/es/notification";
import { createContext, type FC, type ReactNode, useContext } from "react";

export interface INotificationProps {
  error: (args: ArgsProps) => void;
  success: (args: ArgsProps) => void;
  warning: (args: ArgsProps) => void;
  info: (args: ArgsProps) => void;
}
const NotificationContext = createContext<INotificationProps | undefined>(
  undefined
);

export const useNotification = (): INotificationProps => {
  const result = useContext(NotificationContext);
  if (!result) throw new Error("error in config");
  return result;
};

export const NotificationProvider:FC<{children:ReactNode}> = ({children}) => {
  const [api, contextHolder] = notification.useNotification();
  const action = {
    error: (args: ArgsProps) => api.error(args),
    success: (args: ArgsProps) => api.success(args),
    warning: (args: ArgsProps) => api.warning(args),
    info: (args: ArgsProps) => api.info(args),
  };
  return (
    <NotificationContext.Provider value={{...action}}>
      {children}
      {contextHolder}
    </NotificationContext.Provider>
  );
}