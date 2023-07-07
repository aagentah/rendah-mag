export default function ListItem({ text }) {
  const renderChildren = (child, i) => {
    if (child.marks) {
      if (child.marks.includes('stong') && child.marks.includes('em')) {
        return (
          <strong key={i} className="di">
            <em>{child.text}</em>
          </strong>
        );
      }
      if (child.marks.includes('strong')) {
        return (
          <strong key={i} className="di">
            {child.text}
          </strong>
        );
      }
      if (child.marks.includes('em')) {
        return (
          <em key={i} className="di">
            {child.text}
          </em>
        );
      }
    }

    return child.text;
  };

  if (text[0].text) {
    return (
      <div className="flex  flex-wrap  ph4  pb4">
        <div className="col-6" />
        <div className="col-24  col-12-md  flex  justify-center">
          <>
            <li className="db  t-secondary  lh-copy  f6  dark-grey">
              - {text.map((child, i) => renderChildren(child, i))}
            </li>
          </>
        </div>
        <div className="col-6" />{' '}
      </div>
    );
  }
  return false;
}
