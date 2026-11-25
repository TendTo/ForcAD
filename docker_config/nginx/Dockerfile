FROM node:24-alpine AS build
COPY --from=ghcr.io/pnpm/pnpm:12-alpine /opt/pnpm /opt/pnpm
RUN for bin in pnpm pn pnpx pnx; do ln -s "/opt/pnpm/$bin" "/usr/local/bin/$bin"; done

COPY front/package.json front/pnpm-lock.yaml front/pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY front/ .

RUN pnpm build

FROM nginx:1.31.10-alpine

COPY docker_config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker_config/nginx/http.conf.template /etc/nginx/http.conf.template

COPY docker_config/nginx/proxy_params /etc/nginx/proxy_params
COPY docker_config/nginx/proxy_params_ws /etc/nginx/proxy_params_ws

COPY --from=build dist /var/www/front

ARG DNS_RESOLVER
ENV DNS_RESOLVER=${DNS_RESOLVER}
RUN envsubst '\${DNS_RESOLVER}' </etc/nginx/http.conf.template >/etc/nginx/http.conf
