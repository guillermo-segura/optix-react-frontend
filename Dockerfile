# Use a base image with Node.js pre-installed
FROM node:21-alpine3.18

# Set the working directory inside the container
WORKDIR /optix-react-frontend/

# Copy package.json and package-lock.json (if exists)
COPY package.json /optix-react-frontend/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]