## **🚀 Building & Deploying an Angular App to Azure Static Web Apps with Azure DevOps Pipeline**

We will **build** and **deploy** the Angular app using:
1. **Angular Production Build (`ng build --configuration=production`)**
2. **Azure Static Web Apps for hosting**
3. **Azure DevOps Pipeline for CI/CD automation**

---

## **1️⃣ Build & Optimize the Angular App for Production**
To manually build the production-ready Angular app, run:
```sh
ng build --configuration=production
```
This will generate the **`dist/your-app-name/`** folder containing the optimized **HTML, CSS, and JavaScript files**.

---

## **2️⃣ Create an Azure Static Web App**
Azure **Static Web Apps** is the best hosting option for Angular apps.

### **✅ Steps to Create an Azure Static Web App**
1. **Go to [Azure Portal](https://portal.azure.com)**
2. **Search for "Static Web Apps"** and select it.
3. **Click "Create"**
4. **Enter the required details:**
  - **Resource Group**: Create a new or select an existing one.
  - **Name**: Choose a unique app name (e.g., `my-angular-app`).
  - **Deployment Source**: Select **Azure DevOps**.
  - **Region**: Choose the nearest data center.
  - **Build Presets**: Select **Angular**.
  - **App Location**: Set to `/` (default for Angular).
  - **Output Location**: Set to `dist/your-app-name/` (adjust based on your Angular project name).
5. **Click "Review + Create" and then "Create"**
6. **Wait for deployment completion** and take note of the **Azure Static Web App URL**.

---

## **3️⃣ Create an Azure DevOps Pipeline for CI/CD**
Now, we'll **automate the build & deployment** using an **Azure DevOps pipeline**.

### **✅ Steps to Create the Pipeline**
1. **Go to [Azure DevOps](https://dev.azure.com/)**
2. **Select your project** or create a new one.
3. **Go to "Pipelines" → "New Pipeline"**
4. **Select "GitHub" or "Azure Repos" as your source code provider**
5. **Select "Starter Pipeline" and replace it with the following YAML file**

---

## **4️⃣ Azure DevOps Pipeline (azure-pipelines.yml)**
This **CI/CD pipeline** will:
- Install **Node.js**
- Install **Angular CLI**
- Install **dependencies (`npm install`)**
- Build the **Angular app for production**
- Deploy to **Azure Static Web Apps**

### **✅ `azure-pipelines.yml`**
```yaml
trigger:
  - main  # Runs the pipeline on every push to 'main' branch

pool:
  vmImage: 'ubuntu-latest' # Use latest Ubuntu VM

steps:
  - task: UseNode@2
    inputs:
      version: '20.x' # Use latest stable Node.js
    displayName: 'Use Node.js 20.x'

  - script: |
      npm install -g @angular/cli
    displayName: 'Install Angular CLI'

  - script: |
      npm install
    displayName: 'Install Dependencies'

  - script: |
      ng build --configuration=production
    displayName: 'Build Angular App'

  - task: AzureStaticWebApp@0
    inputs:
      app_location: '/' # Root folder of Angular app
      output_location: 'dist/your-app-name' # Change to match your Angular build output folder
      azure_static_web_apps_api_token: $(deployment_token)
    displayName: 'Deploy to Azure Static Web Apps'
```

### **✅ Steps to Configure Deployment Token**
1. **Go to Azure Portal → Your Static Web App**
2. **Under "Settings" → "Deployment Token"**
3. **Copy the token** and add it as a **secret variable** in Azure DevOps:
  - Go to **Azure DevOps**
  - Open **your pipeline settings**
  - Click **"Variables"**
  - Add **Name:** `deployment_token`
  - Add **Value:** _(paste your token)_
  - **Mark it as "Secret"** and Save.

---

## **5️⃣ Commit & Trigger the Pipeline**
- Commit and push `azure-pipelines.yml` to your repository.
- The pipeline **automatically runs** and deploys your Angular app!

---

## **🚀 Final Results**
✅ **Fully automated Angular CI/CD pipeline**  
✅ **Optimized production build (`ng build --configuration=production`)**  
✅ **Deployed to Azure Static Web Apps**  
✅ **Secure deployment token handling**

---

## **🎯 Next Steps**
- ✅ **Test your Angular app live** on Azure Static Web Apps.
- ✅ **Set up custom domains** in Azure for a professional URL.
- ✅ **Enable staging environments** for better testing.

Your **Angular app is now live and continuously deployed via Azure DevOps! 🚀**  
Let me know if you need any refinements! 😊
