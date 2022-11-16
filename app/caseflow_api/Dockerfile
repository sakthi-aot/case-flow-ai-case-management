#Author: Kurian Benoy
FROM python:3.10.8-slim

WORKDIR /caseflow/app

# install curl, gnupg2 and unzip
RUN  apt-get update \
  && apt-get install -y git

COPY requirements.txt .
ENV PATH=/venv/bin:$PATH

RUN : \
    && python3 -m venv /venv \
    && pip install --upgrade pip \
    && pip install -r requirements.txt 

ADD . /caseflow/app
RUN pip install -e .

RUN apt install -y curl

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

RUN apt -y install nodejs

EXPOSE 5000
COPY wait-for-service.sh /wait-for-service.sh

RUN chmod u+x ./entrypoint.sh

ENTRYPOINT ["/bin/sh", "entrypoint.sh"]
