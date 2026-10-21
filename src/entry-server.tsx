import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';

export { site } from './data/profile';
export { llmsTxt, structuredData } from './seo';

/** Static HTML for `#root`, so crawlers that don't run JavaScript still see the content. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
