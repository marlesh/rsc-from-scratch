import { createServer } from "http";
import { renderJSXToHTML } from "./utils/renderJSX.js";

import App from "./views/layout.js";
import router from "./router/index.js";


createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const page = await router(url);
    sendHTML(res, <App>{page}</App>);
  } catch (err) {
    console.error(err);
    res.statusCode = err.statusCode ?? 500;
    res.end();
  }
}).listen(8080);

function sendHTML(res, jsx) {
  const html = renderJSXToHTML(jsx);
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}