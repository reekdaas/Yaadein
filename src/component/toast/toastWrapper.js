import { Toaster } from "react-hot-toast";

export default function ToastWrapper() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 20,
          right: 20,
        }}
      />
    </>
  );
}
