# Heroku Deployment Guide for AWS Ubuntu 24 Server

> Complete step-by-step guide to deploy Node.js application to Heroku from a fresh AWS Ubuntu 24.04 LTS server.

**Repository**: [sarowar-alam/my-heroku-app](https://github.com/sarowar-alam/my-heroku-app)  
**Application**: Express.js web server with photo display  
**Target Platform**: Heroku  
**Server**: AWS EC2 Ubuntu 24.04 LTS

---

## Table of Contents
- [Prerequisites](#prerequisites)
- [Server Setup](#server-setup)
- [Installing Node.js and npm](#installing-nodejs-and-npm)
- [Installing Git](#installing-git)
- [Installing Heroku CLI](#installing-heroku-cli)
- [Cloning Your Repository](#cloning-your-repository)
- [Heroku Authentication](#heroku-authentication)
- [Creating a Heroku App](#creating-a-heroku-app)
- [Deploying to Heroku](#deploying-to-heroku)
- [Managing Your Heroku App](#managing-your-heroku-app)
- [Continuous Deployment](#continuous-deployment)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:
- An AWS account with an EC2 Ubuntu 24.04 LTS instance running
- SSH access to your Ubuntu server (PEM key or password)
- A Heroku account (sign up at https://signup.heroku.com/)
- A GitHub account with your repository accessible

**AWS EC2 Instance Requirements**:
- Instance Type: t2.micro or higher (free tier eligible)
- Security Group: Allow inbound SSH (port 22)
- Storage: At least 8GB
- Public IP address or domain name

---

## Server Setup

### Step 1: Connect to Your Ubuntu Server

Using your terminal or PuTTY, connect to your AWS Ubuntu server:

```bash
# If using PEM key (Linux/Mac/Windows PowerShell)
ssh -i /path/to/your-key.pem ubuntu@your-ec2-public-ip

# Example:
# ssh -i ~/Downloads/my-key.pem ubuntu@54.123.45.67
```

For Windows users using PuTTY:
1. Convert your .pem key to .ppk using PuTTYgen
2. In PuTTY, enter `ubuntu@your-ec2-public-ip`
3. Under Connection > SSH > Auth, browse to your .ppk file
4. Click Open

### Step 2: Update System Packages

Once connected, update your system:

```bash
# Update package list
sudo apt update

# Upgrade installed packages
sudo apt upgrade -y
```

This ensures all system packages are up to date.

---

## Installing Node.js and npm

### Option 1: Install Node.js LTS (Recommended)

Install Node.js 20.x (LTS version):

```bash
# Add NodeSource repository for Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js and npm
sudo apt install -y nodejs

# Verify installation
node --version    # Should show v20.x.x
npm --version     # Should show v10.x.x or higher
```

### Option 2: Install Latest Node.js

For the latest Node.js version:

```bash
# Add NodeSource repository for latest version
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -

# Install Node.js and npm
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### Option 3: Using NVM (Node Version Manager)

For flexibility in managing Node versions:

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js LTS
nvm install --lts

# Verify installation
node --version
npm --version
```

---

## Installing Git

Git should be pre-installed on Ubuntu 24, but let's verify and install if needed:

```bash
# Check if Git is installed
git --version

# If not installed, install Git
sudo apt install -y git

# Verify installation
git --version    # Should show git version 2.x.x
```

### Configure Git

Set up your Git identity:

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

---

## Installing Heroku CLI

### Method 1: Using Snap (Recommended for Ubuntu)

```bash
# Install Heroku CLI via snap
sudo snap install --classic heroku

# Verify installation
heroku --version
```

### Method 2: Using curl (Alternative)

```bash
# Download and run installation script
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh

# Verify installation
heroku --version
```

### Method 3: Using npm (Not Recommended)

```bash
# Install globally via npm
sudo npm install -g heroku

# Verify installation
heroku --version
```

---

## Cloning Your Repository

### Step 1: Navigate to Your Working Directory

```bash
# Create a directory for your projects
mkdir -p ~/projects
cd ~/projects
```

### Step 2: Clone Your Repository

```bash
# Clone your repository
git clone https://github.com/sarowar-alam/my-heroku-app.git

# Navigate into the repository
cd my-heroku-app

# List files to verify
ls -la
```

You should see:
- `server.js` - Main application file
- `package.json` - Dependencies and scripts
- `Procfile` - Heroku process definition
- `README.md` - Documentation
- `my_photo.jpg` - Image file
- `.gitignore` - Git ignore rules

### Step 3: Install Dependencies

```bash
# Install npm packages
npm install

# This will install Express.js as defined in package.json
```

### Step 4: Test Locally (Optional)

```bash
# Run the server locally
npm start

# Or
node server.js
```

The server should start on port 3000. Press `Ctrl+C` to stop.

---

## Heroku Authentication

### Step 1: Login to Heroku

```bash
# Login via browser
heroku login
```

This will:
1. Display a message asking you to press any key
2. Open your default browser
3. Prompt you to log in to Heroku
4. Authenticate your CLI session

**For headless servers (no browser)**:

```bash
# Login with credentials
heroku login -i

# Enter your Heroku email
# Enter your Heroku password or API token
```

### Step 2: Verify Authentication

```bash
# Check logged-in user
heroku auth:whoami

# List your Heroku apps
heroku apps
```

---

## Creating a Heroku App

### Step 1: Create a New Heroku App

```bash
# Create app with auto-generated name
heroku create

# OR create app with custom name
heroku create my-heroku-app-sarowar

# OR create app in specific region
heroku create my-heroku-app-sarowar --region eu
```

**Heroku Regions**:
- `us` - United States (default)
- `eu` - Europe

**App Name Requirements**:
- Must be unique across all Heroku apps
- Lowercase letters, numbers, and dashes only
- Cannot start or end with a dash

### Step 2: Verify App Creation

```bash
# List your apps
heroku apps

# Check app info
heroku apps:info

# View app URL
heroku open
```

### Step 3: Verify Git Remote

```bash
# Check remotes
git remote -v
```

You should see:
```
heroku  https://git.heroku.com/your-app-name.git (fetch)
heroku  https://git.heroku.com/your-app-name.git (push)
origin  https://github.com/sarowar-alam/my-heroku-app.git (fetch)
origin  https://github.com/sarowar-alam/my-heroku-app.git (push)
```

If Heroku remote is not added automatically:

```bash
# Add Heroku remote manually
heroku git:remote -a your-app-name
```

---

## Deploying to Heroku

### Step 1: Verify Your Files

Ensure these files exist in your repository:

**package.json** - Defines Node.js version and dependencies:
```json
{
  "name": "my-heroku-app",
  "version": "1.0.0",
  "description": "Simple Node.js app for Heroku",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^5.1.0"
  },
  "engines": {
    "node": "20.x"
  }
}
```

**Procfile** - Tells Heroku how to run your app:
```
web: node server.js
```

**server.js** - Your main application:
```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Module - 02 | Batch 08</title>
    </head>
    <body>
        <h1>Hello! Your Node app is running on Heroku</h1>
        <img src="my_photo.jpg" alt="My Photo" style="max-width: 100%; height: auto;" />
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### Step 2: Commit Your Changes (if any)

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Prepare for Heroku deployment"
```

### Step 3: Deploy to Heroku

```bash
# Deploy to Heroku
git push heroku master

# OR if using main branch
git push heroku main
```

**Deployment Process**:
1. Uploads your code to Heroku
2. Detects Node.js buildpack
3. Installs dependencies from package.json
4. Builds your application
5. Starts the web dyno using Procfile

You should see output like:
```
remote: -----> Building on the Heroku-22 stack
remote: -----> Using buildpack: heroku/nodejs
remote: -----> Node.js app detected
remote: -----> Installing node modules
remote: -----> Discovering process types
remote:        Procfile declares types -> web
remote: -----> Compressing...
remote: -----> Launching...
remote:        Released v1
remote:        https://your-app-name.herokuapp.com/ deployed to Heroku
```

### Step 4: Ensure App is Running

```bash
# Scale web dyno (ensure at least 1 is running)
heroku ps:scale web=1

# Check dyno status
heroku ps
```

### Step 5: Open Your App

```bash
# Open app in browser
heroku open

# Or manually visit
# https://your-app-name.herokuapp.com
```

---

## Managing Your Heroku App

### View Application Logs

```bash
# View recent logs
heroku logs

# Tail logs in real-time
heroku logs --tail

# View logs from specific dyno
heroku logs --dyno web

# View last 200 lines
heroku logs -n 200
```

### Check App Status

```bash
# View running dynos
heroku ps

# View app information
heroku apps:info

# View configuration variables
heroku config
```

### Restart Your App

```bash
# Restart all dynos
heroku restart

# Restart specific dyno
heroku restart web.1
```

### Set Environment Variables

```bash
# Set environment variable
heroku config:set NODE_ENV=production

# Set multiple variables
heroku config:set VAR1=value1 VAR2=value2

# View all config vars
heroku config

# Remove a config var
heroku config:unset VAR_NAME
```

### Scale Your App

```bash
# Scale web dynos
heroku ps:scale web=1

# For more traffic (requires paid dyno)
heroku ps:scale web=2
```

### Run Commands on Heroku

```bash
# Run one-off commands
heroku run node --version

# Open bash shell
heroku run bash

# Run npm commands
heroku run npm --version
```

### View App in Dashboard

```bash
# Open Heroku dashboard
heroku dashboard

# Open specific app in dashboard
heroku dashboard --app your-app-name
```

---

## Continuous Deployment

### Method 1: Automatic Deployment from GitHub

#### Step 1: Connect GitHub to Heroku

1. Go to https://dashboard.heroku.com/apps/your-app-name
2. Click on the **Deploy** tab
3. In **Deployment method**, select **GitHub**
4. Click **Connect to GitHub**
5. Authorize Heroku to access your GitHub account
6. Search for `my-heroku-app` repository
7. Click **Connect**

#### Step 2: Enable Automatic Deploys

1. Scroll to **Automatic deploys** section
2. Select the branch to deploy (e.g., `master` or `main`)
3. *Optional*: Check **Wait for CI to pass before deploy**
4. Click **Enable Automatic Deploys**

Now, every push to your selected branch will automatically deploy to Heroku!

#### Step 3: Manual Deploy from GitHub

If you need to deploy manually:
1. Scroll to **Manual deploy** section
2. Select branch
3. Click **Deploy Branch**

### Method 2: Deploy via Git Push (Current Method)

```bash
# From your local repository
git add .
git commit -m "Update application"

# Push to GitHub
git push origin master

# Push to Heroku
git push heroku master
```

### Method 3: Using Heroku Pipelines

For production workflow with staging:

```bash
# Create a pipeline
heroku pipelines:create my-heroku-pipeline --stage production

# Add app to pipeline
heroku pipelines:add my-heroku-pipeline --app your-app-name

# Create staging app
heroku create your-app-name-staging --remote staging

# Add staging app to pipeline
heroku pipelines:add my-heroku-pipeline --app your-app-name-staging --stage staging

# Deploy to staging
git push staging master

# Promote staging to production
heroku pipelines:promote --app your-app-name-staging
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Application Error (H10 - App Crashed)

**Symptoms**: 
- "Application Error" page displayed
- H10 error in logs

**Solutions**:
```bash
# Check logs for error details
heroku logs --tail

# Verify Procfile exists and is correct
cat Procfile

# Ensure dependencies are in package.json (not devDependencies)
# Restart the app
heroku restart

# Scale web dyno
heroku ps:scale web=1
```

#### 2. Port Binding Error

**Symptoms**:
- App crashes immediately after start
- Error: "EADDRINUSE"

**Solution**:
Ensure your server.js uses `process.env.PORT`:
```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

#### 3. Missing Dependencies

**Symptoms**:
- Build fails
- "Cannot find module" error

**Solution**:
```bash
# Install missing packages locally
npm install package-name --save

# Commit package.json
git add package.json package-lock.json
git commit -m "Add missing dependencies"

# Redeploy
git push heroku master
```

#### 4. Git Push Rejected

**Symptoms**:
- Push to Heroku fails
- "rejected" message

**Solution**:
```bash
# Ensure you're on the correct branch
git branch

# Check Heroku remote
git remote -v

# Force push (use with caution)
git push heroku master --force
```

#### 5. Heroku CLI Not Found After Installation

**Symptoms**:
- "heroku: command not found"

**Solution**:
```bash
# Reload shell configuration
source ~/.bashrc

# Or
source ~/.zshrc

# Or restart your terminal session
exit
# Then reconnect to server
```

#### 6. Authentication Expired

**Symptoms**:
- "Authentication failed" error

**Solution**:
```bash
# Logout and login again
heroku logout
heroku login

# Or use API token
heroku login -i
```

#### 7. Slug Size Too Large

**Symptoms**:
- Warning about slug size >300MB
- Deployment fails

**Solution**:
```bash
# Check slug size
heroku apps:info

# Add unnecessary files to .gitignore
echo "node_modules/" >> .gitignore
echo "*.log" >> .gitignore
echo ".env" >> .gitignore

# Remove node_modules from Git history
git rm -r --cached node_modules
git commit -m "Remove node_modules from git"

# Redeploy
git push heroku master
```

#### 8. Static Files Not Serving

**Symptoms**:
- Images or CSS not loading
- 404 errors for static assets

**Solution**:
Ensure Express static middleware is configured:
```javascript
app.use(express.static(__dirname));

// OR
app.use(express.static(path.join(__dirname, 'public')));
```

### Viewing Detailed Error Information

```bash
# View recent errors
heroku logs --tail

# View logs with timestamp
heroku logs --tail --timestamp

# Save logs to file
heroku logs -n 1500 > heroku-logs.txt
```

### Heroku Status and Maintenance

Check Heroku service status:
- Visit: https://status.heroku.com/
- Check for ongoing incidents or maintenance

### Getting Help

```bash
# Get help for any command
heroku help

# Get help for specific command
heroku help logs

# View Heroku documentation
heroku help:search deploy
```

---

## Best Practices

### 1. Environment Variables
Store sensitive data in config vars, not in code:
```bash
heroku config:set DATABASE_URL=postgres://...
heroku config:set API_KEY=your-secret-key
```

### 2. Use .gitignore
Exclude unnecessary files:
```
node_modules/
npm-debug.log
.env
.DS_Store
*.log
```

### 3. Use .slugignore
Exclude files from Heroku slug:
```
*.md
docs/
test/
.git
```

### 4. Specify Node Version
In package.json:
```json
"engines": {
  "node": "20.x",
  "npm": "10.x"
}
```

### 5. Use Process Manager for Production
Update package.json:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### 6. Enable HTTPs
Heroku provides free SSL:
```bash
heroku certs:auto:enable
```

### 7. Set Up Monitoring
Use Heroku metrics:
```bash
# View metrics
heroku metrics

# View dyno load
heroku ps:metrics
```

### 8. Regular Updates
```bash
# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Update Heroku stack
heroku stack:set heroku-22
```

### 9. Backup Strategy
```bash
# For apps with databases
heroku pg:backups:schedule --at '02:00 America/New_York'

# Create manual backup
heroku pg:backups:capture
```

### 10. Use Add-ons Wisely
```bash
# List available add-ons
heroku addons:services

# Add logging
heroku addons:create papertrail

# Add monitoring
heroku addons:create newrelic
```

---

## Useful Heroku Commands Reference

### App Management
```bash
heroku apps                               # List all apps
heroku apps:create app-name               # Create new app
heroku apps:info                          # Show app info
heroku apps:destroy --app app-name       # Delete app
heroku apps:rename new-name              # Rename app
```

### Deployment
```bash
git push heroku master                   # Deploy app
heroku git:clone -a app-name             # Clone app source
heroku builds                            # List builds
heroku builds:info build-id              # Build details
heroku releases                          # List releases
heroku releases:rollback v10             # Rollback to version
```

### Dynos
```bash
heroku ps                                # List dynos
heroku ps:scale web=1                    # Scale dynos
heroku ps:restart                        # Restart all dynos
heroku ps:stop web.1                     # Stop specific dyno
```

### Logs
```bash
heroku logs                              # View logs
heroku logs --tail                       # Real-time logs
heroku logs --ps web                     # Web dyno logs only
heroku logs --source app                 # App logs only
```

### Configuration
```bash
heroku config                            # List config vars
heroku config:set KEY=value              # Set config var
heroku config:unset KEY                  # Remove config var
heroku config:edit                       # Edit in editor
```

### Domain Management
```bash
heroku domains                           # List domains
heroku domains:add www.example.com       # Add custom domain
heroku domains:remove www.example.com    # Remove domain
```

### Add-ons
```bash
heroku addons                            # List add-ons
heroku addons:create addon-name          # Add addon
heroku addons:destroy addon-name         # Remove addon
```

### Maintenance Mode
```bash
heroku maintenance:on                    # Enable maintenance
heroku maintenance:off                   # Disable maintenance
heroku maintenance                       # Check status
```

---

## Security Considerations

### 1. Secure Environment Variables
Never commit sensitive data to Git:
```bash
# Use .env file locally (add to .gitignore)
echo ".env" >> .gitignore

# Set on Heroku
heroku config:set SECRET_KEY=your-secret
```

### 2. Update Dependencies Regularly
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update packages
npm update
```

### 3. Use HTTPS Only
```javascript
// In production, redirect to HTTPS
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

### 4. Implement Rate Limiting
```bash
npm install express-rate-limit --save
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

### 5. Enable Heroku's Security Features
```bash
# Force SSL
heroku certs:auto:enable

# Enable runtime metrics
heroku labs:enable runtime-dyno-metadata
```

---

## Cost Optimization

### Free Tier Limits (Heroku Eco Dynos)
- **Free Dynos**: 550-1000 hours/month
- **Sleep after 30 minutes** of inactivity
- **Wake on request** (may take 10-30 seconds)

### Keep Free Dyno Awake
Use a ping service:
- **UptimeRobot**: https://uptimerobot.com/
- **Pingdom**: https://www.pingdom.com/
- **Cron-job.org**: https://cron-job.org/

### Upgrade Options
```bash
# View dyno types
heroku ps:type

# Upgrade to Hobby dyno ($7/month)
heroku ps:type hobby

# Downgrade to free
heroku ps:type free
```

---

## Monitoring and Analytics

### Built-in Metrics
```bash
# View metrics dashboard
heroku dashboard --app your-app-name

# CLI metrics
heroku ps:metrics
```

### Add-on Recommendations
```bash
# Logging
heroku addons:create papertrail

# Error tracking
heroku addons:create sentry

# Application performance monitoring
heroku addons:create newrelic

# Uptime monitoring
heroku addons:create uptimetrace
```

---

## Next Steps

After successful deployment:

1. **Set up custom domain** (if needed)
   ```bash
   heroku domains:add www.yourdomain.com
   ```

2. **Enable automatic deployments** from GitHub

3. **Set up monitoring** and alerting

4. **Configure CI/CD pipeline** for testing before deployment

5. **Add database** if needed:
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

6. **Implement proper logging** strategy

7. **Set up staging environment** for testing

8. **Configure backup strategy**

9. **Monitor application performance**

10. **Optimize for production**:
    - Enable caching
    - Compress responses
    - Optimize images
    - Minimize JavaScript/CSS

---

## Additional Resources

### Official Documentation
- **Heroku Dev Center**: https://devcenter.heroku.com/
- **Node.js on Heroku**: https://devcenter.heroku.com/categories/nodejs-support
- **Heroku CLI Documentation**: https://devcenter.heroku.com/articles/heroku-cli

### Tutorials
- **Getting Started with Node.js**: https://devcenter.heroku.com/articles/getting-started-with-nodejs
- **Deploying Node.js Apps**: https://devcenter.heroku.com/articles/deploying-nodejs
- **Heroku Postgres**: https://devcenter.heroku.com/articles/heroku-postgresql

### Community
- **Heroku Status**: https://status.heroku.com/
- **Heroku Community**: https://help.heroku.com/
- **Stack Overflow**: https://stackoverflow.com/questions/tagged/heroku

### Tools
- **Heroku CLI**: https://cli.heroku.com/
- **Heroku Dashboard**: https://dashboard.heroku.com/
- **Heroku Button**: https://devcenter.heroku.com/articles/heroku-button

---

## Quick Reference Card

```bash
# === COMMON COMMANDS ===

# Login
heroku login

# Create app
heroku create app-name

# Deploy
git push heroku master

# View logs
heroku logs --tail

# Open app
heroku open

# Restart app
heroku restart

# Check status
heroku ps

# Set environment variable
heroku config:set KEY=value

# View config
heroku config

# Scale dynos
heroku ps:scale web=1

# Run commands
heroku run bash

# View app info
heroku apps:info
```

---

## Cleanup

If you want to remove the app from Heroku:

```bash
# Delete app
heroku apps:destroy --app your-app-name --confirm your-app-name

# Remove Heroku remote from Git
git remote remove heroku
```

---

## Conclusion

You now have a complete guide to deploy your Node.js application to Heroku from an AWS Ubuntu 24 server. This setup provides:

✅ Automated deployment workflow  
✅ Scalable hosting platform  
✅ Free SSL/TLS certificates  
✅ Easy rollback and version control  
✅ Built-in monitoring and logging  
✅ Simple environment management  

For support or questions:
- **GitHub Issues**: [sarowar-alam/my-heroku-app/issues](https://github.com/sarowar-alam/my-heroku-app/issues)
- **Heroku Support**: https://help.heroku.com/

---

**Last Updated**: February 17, 2026  
**Author**: Sarowar Alam  
**Version**: 1.0.0
