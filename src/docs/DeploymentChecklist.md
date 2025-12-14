# Deployment Checklist (Backend Only)

- Set NODE_ENV=production
- Configure CORS_ORIGIN to your frontend domain (or allowed origin)
- Use strong JWT_SECRET (do not commit secrets)
- Use non-root DB user in production
- Enable HTTPS via reverse proxy (Nginx/Apache)
- Run tests: `npm test` (if you add full tests)
