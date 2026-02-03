import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const openaiApiKey = process.env.OPENAI_API_KEY;
const firefliesApiKey = process.env.FIREFLIES_API_KEY;
const geminiApiKey = process.env.GEMINI_API_KEY;

// Auth Configuration
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

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

// Login Endpoint - Use express.json() specifically here to avoid interfering with proxies
app.post('/api/login', express.json(), (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.use(
  '/api/openai',
  authenticateToken,
  createProxyMiddleware({
    target: 'https://api.openai.com',
    changeOrigin: true,
    secure: true,
    pathRewrite: (path) => path.replace(/^\/api\/openai/, ''),
    onProxyReq: (proxyReq) => {
      // Add User-Agent to avoid blocking by some APIs/Firewalls
      proxyReq.setHeader('User-Agent', 'BrainStudioMinutes/1.0');

      if (openaiApiKey) {
        proxyReq.setHeader('Authorization', `Bearer ${openaiApiKey}`);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      if (proxyRes.statusCode === 401 || proxyRes.statusCode === 403) {
        proxyRes.statusCode = 502;
        console.error(`[Proxy] OpenAI API ${proxyRes.statusCode} - Converting to 502 to avoid frontend logout`);
      }
    },
  })
);

app.use(
  '/api/fireflies',
  authenticateToken,
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
        if (proxyRes.statusCode === 401 || proxyRes.statusCode === 403) {
            proxyRes.statusCode = 502;
            console.error(`[Proxy] Fireflies API ${proxyRes.statusCode} - Converting to 502 to avoid frontend logout`);
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
  authenticateToken,
  createProxyMiddleware({
    target: 'https://generativelanguage.googleapis.com',
    changeOrigin: true,
    secure: true,
    pathRewrite: (path) => path.replace(/^\/api\/gemini/, ''),
    onProxyReq: (proxyReq) => {
      // Add User-Agent to avoid blocking by some APIs/Firewalls
      proxyReq.setHeader('User-Agent', 'BrainStudioMinutes/1.0');

      if (geminiApiKey) {
        proxyReq.setHeader('x-goog-api-key', geminiApiKey);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      if (proxyRes.statusCode === 401 || proxyRes.statusCode === 403) {
        proxyRes.statusCode = 502;
        console.error(`[Proxy] Gemini API ${proxyRes.statusCode} - Converting to 502 to avoid frontend logout`);
      }
    },
  })
);

app.listen(port, () => {
  console.log(`[minutes-backend] Proxy listening on port ${port}`);
});
