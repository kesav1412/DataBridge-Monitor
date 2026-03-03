import { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'admin-dashboard',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // Backend Next.js site with Fastify
      const backend = new NextjsSite(stack, 'backend', {
        path: 'packages/backend',
      });

      // Frontend Next.js site
      const frontend = new NextjsSite(stack, 'frontend', {
        path: 'packages/frontend',
        environment: {
          BACKEND_URL: backend.url || 'http://localhost:3001',
        },
      });

      // Output the URLs
      stack.addOutputs({
        FrontendUrl: frontend.url,
        BackendUrl: backend.url,
      });
    });
  },
} satisfies SSTConfig;
