function Right(props) {
  return (
    <>
      <aside>
        <PlusMinus section="right" handle={props.handle}></PlusMinus>
        <div className="section">Right:{props.data.right}</div>
        <Data data={props.data}></Data>
      </aside>
    </>
  );
}
