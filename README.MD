## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 14.x)
- Docker (optional for containerization)
- Web3 wallet (MetaMask)

### Environment Setup
1. Copy the example environment configuration file:
   ```bash
   cp .env.example .env
   ```
2. Update the `.env` file with your configuration settings.

### Installing Dependencies
Run the following command to install all the necessary dependencies:
```bash
npm install
```

## Usage

### Building the Application
To create a production-ready build of the application, use the following command:
```bash
npm run build
```
This will generate an optimized version of the app in the `dist/` directory.


### Running the Application in Development
You can start the application using the following command:
```bash
npm start
```

### Running with Docker
To run the application using Docker:
1. Build the Docker image:
   ```bash
   docker build -t test-project-crypto .
   ```
2. Run the Docker container:
   ```bash
   docker run --env-file .env test-project-crypto 
   ```
