import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Article() {
  const markii = `## 1. Introduction
  Music production is a complex and multifaceted process that involves a blend of creativity, technical skills, and artistic vision. While technology has made certain aspects more accessible, the intricacies of crafting a compelling piece of music remain profound.

  ## 2. Main Topic
  At its core, \`music production\` encompasses a variety of stages,
  including composition, recording, mixing, and mastering. Each of
  these stages requires a distinct set of skills and a deep
  understanding of both musical theory and audio engineering. For
  instance, the composition phase demands creativity and an ability to
  convey emotions through melodies and harmonies. Recording involves
  capturing the best performance with the right equipment, while
  mixing and mastering refine the sound to achieve a polished final
  product.

  Moreover, the subjective nature of music adds another layer of
  complexity. What resonates with one person may not have the same
  effect on another, making it challenging to create universally
  appealing music. Producers must constantly balance technical
  precision with artistic intuition to craft pieces that are both
  technically sound and emotionally engaging.

  ### 2.1 Technological Advances
  While advancements in technology have democratized access to music
  production tools, they have also introduced new challenges. Software
  and hardware updates require continuous learning and adaptation.
  Additionally, the sheer number of available tools and plugins can be
  overwhelming, necessitating producers to make informed choices about
  which ones best suit their needs.

  ## 3. Conclusion
  In conclusion, the complexity of music production lies in its
  combination of technical expertise and creative artistry. Despite
  technological advancements making tools more accessible, the nuanced
  nature of creating music that resonates on an emotional level
  ensures that music production cannot be simplified. It remains a
  craft that requires dedication, continuous learning, and an
  unwavering passion for the art form.
  `;

  const mdJson = JSON.stringify(markii);
  const markbaba = JSON.parse(mdJson);

  return (
    <main className="mx-auto mb-48 grid w-10/12 max-w-screen-xl grid-cols-1 items-center justify-center justify-items-center">
      {/* <aside></aside> */}
      <article className="flex max-w-screen-xl flex-col gap-12 md:w-3/5">
        <header className="mt-10 flex max-w-screen-2xl flex-col items-center justify-center gap-10 md:mt-20">
          <div className="flex items-center justify-center self-start">
            <h1 className="text-center text-4xl font-semibold md:text-left md:text-6xl">
              Why Music Production Can't Be Simplified
            </h1>
          </div>
          <div className="flex flex-col items-start justify-center self-start text-sm text-muted-foreground md:text-base">
            <p>Author: Ray Maschine</p>
            <time dateTime="2024-07-01">Published: July 1, 2024</time>
          </div>
          <div className="w-full object-cover">
            <img
              src="public\music-article-images\01.jpg"
              alt="music production"
              className="h-full w-full rounded-md object-cover ring-1"
            />
          </div>
        </header>

        <Markdown
          className="prose w-full dark:prose-invert"
          remarkPlugins={[remarkGfm]}
        >
          {markbaba}
        </Markdown>

        <footer className="flex flex-col gap-10">
          <div className="rounded-md bg-muted p-4 text-sm md:text-base">
            <p className="">
              Category: <a href="category-music.html">Music</a>
            </p>
            <p>
              Tags: <a href="tag-production.html">Production</a>,{" "}
              <a href="tag-music.html">Music</a>
            </p>
          </div>
          <div className="rounded-md bg-muted p-6">
            <h3 className="font-semibold">About the Author</h3>
            <div className="mt-8 flex flex-col items-center justify-center gap-8 md:gap-12 lg:flex-row">
              <img
                src="public\author-image.webp"
                alt="image-of-the-author"
                className="size-28 rounded-full md:size-32"
              />
              <p className="text-sm md:text-base">
                John Doe is a music producer with over a decade of experience in
                the industry. He has worked with numerous artists and enjoys
                sharing his insights on the creative process.
              </p>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
