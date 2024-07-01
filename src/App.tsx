import { Button } from "./components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ThemeProvider } from "@/components/theme-provider";
// import { ModeToggle } from "./components/mode-toggle";

export default function App() {
  const { toast } = useToast();
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="mt-20 flex items-center justify-center">
        {/* <ModeToggle /> */}
        <Button
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            });
          }}
        >
          A Nice Shad button
        </Button>
      </div>
    </ThemeProvider>
  );
}
