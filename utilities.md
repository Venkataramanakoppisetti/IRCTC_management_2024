 ---Commands---
 ---for backend initilization and packages installation---
    1. mkdir backend
    2. cd backend
    3. npm init -y 
    5. npm install express sqlite3 bcryptjs jsonwebtoken cors dotenv

---for frontend initialization---
    1. npx create-react-app frontend

---git branch creation ---
    1. git init
    2. git checkout -b my-fullstack-projects-2024

---If frontend pushed to submodule---
    1. git rm --cached frontend 
    2. git add frontend
    3. git commit -m "commit message"
    4. git push origin <my-branch>
