FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Install additional dependencies for your portfolio
RUN npm install bootstrap@5.3.3 \
    font-awesome@4.7.0 \
    @fortawesome/fontawesome-free \
    react-scroll \
    aos

# Copy all files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]