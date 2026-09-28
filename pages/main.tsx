// Static entry for GitHub Pages: renders the same page without the vinext server.
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '../app/globals.css';
import '../app/site.css';
import Home from '../app/page';

createRoot(document.getElementById('root')!).render(<StrictMode><Home/></StrictMode>);
