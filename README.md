# Gallery18Plus
# Intro 
  A simple React Native application built with Expo that loads image folders from the device’s local storage. The app functions as a comic gallery ( now only serves 210 comic from Nhentai ), allowing users to browse and view images seamlessly
# Prerequisites
Before you begin, ensure you have the following installed:
  -   **Node.js**: [v18.x or higher](https://nodejs.org/en/download/)
  -   **npm**: Comes with Node.js
  -   **Expo CLI**: Install globally using npm install -g expo-cli
# Installation ( Only for Android )
  1. Clone project
  2. Build apk file using expo build and install or use these command 
     ```
     npx expo prebuild
     cd android
     ./gradlew assembleRelease
     ```
  3. Create an folder named "Gallery18Plus" in main storage of mobile device. It will look like this : 
   ```
    MainStorage/Download
               /Music
               /Gallery18Plus/Image/123456_ComicName
                                   /123456_ComicNmae
               /Gallery18Plus/Video/
   ```
  3.1 You can change the folder name or path but remember edit the path at constant/localUri.tsx
  4. Install APK, open and use
## 📁 Project Structure

```
Gallery18Plus/
├── app/                  # Expo Router main screens and routes
│   ├── (tabs)/           # Example of tab-based navigation
│   └── _layout.tsx       # Root layout for Expo Router
├── assets/               # Static assets (images, fonts, etc.)
├── components/           # Reusable UI components
│   ├── common/           # Generic components
│   └── specific/         # Feature-specific components
├── constants/            # Application-wide constants and configurations
├── hooks/                # Custom React Native hooks
├── model/                # Data models and interfaces (e.g., Firestore document structures)
├── scripts/              # Utility scripts (e.g., for build processes, data seeding)
├── .easignore            # Files to ignore during EAS builds
├── .gitignore            # Git ignore rules
├── .vscode/              # VS Code editor configuration
├── app.json              # Expo application manifest configuration
├── eas.json              # Expo Application Services (EAS) build configuration
├── eslint.config.js      # ESLint configuration for code quality
├── package.json          # Node.js project manifest and dependency list
├── package-lock.json     # Records exact dependency versions
└── tsconfig.json         # TypeScript compiler configuration
```
