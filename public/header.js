function Header(props) {
  return (
    <>
      <header>
        <PlusMinus section="header" handle={props.handle}></PlusMinus>
        <div className="header">Header:{props.data.header}</div>
        <Data data={props.data}></Data>
      </header>
    </>
  );
}
