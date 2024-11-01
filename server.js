import { createServer } from "http";
import { readFile } from "fs/promises";
import { renderJSXToHTML } from "./utils/renderJSX.js";

createServer(async (_, res) => {
  const author = "Jae Doe";
  const postContent = await readFile("./posts/sample.txt", "utf8");
  sendHTML(
    res,
    <html>
      <head>
        <title>My blog</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <hr />
        </nav>
        <article>{postContent}</article>
        <footer>
          <hr />
          <p>
            <i>
              (c) {author} {new Date().getFullYear()}
            </i>
          </p>
        </footer>
      </body>
    </html>
  );
}).listen(8080);

function sendHTML(res, jsx) {
  const html = renderJSXToHTML(jsx);
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}