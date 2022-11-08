FROM nginx:latest
RUN rm -rf /etc/ngnix/nginx.conf
COPY ./nginx_conf/nginx.conf /etc/ngnix/nginx.conf
COPY ./build/ /usr/share/nginx/html