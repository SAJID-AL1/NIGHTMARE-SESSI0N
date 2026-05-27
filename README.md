<p align="center">
  <img src="https://i.imgur.com/nightmare-session.png" width="150"/>
  <h1>Nightmare Session</h1>
  <p>Professional WhatsApp MD Session Manager</p>
</p>

---

## 🚀 One-Click Deploy

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/SAJID-AL1/NIGHTMARE-SESSI0N)

> **Note:** Change `YourUsername` to your GitHub username

---

## 📦 Manual Deploy

```bash
# Clone repo
git clone https://github.com/SAJID-AL1/NIGHTMARE-SESSI0N.git
cd NIGHTMARE-SESSI0N

# Create Heroku app
heroku create Nightmare-Session

# Add buildpack
heroku buildpacks:set heroku/nodejs

# Push to Heroku
git push heroku main

# Start bot
heroku web: node index.js
