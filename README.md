### Set Up Script 
```
bash #!/bin/bash

# Update system packages
sudo yum update -y

# Install needed tooling
sudo yum install -y git
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash
sudo yum install -y nodejs
npm install -g npm@latest

# Pull in and navigate to project root
git clone https://github.com/xavierlmendez/portfolioWebsite.git
cd portfolioWebsite/xavis_projects

# Install npm dependencies
npm install

# Launch the application
npm run build
npm run start
```
