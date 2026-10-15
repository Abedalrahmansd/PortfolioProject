# Portfolio (plain HTML/CSS/JS, no build step), served by a tiny Caddy on :8080.
# From infra/templates/Dockerfile.static; deployed by the server when main moves.
FROM caddy:2-alpine
# The image lets caddy bind ports below 1024 through a file capability; our containers
# drop every capability, and Linux then refuses to start such a binary ("operation not
# permitted"). Port 8080 needs none, so remove it.
RUN apk add --no-cache libcap && setcap -r /usr/bin/caddy && apk del libcap
COPY . /srv
RUN rm -f /srv/Dockerfile /srv/.dockerignore \
 && printf ':8080 {\n\troot * /srv\n\ttry_files {path} {path}.html {path}/ /index.html\n\tfile_server\n}\n' > /etc/caddy/Caddyfile
EXPOSE 8080
