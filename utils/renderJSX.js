import escapeHtml from "escape-html";

export function renderJSXToHTML(jsx) {
  if (typeof jsx === "string" || typeof jsx === "number") {
    return escapeHtml(jsx);
  }
  
  if (jsx == null || typeof jsx === "boolean") {
    return "";
  }
  
  if (Array.isArray(jsx)) {
    return jsx.map((child) => renderJSXToHTML(child)).join("");
  } 
  
  if (typeof jsx === "object") {
    if (jsx.$$typeof === Symbol.for("react.element")) {
      switch(typeof jsx.type) {
        case 'string':  
          return handleNativeHtmlTags(jsx);
        case 'function':  
          return handleJsxTags(jsx);
        default: throw new Error("Not implemented.")
      }
    } 
    throw new Error("Cannot render an object.");
  } 
   
  throw new Error("Not implemented.");
}

function handleNativeHtmlTags (jsx) {
  let html = "<" + jsx.type;
  for (const propName in jsx.props) {
    if (jsx.props.hasOwnProperty(propName) && propName !== "children") {
      html += " ";
      html += propName;
      html += "=";
      html += escapeHtml(jsx.props[propName]);
    }
  }
  html += ">";
  html += renderJSXToHTML(jsx.props.children);
  html += "</" + jsx.type + ">";
  return html
}

function handleJsxTags (jsx) {
  const Component = jsx.type;
  const props = jsx.props;
  const returnedJsx = Component(props);
  return renderJSXToHTML(returnedJsx);
}