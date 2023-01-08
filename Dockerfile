FROM python:3.11.1-alpine3.17

# set work directory
WORKDIR /usr/src/eline-shop

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
  && apk add --no-cache postgresql-dev gcc python3-dev musl-dev libffi-dev \
  # install dependencies
  && pip install --upgrade pip

COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/eline-shop/entrypoint.sh
RUN chmod +x /usr/src/eline-shop/entrypoint.sh

# copy project
COPY . .

# run entrypoint.sh
ENTRYPOINT ["/usr/src/eline-shop/entrypoint.sh"]
