FROM python:3.11-slim

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Copia los requerimientos e instálalos
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo el contenido de /backend a /usr/src/app
COPY . .

EXPOSE 8000

# bloggie es el nombre que veo en tu ruta de carpeta, cámbialo si tu wsgi.py está en otro lado
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]