import Nav from "./nav.js";
import Content from "./content.js";
import Footer from "./footer.js";

export default function App ({ postContent, author }) {
  return (
    <div>
      <Nav />
      <Content>{postContent}</Content>
      <Footer>
        (c) {author} {new Date().getFullYear()}
      </Footer>
    </div>
  )
}