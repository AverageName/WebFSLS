FROM ubuntu:18.04

RUN apt-get update && apt-get install -y
RUN apt-get install -y python3.7 \
                        python3-pip \
                        wget

RUN pip3 install torch==1.7.0+cpu torchvision==0.9.0+cpu -f https://download.pytorch.org/whl/torch_stable.html
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
