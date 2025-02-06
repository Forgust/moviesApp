import React, { createRoot } from 'react-dom/client';
import { Offline, Online } from 'react-detect-offline';

import { ErrorNetwork } from './components/error/error';
import App from './app';

const root = createRoot(document.getElementById('root'));
const Page = () => {
  return (
    <>
      <Online>
        <App />
      </Online>
      <Offline>
        <ErrorNetwork />
      </Offline>
    </>
  );
};

root.render(<Page />);
