import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { buttonVariants } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe } from "lucide-react";
import { BsInstagram, BsSpotify } from "react-icons/bs";
import { Titled } from "react-titled";

export default function About() {
  return (
    <div className="relative flex h-[35rem] max-w-6xl items-center justify-center transition-all duration-300 ease-in-out md:mx-auto md:mt-10">
      <div className="absolute left-[8%] top-16 -z-30 h-[32rem] w-56 -rotate-[30deg] rounded-full bg-primary opacity-40 blur-[72px] filter dark:opacity-30 lg:left-[18%]"></div>
      <div className="absolute left-[45%] -z-30 h-[30rem] w-28 -rotate-[30deg] rounded-full bg-destructive opacity-50 blur-[72px] filter dark:opacity-45 lg:left-[70%]"></div>

      <div className="absolute left-[35%] top-20 -z-30 h-[20rem] w-28 rotate-[45deg] rounded-full bg-purple-600 opacity-50 blur-[72px] filter dark:opacity-45 lg:left-[50%]"></div>
      <Card className="mt-28 flex w-10/12 max-w-screen-lg flex-col items-center justify-center shadow-black/10 drop-shadow-xl dark:shadow-white/10 sm:mt-0 md:w-[75%]">
        <CardHeader className="mt-8 flex items-center justify-center pb-4">
          <Avatar className="absolute -top-12 aspect-square h-24 w-24 rounded-full object-cover grayscale-[0%]">
            <AvatarImage src="author-image.webp" alt="image-of-the-author" />
            <AvatarFallback className="bg-primary">OU</AvatarFallback>
          </Avatar>
          <CardTitle className="text-center">Ray Maschine</CardTitle>
          <CardDescription className="font-normal text-primary">
            Electronic Music Producer and Mixing Engineer
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 pb-4 text-center">
          <p>
            Hi, I'm a multi-genre producer - synthwave, chillwave, synth-pop,
            techno, house - and mixing engineer.
          </p>
          <p>
            I released the{" "}
            <a
              href="https://open.spotify.com/intl-tr/album/309HcUrmehYVurhYlnYapX?si=d3hpePMlSruhOD_rYi7_8g"
              className="text-primary"
            >
              Latewave EP
            </a>{" "}
            in 2021 under the name of Ray Maschine for the first time.
          </p>
          <p>
            After then, I mixed and co-produced the songs in the{" "}
            <a
              href="https://open.spotify.com/intl-tr/album/7wTZbZ61GoEiZNUHmtB72f?si=ewrQ0Ko5RHymvpVTHg0UOQ"
              className="text-primary"
            >
              No More Dreams{" "}
            </a>
            album by{" "}
            <a
              href="https://open.spotify.com/intl-tr/artist/7rQ4hTnAiIVbswZfrAR132?si=ec6K7OfzSB2LNjAZezhbbA"
              className="text-primary"
            >
              Wicked Dream
            </a>
            .
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://open.spotify.com/intl-tr/artist/4iFOuAxHxvkcf01hFbLOE6?si=PgjIvcxtThGhjWZQ-aqUeg"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Spotify icon</span>
              <BsSpotify size={22} />
            </a>
            <a
              rel="noreferrer noopener"
              href="https://twitter.com/theraymaschine"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">X icon</span>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-foreground"
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
            <a
              rel="noreferrer noopener"
              href="https://instagram.com/theraymaschine"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">X icon</span>
              <BsInstagram size={22} />
            </a>

            <a
              rel="noreferrer noopener"
              href="https://linktr.ee/raymaschine"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Website icon</span>
              <Globe />
            </a>
          </div>
        </CardFooter>
      </Card>
      <Titled title="About | Ray's Blog" />
    </div>
  );
}
