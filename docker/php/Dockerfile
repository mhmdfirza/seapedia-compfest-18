# =============================================================================
# PHP 8.2-FPM Dockerfile for Seapedia
# =============================================================================
# Why PHP-FPM (not Apache mod_php)?
#   - PHP-FPM is a process manager that communicates with Nginx over FastCGI.
#   - Decoupling the web server from PHP lets each scale/restart independently.
#   - This mirrors production deployments on VPS and Kubernetes.
# =============================================================================

FROM php:8.2-fpm-bookworm AS base

# ── System dependencies ─────────────────────────────────────────────────────
# Each library is needed by a specific PHP extension:
#   libpng-dev, libjpeg-dev, libfreetype6-dev → gd (image manipulation)
#   libzip-dev                                → zip (Composer, Laravel)
#   libicu-dev                                → intl (internationalisation)
#   libonig-dev                               → mbstring (multibyte strings)
#   libexif-dev                               → exif (image metadata)
#   libsqlite3-dev                            → pdo_sqlite
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    unzip \
    git \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    libexif-dev \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

# ── PHP extensions ──────────────────────────────────────────────────────────
# Configure GD with JPEG and FreeType support before installing it.
RUN docker-php-ext-configure gd --with-freetype --with-jpeg

RUN docker-php-ext-install -j$(nproc) \
    pdo_mysql \
    pdo_sqlite \
    mbstring \
    bcmath \
    exif \
    pcntl \
    gd \
    zip \
    intl

# ── Redis extension (via PECL) ─────────────────────────────────────────────
# phpredis is faster than predis (pure-PHP) because it's a C extension.
RUN pecl install redis \
    && docker-php-ext-enable redis

# ── Composer (multi-stage copy) ─────────────────────────────────────────────
# Copying the binary from the official Composer image avoids installing
# Composer's own dependencies and keeps the layer cache efficient.
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# ── Non-root user ───────────────────────────────────────────────────────────
# Running as root inside containers is a security anti-pattern.
# We create a 'www' user whose UID/GID match the host user so that
# bind-mounted files have the correct ownership (no permission issues).
ARG UID=1000
ARG GID=1000

RUN groupadd -g ${GID} www \
    && useradd -u ${UID} -g www -m -s /bin/bash www

# ── Working directory ───────────────────────────────────────────────────────
WORKDIR /var/www

# ── Fix storage/cache permissions ───────────────────────────────────────────
# Laravel needs to write to storage/ and bootstrap/cache/.
# We create these dirs and chown them so the non-root user can write.
RUN mkdir -p storage/framework/{sessions,views,cache} \
    storage/logs \
    bootstrap/cache \
    && chown -R www:www storage bootstrap/cache

# ── Switch to non-root user ────────────────────────────────────────────────
USER www

EXPOSE 9000

CMD ["php-fpm"]
