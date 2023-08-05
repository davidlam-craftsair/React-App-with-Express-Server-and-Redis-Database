function Footer(props) {
  return (
    <>
      <footer>
        <PlusMinus section="footer" handle={props.handle}></PlusMinus>
        <div className="section">Footer:{props.data.footer}</div>
        <Data data={props.data}></Data>
      </footer>
    </>
  );
}
