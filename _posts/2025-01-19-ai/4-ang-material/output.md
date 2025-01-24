To install and configure Angular Material in an Angular 19 project, follow these steps:

---

### Step 1: **Ensure Angular CLI is Installed**
Make sure you have Angular CLI installed and your project is set up. Use the following command to check the version:
```bash
ng version
```
If the CLI is not installed, install it:
```bash
npm install -g @angular/cli
```

---

### Step 2: **Add Angular Material**
Run the following command to add Angular Material to your project:
```bash
ng add @angular/material
```
This command:
- Installs the Angular Material package.
- Updates the project configuration (e.g., `angular.json`).
- Prompts you to select a pre-built theme for your application.
- Adds necessary styles to your application.

You can select one of the pre-built themes during the prompt:
1. Indigo/Pink
2. Deep Purple/Amber
3. Pink/Blue Grey
4. Purple/Green

---

### Step 3: **Install Animations**
When you add Angular Material, animations are usually set up automatically. If not, install Angular animations manually:
```bash
npm install @angular/animations
```

Add `BrowserAnimationsModule` to your `AppModule`:
```typescript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    // Your components
  ],
  imports: [
    BrowserAnimationsModule,
    // Other modules
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

---

### Step 4: **Verify Themes and Styles**
Ensure that Angular Material styles are included in your project. Open `angular.json` and confirm the styles array includes the Material theme:
```json
"styles": [
  "src/styles.css",
  "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
],
```
You can replace `indigo-pink.css` with your selected theme.

---

### Step 5: **Using Angular Material Components**
Now you can start using Angular Material components in your project.

#### Example: Add a Material Button and Icon
1. Import the modules you need in `AppModule`:
    ```typescript
    import { MatButtonModule } from '@angular/material/button';
    import { MatIconModule } from '@angular/material/icon';

    @NgModule({
      imports: [
        MatButtonModule,
        MatIconModule,
        // Other modules
      ],
    })
    export class AppModule {}
    ```

2. Add the button and icon to your component template (`app.component.html`):
    ```html
    <button mat-raised-button color="primary">
      <mat-icon>thumb_up</mat-icon>
      Like
    </button>
    ```

---

### Step 6: **Test Your Setup**
Run the application:
```bash
ng serve
```
Open the app in your browser (default: `http://localhost:4200`) and verify the Material components render correctly.

---

### Optional: **Customizing Themes**
If you want to customize the theme:
1. Create a custom theme file, e.g., `src/custom-theme.scss`.
2. Add and configure your theme:
    ```scss
    @import "~@angular/material/theming";
    // Define a custom theme
    $custom-primary: mat-palette($mat-indigo);
    $custom-accent: mat-palette($mat-pink, A200, A100, A400);

    $custom-theme: mat-light-theme((
      color: (
        primary: $custom-primary,
        accent: $custom-accent,
      ),
    ));

    @include angular-material-theme($custom-theme);
    ```
3. Update the `angular.json` to include your custom theme:
    ```json
    "styles": [
      "src/custom-theme.scss"
    ]
    ```

---

With these steps, you have installed and configured Angular Material in an Angular 19 project successfully.
