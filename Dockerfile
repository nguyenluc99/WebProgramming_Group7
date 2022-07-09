FROM node:16

ARG USERNAME=webUser
ARG USER_UID=1001
ARG USER_GID=$USER_UID

# Create app directory
WORKDIR /app

COPY . /app

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get update \
    && apt install build-essential && apt install --yes vim \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    && chown -R $USERNAME .
USER $USERNAME

RUN whoami


RUN tar -xzf ./postgresql-14.0.tar.gz && \
    cd postgresql-14.0 && \
    ./configure --prefix=$PWD/library --enable-cassert --enable-debug CFLAGS="-O0 -g -fno-omit-frame-pointer" && \
    make -j4 && make install && \
    cd ../

RUN npm install 

EXPOSE 3000
ENTRYPOINT USER=$USERNAME /app/start.sh
