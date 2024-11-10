import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";

export default function LoadingBar({ text }: { text?: string }) {
  const [explanation, setExplanation] = useState<React.ReactNode>(null);

  useEffect(() => {
    const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));
    wait().then(() => {
      setExplanation(
        <>
          <p>This can take a little longer because of the database startup.</p>
          <p>Try refreshing after 1 minute(s).</p>
        </>,
      );
    });
  }, []);

  return (
    <div className="mt-40 flex flex-col items-center justify-center">
      <Bars
        height="80"
        width="80"
        color="#3B82F6"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <div className="mx-auto mt-8 flex items-center justify-center text-center uppercase">
        <p>{text}</p>
      </div>
      <div className="mx-auto mt-8 flex w-10/12 flex-col items-center justify-center text-center text-primary">
        {explanation}
      </div>
    </div>
  );
}
