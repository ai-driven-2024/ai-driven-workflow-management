Installation and Requirements
For this set-up we assume you already have node.js and npm, yarn or pnpm already installed. The React Flow package is published under @xyflow/react on npm and installable via:

npm install @xyflow/react

Now you can import the React Flow component and the styles in your application:

import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
Hit the ground running
To get folks building quickly, we have a template repository on GitHub that uses Vite and TypeScript – we use this set up for all our own React Flow work! You can find the template here.

To use it, you can either create a new repository from the template, or use degit to grab the template's files without the git history:

npx degit xyflow/vite-react-flow-template your-app-name
Prior Experience Needed
React Flow is a React library. That means React developers will feel comfortable using it. If basic React terms and concepts like states, props, components, and hooks are unfamiliar to you, you might need to learn more about React before being able to use React Flow fully. If you’ve never used React before, we recommend first getting to start on React through tutorials like Codecademy or Reactjs.org.

