FROM nginx:latest
RUN rm -rf /etc/ngnix/conf.d/default.conf
COPY ./nginx_conf/default.conf /etc/ngnix/conf.d/
COPY ./build/ /usr/share/nginx/html