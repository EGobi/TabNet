FROM jupyter/scipy-notebook

# Instalação das dependências
COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt

# Copia o notebook para a raiz do Jupyter. O comando EXPOSE é meramente informativo.
COPY . /home/jovyan/work/
EXPOSE 8888