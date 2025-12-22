#  Base image (lightweight Node.js)
FROM node:20-alpine

#  Set working directory inside container
WORKDIR /app

#  Copy package files first (for caching)
COPY package.json package-lock.json* ./

#  Install dependencies
RUN npm install --legacy-peer-deps

#  Copy rest of the project files
COPY . .

#  Build the Next.js app
RUN npm run build

#  Expose port (Next.js runs on 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
