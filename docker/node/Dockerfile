# =============================================================================
# Node.js 22 Dockerfile for Vite Dev Server
# =============================================================================
# Why a separate container?
#   - Keeps Node.js out of the PHP image (smaller surface, no version clash).
#   - In production you would run 'npm run build' in CI and copy the output
#     into the Nginx container. This container is development-only.
# =============================================================================

FROM node:22-alpine

# ── Working directory ───────────────────────────────────────────────────────
# Must match the bind mount path in docker-compose so Vite can see the
# source files and write to public/build.
WORKDIR /var/www

# ── Expose Vite HMR port ───────────────────────────────────────────────────
EXPOSE 5173

# ── Default command ─────────────────────────────────────────────────────────
# 1. Install npm dependencies (skips if node_modules is up to date).
# 2. Start the Vite dev server in watch mode.
# Using 'sh -c' so we can chain commands.
CMD ["sh", "-c", "npm install && npm run dev"]
