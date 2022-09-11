// import { library, dom } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//
// import '@fortawesome/fontawesome-svg-core/styles.css';

export default function Icon(props) {
  // library.add(fas, fab);
  // dom.watch();

  return (
    <div className="icon-wrapper">
      <FontAwesomeIcon {...props} />
    </div>
  );
}
