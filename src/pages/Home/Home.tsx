import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import { Titled } from "react-titled";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative mb-48 mt-8 flex max-w-6xl flex-col items-center justify-center gap-12 transition-all duration-300 ease-in-out sm:mt-10 md:mx-auto md:mt-0 lg:mt-20">
      <div className="">
        <div className="absolute left-[8%] top-12 -z-30 h-[32rem] w-56 -rotate-[30deg] rounded-full bg-primary opacity-40 blur-[72px] filter dark:opacity-30 lg:left-[18%]"></div>
        <div className="absolute left-[45%] -z-30 h-[30rem] w-28 -rotate-[30deg] rounded-full bg-destructive opacity-50 blur-[72px] filter dark:opacity-45 lg:left-[70%]"></div>

        <div className="absolute left-[35%] top-20 -z-30 h-[20rem] w-28 rotate-[45deg] rounded-full bg-purple-600 opacity-50 blur-[72px] filter dark:opacity-45 lg:left-[50%]"></div>
      </div>
      <div className="flex flex-col items-center justify-center text-center text-5xl font-extrabold md:gap-4 lg:text-6xl">
        <h1>Welcome to </h1>
        <h1>
          Ray Maschine's <span className="hidden md:inline-flex">Blog</span>
        </h1>
        <h1 className="flex md:hidden">Blog</h1>
      </div>
      <div className="flex w-10/12 flex-col items-center gap-5 text-center text-lg">
        <p className="max-w-[100ch] text-foreground dark:text-muted-foreground">
          Hi, I'm a music producer and mixing engineer. Find music news, song
          reviews, tutorials and my own unique topics here.
        </p>
        <p className="text-foreground dark:text-muted-foreground">
          Built by <span className="font-semibold">Oğuzhan Uysal</span> with
          using{" "}
          <span className="text-primary">
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
          </span>
          ,{" "}
          <span className="text-primary">
            <a
              href="https://tanstack.com/query/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tanstack Query
            </a>
          </span>
          ,{" "}
          <span className="text-primary">
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tailwind
            </a>
          </span>{" "}
          and{" "}
          <span className="text-primary">
            <a
              href="https://ui.shadcn.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shadcn
            </a>
          </span>
          .
        </p>
      </div>
      <div className="flex gap-4">
        <a
          href="https://github.com/lawuysal/music-blog-frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="flex gap-2" variant={"secondary"}>
            <BsGithub className="size-5" /> Project Repository
          </Button>
        </a>
        <Button onClick={() => navigate("/article-gallery")}>
          Go to Articles
        </Button>
      </div>
      <Titled title="Ray's Blog" />
    </div>
  );
}
