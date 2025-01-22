Setting up a new Angular 19 application involves several steps, including installing Angular CLI, creating the project, and installing dependencies. Below is a step-by-step guide:

---

### **Step 1: Install Node.js**
Angular requires Node.js. Check if Node.js is installed:

```bash
node -v
npm -v
```

If not installed, download and install the latest stable version of Node.js from [Node.js official website](https://nodejs.org).

---

### **Step 2: Install Angular CLI**
The Angular CLI (Command Line Interface) is a tool to initialize, develop, scaffold, and maintain Angular applications.

Install Angular CLI globally using npm:

```bash
npm install -g @angular/cli
```

Verify the installation:

```bash
ng version
```

Ensure it shows Angular CLI compatible with Angular 19.

---

### **Step 3: Create a New Angular Project**
To create a new Angular 19 project, use the following command:

```bash
ng new my-angular-app
```

- **`my-angular-app`**: Replace this with your desired project name.
- During this step, you’ll be prompted to:
  - Choose whether to add Angular routing.
  - Select a stylesheet format (CSS, SCSS, SASS, or LESS).

---

### **Step 4: Navigate to the Project Directory**
Move into the newly created project folder:

```bash
cd my-angular-app
```

---

### **Step 5: Install Dependencies**
When you create the project, Angular CLI automatically installs the necessary dependencies using npm. If this step is interrupted or you need to reinstall dependencies, use:

```bash
npm install
```

This command reads the `package.json` file and installs all listed dependencies into the `node_modules` directory.

---

### **Step 6: Start the Development Server**
Run the development server to view your application in a browser:

```bash
ng serve
```

The default server runs at `http://localhost:4200`. Open this URL in your browser to see your app.

---

### **Step 7: Add or Update Dependencies**
If you need specific packages or libraries, you can install them using npm. For example:

1. **Install Bootstrap**:

   ```bash
   npm install bootstrap
   ```

2. **Update Angular CLI or Dependencies**:

   ```bash
   ng update
   ```

This command updates your application and its dependencies to match the latest Angular version.

---

### **Step 8: Build for Production (Optional)**
When you're ready to deploy your application, build it for production:

```bash
ng build --prod
```

The output will be placed in the `dist/` directory, optimized for production use.

---

### **Helpful Commands**
- **Run Unit Tests**:

  ```bash
  ng test
  ```

- **Run End-to-End Tests**:

  ```bash
  ng e2e
  ```

- **Generate Components, Services, etc.**:

  ```bash
  ng generate component my-component
  ng generate service my-service
  ```

---

This process ensures your Angular 19 application is set up and ready for development. Let me know if you need help with specific configurations or tools!
