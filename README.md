# portfolio

## Stagewise Toolbar Integration

This project integrates the [Stagewise Toolbar](https://github.com/stagewise/stagewise) for AI-powered frontend coding with Cursor.

### Dev Setup
- Toolbar auto-injects in development mode (see `main.js`).
- To use: just run `npm run dev` and open your app in the browser with the Cursor extension enabled.

### Manual Setup Reference
- Install: `npm install -D @stagewise/toolbar`
- Inject in code:
  ```js
  import { initToolbar } from '@stagewise/toolbar';
  if (import.meta.env.MODE === 'development') {
    initToolbar({ plugins: [] });
  }
  ```
- Toolbar appears in bottom right during dev mode.

See [Stagewise GitHub](https://github.com/stagewise/stagewise) for more info.