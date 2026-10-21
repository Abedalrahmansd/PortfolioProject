# Portfolio: site/ served by Caddy on :8080, rendered with Caddy's templates (no build step).
# Deployed by the server when main moves (infra: scripts/autodeploy.sh).
FROM caddy:2-alpine
# The image lets caddy bind ports below 1024 through a file capability; our containers
# drop every capability, and Linux then refuses to start such a binary ("operation not
# permitted"). Port 8080 needs none, so remove it.
RUN apk add --no-cache libcap && setcap -r /usr/bin/caddy && apk del libcap
COPY Caddyfile /etc/caddy/Caddyfile
COPY site /srv
# Asset version for cache busting (?v=…): a hash of everything served, so a deploy that
# changes any file gives browsers new URLs, and one that changes nothing keeps the cache.
RUN find /srv -type f | sort | xargs cat | md5sum | cut -c1-10 > /srv/_partials/version.txt
EXPOSE 8080
