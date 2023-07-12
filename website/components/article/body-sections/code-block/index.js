import LazyLoad from 'react-lazyload';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/a11y-light.css';

hljs.registerLanguage('javascript', javascript);

export default function CodeBlock({ section, language, code }) {
  console.log('language', language);
  const myHtml = hljs.highlight(code, { language }).value;

  return (
    <LazyLoad once offset={250} height={360}>
      <div className="flex  flex-wrap  ph4  pb4">
        <div className="col-6" />
        <div className="col-24  col-12-md  flex  justify-center">
          <pre className="w-100">
            <code dangerouslySetInnerHTML={{ __html: myHtml }} />
          </pre>
        </div>
        <div className="col-6" />
      </div>
    </LazyLoad>
  );
}
