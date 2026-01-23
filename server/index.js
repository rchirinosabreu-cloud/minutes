import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const openaiApiKey = process.env.OPENAI_API_KEY;
const firefliesApiKey = process.env.FIREFLIES_API_KEY;
const geminiApiKey = process.env.GEMINI_API_KEY;
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  : true;
const corsOptions = {
  origin: corsOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-goog-api-key'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

if (!openaiApiKey) {
  console.warn('[minutes-backend] OPENAI_API_KEY is not set. OpenAI proxy calls will fail.');
}

if (!firefliesApiKey) {
  console.warn('[minutes-backend] FIREFLIES_API_KEY is not set. Fireflies proxy calls will fail.');
}

if (!geminiApiKey) {
  console.warn('[minutes-backend] GEMINI_API_KEY is not set. Gemini proxy calls will fail.');
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(
  '/api/openai',
  createProxyMiddleware({
    target: 'https://api.openai.com',
    changeOrigin: true,
    secure: true,
    pathRewrite: (path) => path.replace(/^\/api\/openai/, ''),
    onProxyReq: (proxyReq) => {
      if (openaiApiKey) {
        proxyReq.setHeader('Authorization', `Bearer ${openaiApiKey}`);
      }
    },
  })
);

app.use(
  '/api/fireflies',
  createProxyMiddleware({
    target: 'https://api.fireflies.ai',
    changeOrigin: true,
    secure: true,
    pathRewrite: (path) => path.replace(/^\/api\/fireflies/, ''),
    onProxyReq: (proxyReq, req) => {
      // Add User-Agent to avoid blocking by some APIs/Firewalls (Cloudflare)
      proxyReq.setHeader('User-Agent', 'BrainStudioMinutes/1.0');
      proxyReq.setHeader('Content-Type', 'application/json');

      if (firefliesApiKey) {
        proxyReq.setHeader('Authorization', `Bearer ${firefliesApiKey}`);
      }

      // Log request details for debugging
      console.log(`[Proxy] Proxying ${req.method} request to: ${proxyReq.path}`);
    },
    onProxyRes: (proxyRes, req, res) => {
        if (proxyRes.statusCode >= 400) {
            console.error(`[Proxy] Fireflies API Error: ${proxyRes.statusCode} ${proxyRes.statusMessage}`);
        }
    },
    onError: (err, req, res) => {
      console.error('[minutes-backend] Fireflies Proxy Error:', err);
      res.status(500).send('Proxy Error');
    }
  })
);

app.use(
  '/api/gemini',
  createProxyMiddleware({
    target: 'https://generativelanguage.googleapis.com',
    changeOrigin: true,
    secure: true,
    pathRewrite: (path) => path.replace(/^\/api\/gemini/, ''),
    onProxyReq: (proxyReq) => {
      if (geminiApiKey) {
        proxyReq.setHeader('x-goog-api-key', geminiApiKey);
      }
    },
  })
);

app.listen(port, () => {
  console.log(`[minutes-backend] Proxy listening on port ${port}`);
});
