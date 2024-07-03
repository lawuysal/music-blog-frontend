import { Bars } from "react-loader-spinner";

export default function LoadingBar() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Bars
        height="80"
        width="80"
        color="#3B82F6"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
