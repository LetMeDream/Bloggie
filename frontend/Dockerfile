# /project/frontend/Dockerfile

# === ETAPA 1: Construcción (Build) ===
# Usa una imagen de Node para compilar la aplicación React
FROM node:20-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de definición de dependencias
COPY package.json package-lock.json ./
# O COPY yarn.lock .

# Instala las dependencias
RUN pnpm install

# Copia el código fuente
COPY . .

# Ejecuta el comando de build (asumiendo que tu script es 'npm run build')
# Esto crea la carpeta 'build' o 'dist' con los archivos estáticos
RUN pnpm build


# === ETAPA 2: Servir la Aplicación con Nginx ===
# Usa una imagen ligera de Nginx para servir el contenido estático
FROM nginx:alpine

# Copia tu configuración personalizada de Nginx
# Esto es CRUCIAL para que Nginx sepa cómo servir React y cómo hacer proxy a tu API de Django
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos de build estáticos de la etapa anterior al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# El puerto 80 es el puerto predeterminado de Nginx
EXPOSE 80

# El comando de inicio de Nginx es el predeterminado
CMD ["nginx", "-g", "daemon off;"]