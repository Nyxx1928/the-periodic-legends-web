# GitHub Setup Guide for The Periodic Legends

This guide will walk you through setting up your project on GitHub step-by-step. Don't worry if you're new to GitHub - we'll make it simple!

## 📋 Prerequisites

- A GitHub account (create one at [github.com](https://github.com) if you don't have one)
- Git installed on your computer ([Download Git](https://git-scm.com/downloads))
- Your project files ready

## 🚀 Step-by-Step Instructions

### Step 1: Create a GitHub Account (if needed)

1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Enter your email, create a password, and choose a username
4. Verify your email address

### Step 2: Install Git (if not already installed)

1. Download Git from [git-scm.com/downloads](https://git-scm.com/downloads)
2. Run the installer (use default settings)
3. Open PowerShell or Command Prompt
4. Verify installation by typing: `git --version`

### Step 3: Create a New Repository on GitHub

1. Log in to GitHub
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `the-periodic-legends` (or your preferred name)
   - **Description**: "Earth Science educational game platform - Thesis project"
   - **Visibility**: 
     - Choose **Public** if you want it visible in your portfolio
     - Choose **Private** if you want to keep it private (you can change this later)
   - **DO NOT** check "Initialize with README" (we already have one)
5. Click **"Create repository"**

### Step 4: Prepare Your Local Project

1. **Open PowerShell or Command Prompt**
2. Navigate to your project folder:
   ```powershell
   cd "D:\Downloads\TPL Web - Copy"
   ```

3. **Initialize Git** (if not already done):
   ```powershell
   git init
   ```

4. **Check what files will be uploaded**:
   ```powershell
   git status
   ```
   This shows you which files will be added. Make sure `config.local.js` is NOT listed (it should be ignored).

### Step 5: Add Your Files to Git

1. **Add all files** (except those in .gitignore):
   ```powershell
   git add .
   ```

2. **Check the status again** to see what's staged:
   ```powershell
   git status
   ```

3. **Create your first commit**:
   ```powershell
   git commit -m "Initial commit: Thesis project - The Periodic Legends"
   ```

### Step 6: Connect to GitHub

1. **Copy your repository URL** from GitHub (it looks like):
   ```
   https://github.com/yourusername/the-periodic-legends.git
   ```

2. **Add GitHub as remote**:
   ```powershell
   git remote add origin https://github.com/yourusername/the-periodic-legends.git
   ```
   (Replace `yourusername` with your actual GitHub username)

3. **Verify the remote was added**:
   ```powershell
   git remote -v
   ```

### Step 7: Upload Your Code

1. **Push your code to GitHub**:
   ```powershell
   git branch -M main
   git push -u origin main
   ```

2. **Enter your GitHub credentials** when prompted:
   - Username: Your GitHub username
   - Password: You'll need a **Personal Access Token** (see below)

### Step 8: Create a Personal Access Token (for authentication)

GitHub no longer accepts passwords. You need a token:

1. Go to GitHub → Click your profile picture → **Settings**
2. Scroll down to **Developer settings** (left sidebar)
3. Click **Personal access tokens** → **Tokens (classic)**
4. Click **Generate new token** → **Generate new token (classic)**
5. Give it a name: "TPL Project Upload"
6. Select scopes: Check **"repo"** (this gives full repository access)
7. Click **Generate token**
8. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)
9. Use this token as your password when pushing

### Step 9: Verify Upload

1. Go back to your GitHub repository page
2. Refresh the page
3. You should see all your files!

## 🔄 Making Future Updates

Whenever you make changes to your project:

1. **Navigate to your project folder**:
   ```powershell
   cd "D:\Downloads\TPL Web - Copy"
   ```

2. **Check what changed**:
   ```powershell
   git status
   ```

3. **Add your changes**:
   ```powershell
   git add .
   ```

4. **Commit with a message**:
   ```powershell
   git commit -m "Description of what you changed"
   ```

5. **Push to GitHub**:
   ```powershell
   git push
   ```

## 🎨 Making Your Repository Portfolio-Ready

### Add a Repository Description
- Go to your repository on GitHub
- Click the gear icon ⚙️ next to "About"
- Add a description: "Educational RPG for Earth Science - Thesis Project"
- Add website URL if you have one deployed

### Add Topics/Tags
- Click the gear icon ⚙️ next to "About"
- Add topics like: `education`, `game`, `thesis`, `javascript`, `html`, `css`, `supabase`

### Pin Your Repository
- Go to your GitHub profile
- Click "Customize your pins"
- Select this repository to pin it at the top

## 🛡️ Security Checklist

Before pushing, make sure:

- ✅ `config.local.js` is in `.gitignore` (it should be)
- ✅ No API keys or passwords are in your code
- ✅ No personal information is exposed
- ✅ Supabase keys are in environment variables only

## ❓ Troubleshooting

### "fatal: not a git repository"
- Run `git init` first

### "remote origin already exists"
- Remove it: `git remote remove origin`
- Then add it again with the correct URL

### "Authentication failed"
- Make sure you're using a Personal Access Token, not your password
- Check that the token has "repo" scope

### "Permission denied"
- Verify your GitHub username and token
- Make sure you have access to the repository

## 📚 Additional Resources

- [GitHub Docs](https://docs.github.com)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [GitHub Desktop](https://desktop.github.com) - GUI alternative if you prefer clicking over typing

## 🎉 You're Done!

Your project is now on GitHub! You can:
- Share the link with others
- Add it to your portfolio
- Continue updating it
- Collaborate with others

**Your repository URL will be:**
```
https://github.com/yourusername/the-periodic-legends
```

---

**Need Help?** Feel free to ask questions or check GitHub's documentation!


