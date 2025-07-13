### Set Up Script 
```
bash #!/bin/bash

# Update system packages
sudo yum update -y

# Install needed tooling
sudo yum install -y git
sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 22

# Pull in and navigate to project root
git clone https://github.com/xavierlmendez/portfolioWebsite.git
cd portfolioWebsite/xavis_projects

# Install npm dependencies
npm install

# Launch the application
npm run build
npm run start
```
