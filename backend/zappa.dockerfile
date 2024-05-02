FROM lambci/lambda:build-python3.8

LABEL maintainer="<remi.winter@outlook.com>"

WORKDIR /var/task

# Fancy prompt to remind you are in zappashell
RUN echo 'export PS1="\[\e[33m\]zappashell>\[\e[m\] "' >> /root/.bashrc

# Create and Activate the virtual environment 
RUN echo 'virtualenv -p python3 ./venv >/dev/null' >> /root/.bashrc
RUN echo 'source ./venv/bin/activate >/dev/null' >> /root/.bashrc
RUN echo "pip install -r requirements.txt" >> /root/.bashrc

# Additional RUN commands here
# RUN yum clean all && \
#    yum -y install <stuff>

# RUN yum -y update && yum -y install openjpeg-devel libjpeg-devel fontconfig-devel libtiff-devel libpng-devel cmake

# RUN curl https://poppler.freedesktop.org/poppler-22.06.0.tar.xz | tar xJv
# RUN cd poppler-22.06.0/ && cmake -DCMAKE_BUILD_TYPE=release && make -j 4 && make install

CMD ["bash"]