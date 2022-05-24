import { toast, ToastContent, TypeOptions } from "react-toastify";
// interface notificationProps {
//   message?: ToastContent;
//   type: TypeOptions;
// }

const Notify = (message?: ToastContent, type?: TypeOptions) => {
  toast(message, {
    type: type,
  });
};

export default Notify;
