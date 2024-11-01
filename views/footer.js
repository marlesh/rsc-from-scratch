export default function Footer (props) {
  return (
    <footer>
      <hr />
      <p>
        <i>
          {props.children}
        </i>
      </p>
    </footer>
  )
}