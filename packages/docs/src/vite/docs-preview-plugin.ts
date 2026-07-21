import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from 'vite';

export function docsPreviewPlugin(basePath: string): Plugin {
  const segments = basePath.split('/').filter(Boolean);

  return {
    name: 'tinyrack-docs-preview',
    apply: (_config, environment) => environment.isPreview === true,
    config: () => ({ appType: 'mpa' }),
    configurePreviewServer(server) {
      const clientOutDir =
        server.config.environments['client']?.build.outDir ??
        server.config.build.outDir;
      const deploymentRoot = join(clientOutDir, ...segments);

      server.middlewares.use((request, response, next) => {
        if (basePath === '/') {
          next();
          return;
        }

        const url = new URL(request.url ?? '/', 'http://tinyrack.local');
        if (url.pathname === '/' || url.pathname === basePath) {
          response.statusCode = 302;
          response.setHeader('location', `${basePath}/${url.search}`);
          response.end();
          return;
        }
        if (url.pathname.startsWith(`${basePath}/`)) {
          url.pathname = `${basePath}${url.pathname}`;
          request.url = `${url.pathname}${url.search}`;
        }
        next();
      });

      return () => {
        server.middlewares.use((request, response, next) => {
          if (request.method !== 'GET' && request.method !== 'HEAD') {
            next();
            return;
          }
          if (!request.headers.accept?.includes('text/html')) {
            next();
            return;
          }

          const notFoundPath = join(deploymentRoot, '404.html');
          if (!existsSync(notFoundPath)) {
            next();
            return;
          }
          const source = readFileSync(notFoundPath);
          response.statusCode = 404;
          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.setHeader('content-length', String(source.byteLength));
          response.end(request.method === 'HEAD' ? undefined : source);
        });
      };
    },
  };
}
