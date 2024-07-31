import { Titled } from "react-titled";

export default function NotFound() {
  return (
    <div className="mx-auto mt-20 flex flex-col items-center justify-center gap-10 text-center text-6xl">
      <h1 className="text-primary">404</h1>
      <p className="text-xl">What You're Looking is not Here!</p>
      <Titled title="Not Found | Ray's Blog" />
    </div>
  );
}
