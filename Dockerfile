FROM gcr.io/distroless/nodejs22-debian13:nonroot

WORKDIR /app

COPY --chown=nonroot:nonroot app ./app

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["app/server.js"]
