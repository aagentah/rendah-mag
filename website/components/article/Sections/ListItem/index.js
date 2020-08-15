export default function ListItem() {
  renderChildren = (child, i) => {
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

  const { text } = this.props;

  if (text[0].text) {
    return (
      <React.Fragment>
        <li className="db  t-body  lh-copy  f6  dark-grey">
          - {text.map((child, i) => this.renderChildren(child, i))}
        </li>
      </React.Fragment>
    );
  }
  return false;
}
