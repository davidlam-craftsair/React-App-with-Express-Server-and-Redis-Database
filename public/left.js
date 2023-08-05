function Left(props) {
  return (
    <>
      <aside>
        <PlusMinus section="left" handle={props.handle}></PlusMinus>
        <div className="section">Left:{props.data.left}</div>
        <Data data={props.data}></Data>
      </aside>
    </>
  );
}
