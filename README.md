# ⚡️ CYBERNEXUS — Official Website

```
 ______     __  __     ______     ______     ______     __   __     ______     __  __     __  __     ______
/\  ___\   /\ \_\ \   /\  == \   /\  ___\   /\  == \   /\ "-.\ \   /\  ___\   /\_\_\_\   /\ \/\ \   /\  ___\
\ \ \____  \ \____ \  \ \  __<   \ \  __\   \ \  __<   \ \ \-.  \  \ \  __\   \/_/\_\/_  \ \ \_\ \  \ \___  \
 \ \_____\  \/\_____\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_\\"\_\  \ \_____\   /\_\/\_\  \ \_____\  \/\_____\
  \/_____/   \/_____/   \/_____/   \/_____/   \/_/ /_/   \/_/ \/_/   \/_____/   \/_/\/_/   \/_____/   \/_____/
```

> The official web presence for CYBERNEXUS club — showcasing our projects, events, and community.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code with Prettier
npm run format
```

---

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components (PascalCase)
├── pages/          # Route pages
├── hooks/          # Custom React hooks
├── utils/          # Helper functions
├── styles/         # Tailwind CSS and global styles
└── assets/         # Images, fonts, and static files
```

---

## 📋 Coding Standards

### **Naming Conventions**

| Type                  | Convention         | Example                         |
| --------------------- | ------------------ | ------------------------------- |
| Variables & Functions | `camelCase`        | `fetchUser`, `isActive`         |
| React Components      | `PascalCase`       | `MyButton.jsx`, `EventCard.jsx` |
| Custom Hooks          | `useThing`         | `useAuth`, `useFetch`           |
| Constants             | `UPPER_SNAKE_CASE` | `API_BASE_URL`, `MAX_LIMIT`     |
| Folders               | `kebab-case`       | `user-profile`, `event-list`    |

### **Formatting Rules**

- **Indentation:** 2 spaces (no tabs)
- **Line Endings:** LF (Unix style)
- **Encoding:** UTF-8
- **Formatter:** Prettier (always run `npm run format` before committing)

---

## 🎯 How to Contribute

### **Step 1: Set Up Your Environment**

1. **Fork the repository** on GitHub
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cybernexus_website.git
   cd cybernexus-website
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```

### **Step 2: Create a New Branch**

Always create a new branch for your changes:

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Examples:
git checkout -b feature/add-events-page
git checkout -b fix/navbar-responsive
git checkout -b docs/update-readme
```

**Branch naming:**

- `feature/` for new features
- `fix/` for bug fixes
- `docs/` for documentation updates

### **Step 3: Make Your Changes**

1. **Start the development server:**
   ```bash
   npm run dev
   ```
2. **Edit your code** in your preferred editor
3. **Test your changes** in the browser (usually `http://localhost:5173`)

### **Step 4: Format Your Code**

Before committing, always format your code:

```bash
npm run format
```

This ensures consistent code style across the project.

### **Step 5: Commit Your Changes**

1. **Stage your changes:**

   ```bash
   git add .
   ```

2. **Commit with a clear message:**
   ```bash
   git commit -m "feat: add events card component"
   ```

**Commit message format:**

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting changes
- `refactor:` for code restructuring

**Examples:**

- `feat: add team members page`
- `fix: resolve navbar mobile menu bug`
- `docs: update contribution guidelines`

### **Step 6: Push Your Branch**

Push your branch to your fork on GitHub:

```bash
git push origin feature/your-feature-name
```

### **Step 7: Create a Pull Request**

1. Go to the **original repository** on GitHub
2. Click **"Pull Requests"** → **"New Pull Request"**
3. Click **"compare across forks"**
4. Select your fork and branch
5. **Add a clear title and description:**
   - What changes did you make?
   - Why did you make them?
   - Add screenshots for UI changes
6. Click **"Create Pull Request"**

### **Step 8: Wait for Review**

- Maintainers will review your PR
- Address any requested changes
- Once approved, your code will be merged! 🎉

---

## 🔄 Keeping Your Fork Updated

Sync your fork with the main repository regularly:

```bash
# Add the original repo as upstream (do this once)
git remote add upstream https://github.com/ORIGINAL_OWNER/cybernexus-website.git

# Fetch latest changes
git fetch upstream

# Switch to main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

---

## ⚠️ Common Issues & Solutions

### **"npm install" fails**

- Make sure you have Node.js installed (v16 or higher)
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### **Prettier not working**

- Make sure you ran `npm install` first
- Check if `.prettierrc` exists in the project root

---

## 🤝 Community

- **Email:** cyber.nexus.tiaret@gmail.com
- **Issues:** For bugs and feature requests, open an issue on GitHub

---

## 📜 License

This project is licensed under the **MIT License**.

---

**Made with ⚡️ by the CYBERNEXUS crew** — _Keep it curious, keep it kind_ ✨
