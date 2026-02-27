FROM postgres:latest@sha256:55586516b2fd477faa8f0f05ec0a72b196fb7e2bce8df3adfb9c6a0ed607214f

RUN cd /var/lib/postgresql/ && \
    openssl req -new -text -passout pass:abcd -subj /CN=localhost -out server.req -keyout privkey.pem && \
    openssl rsa -in privkey.pem -passin pass:abcd -out server.key && \
    openssl req -x509 -in server.req -text -key server.key -out server.crt && \
    chmod 600 server.key && \
    chown postgres:postgres server.key

CMD ["postgres", "-c", "ssl=on", "-c", "ssl_cert_file=/var/lib/postgresql/server.crt", "-c", "ssl_key_file=/var/lib/postgresql/server.key" ]
