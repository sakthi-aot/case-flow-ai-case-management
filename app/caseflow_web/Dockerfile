
FROM artifacts.developer.gov.bc.ca/redhat-access-docker-remote/ubi8/nginx-122 AS deployer


COPY ./build /usr/share/nginx/html
COPY ./nginx_conf/nginx.conf /etc/nginx/nginx.conf