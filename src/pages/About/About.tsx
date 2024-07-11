import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { buttonVariants } from "@/components/ui/button";

import { Linkedin } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function About() {
  return (
    <div className="relative flex h-[35rem] max-w-6xl items-center justify-center md:mx-auto md:mt-0">
      <div className="absolute left-[8%] top-16 -z-30 h-[32rem] w-56 -rotate-[30deg] rounded-full bg-primary opacity-40 blur-[72px] filter dark:opacity-30 lg:left-[18%]"></div>
      <div className="absolute left-[45%] -z-30 h-[30rem] w-28 -rotate-[30deg] rounded-full bg-destructive opacity-50 blur-[72px] filter dark:opacity-45 lg:left-[70%]"></div>

      <div className="absolute left-[35%] top-20 -z-30 h-[20rem] w-28 rotate-[45deg] rounded-full bg-purple-600 opacity-50 blur-[72px] filter dark:opacity-45 lg:left-[50%]"></div>
      <Card className="flex w-10/12 max-w-screen-lg flex-col items-center justify-center shadow-black/10 drop-shadow-xl dark:shadow-white/10 md:w-[60%]">
        <CardHeader className="mt-8 flex items-center justify-center pb-4">
          <Avatar className="absolute -top-12 aspect-square h-24 w-24 rounded-full object-cover grayscale-[0%]">
            <AvatarImage
              src="public/author-image.webp"
              alt="image-of-the-author"
            />
            <AvatarFallback className="bg-primary">OU</AvatarFallback>
          </Avatar>
          <CardTitle className="text-center">Oğuzhan Uysal</CardTitle>
          <CardDescription className="font-normal text-primary">
            Senior Student Software Developer
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-4 text-center">
          <p>
            I am working on web applications using React, Node, and MongoDB.
          </p>
          <p>
            In my spare time, I also engage in music production and mixing
            engineering.
          </p>
          <p>
            I strive to address the challenges I encounter in my music hobby
            through the software I develop.
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://github.com/lawuysal"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Github icon</span>
              <GitHubLogoIcon className="h-5 w-5" />
            </a>
            <a
              rel="noreferrer noopener"
              href="https://twitter.com/lawuysal"
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
              href="https://www.linkedin.com/in/lawuysal"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
