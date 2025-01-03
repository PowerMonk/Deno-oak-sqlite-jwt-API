# Use the official Deno image based on Alpine Linux
FROM denoland/deno:alpine

# create a user with permissions to run the app
# -S -> create a system user
# -G -> add the user to a group
# This is done to avoid running the app as root
# If the app is run as root, any vulnerability in the app can be exploited to gain access to the host system
# It's a good practice to run the app as a non-root user
RUN addgroup app && adduser -S -G app app

# Set the user to run the app
USER app

# Set the working directory inside the container to /app
WORKDIR /app

# Set DENO_DIR to a writable directory
ENV DENO_DIR=/app/.deno

# Ensure the directory exists and is owned by the app user
RUN mkdir -p ${DENO_DIR} && chown -R app:app ${DENO_DIR}

# Copy deno.json and deno.lock to the working directory (if they exist)
COPY deno*.json ./

# sometimes the ownership of the files in the working directory is changed to root
# and thus the app can't access the files and throws an error -> EACCES: permission denied
# to avoid this, change the ownership of the files to the root user
USER root

# change the ownership of the /app directory to the app user
# chown -R <user>:<group> <directory>
# chown command changes the user and/or group ownership of for given file.
# RUN chown -R app:app .

# change the user back to the app user
USER app

# Copy the rest of the files from the current directory to the working directory in the container
COPY . .

# Cache dependencies to speed up subsequent builds
# Replace [filename].ts with your entry point file
RUN deno cache main.ts

# Expose port 8000 to allow external access to the application
EXPOSE 8000

# Command to run the application
# "deno task dev-server" should be defined in your deno.json file
CMD ["deno", "task", "server"]