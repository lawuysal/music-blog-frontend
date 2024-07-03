import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center">
      <p>Hello from home page</p>
      <Button onClick={() => navigate("/article")}>Article Page</Button>
    </div>
  );
}
