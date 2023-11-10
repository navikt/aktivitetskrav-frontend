FROM gcr.io/distroless/nodejs18-debian11@sha256:61bda9d564bf1a64a6108dc3e318cae214a3b732cf413cc32e10c7fa2dfcc828

WORKDIR /app

COPY package.json /app/
COPY .next/standalone /app/
COPY public /app/public/
COPY /.next/static ./.next/static

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]