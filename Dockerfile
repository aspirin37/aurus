# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/node:2.0-appservice
FROM nginx

RUN apt-get update && apt-get install -y jq

COPY dist/app /usr/share/nginx/html
COPY build/nginx-vue.config /etc/nginx/conf.d/default.conf

RUN chmod 755 /usr/share/nginx/html/dotenv.sh

# Execute the subsitution script and pass the path of the file to replace
ENTRYPOINT ["/usr/share/nginx/html/dotenv.sh", "/usr/share/nginx/html/.env.example", "/usr/share/nginx/html/index.html"]
CMD ["nginx", "-g", "daemon off;"]
