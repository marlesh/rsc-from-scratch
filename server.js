import { createServer } from "http";
import { readFile } from "fs/promises";
import { renderJSXToHTML } from "./utils/renderJSX.js";
import App from "./views/app.js";

createServer(async (_, res) => {
  const author = "Jae Doe";
  const postContent = await readFile("./assets/sample.txt", "utf8");
  sendHTML(
    res,
    <html>
      <head>
        <title>My blog</title>
      </head>
      <body>
        <App postContent={postContent} author={author} />
      </body>
    </html>
  );
}).listen(8080);

function sendHTML(res, jsx) {
  const html = renderJSXToHTML(jsx);
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}