# 🌌 Brand Theme 3D Force Graph

An interactive **React + Three.js + 3d-force-graph** visualization that shows relationships between **brands, products, themes, subthemes, and sentiments** in a 3D space.

---

## 🚀 Features

- ⚡ Built using **React + Create React App**
- 🧠 Interactive 3D force-directed layout using **Three.js** and **3d-force-graph**
- 🎯 Hierarchical view: **Brand → Product → Theme → Subtheme → Sentiment**
- 🌈 Color-coded sentiment visualization (Positive / Negative / Neutral)
- 🖱️ Click on nodes to view detailed info
- 💅 Tailwind CSS-based clean dark theme (optional)

---

## 🧩 1️⃣ Project Setup

Create a new React project:

```bash
npx create-react-app brand-theme-graph
Go into the project folder:

bash
Copy code
cd brand-theme-graph
⚙️ 2️⃣ Install Dependencies
Install the required libraries:

bash
Copy code
npm install three 3d-force-graph
📁 3️⃣ Add the Component
Create a new file:

css
Copy code
src/BrandThemeGraph3D.jsx
Paste your full component code inside this file (the one you shared earlier).

🧠 4️⃣ Use the Component
Open src/App.js and replace everything with:

jsx
Copy code
import React from 'react';
import BrandThemeGraph3D from './BrandThemeGraph3D';

function App() {
  return (
    <div className="App">
      <BrandThemeGraph3D />
    </div>
  );
}

export default App;
🎨 5️⃣ (Optional) Tailwind CSS Setup
If you want the same dark theme styling used in the component, install Tailwind CSS:

bash
Copy code
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Edit the tailwind.config.js file:

js
Copy code
content: ["./src/**/*.{js,jsx,ts,tsx}"],
theme: { extend: {} },
plugins: [],
Then open src/index.css and replace everything with:

css
Copy code
@tailwind base;
@tailwind components;
@tailwind utilities;
▶️ 6️⃣ Run the App
Start the development server:

bash
Copy code
npm start
Then open your browser and go to:

arduino
Copy code
http://localhost:3000
🧭 7️⃣ Explore the Graph
✅ Rotate, zoom, and drag the 3D graph
✅ Click nodes to view label and type
✅ Observe color-coded sentiments:

🟢 Positive → #22c55e

🔴 Negative → #ef4444

⚪ Neutral → #64748b

🧠 Architecture Overview
Data → Node & Link Generation → 3D Graph Rendering → Interactivity

Level	Example	Node Color
Brand	EltaMD	🟠 #f59e0b
Product	UV Clear	🔵 #3b82f6
Theme	Effectiveness	🟣 #8b5cf6
Subtheme	Lightweight	💗 #ec4899
Sentiment	Positive / Negative / Neutral	🟢🔴⚪

📊 Future Enhancements
Upload Excel or CSV files for real data

Add filters for sentiment or theme

Display hover tooltips with stats

Export graph snapshots or videos

🧑‍💻 Author
Rajesh Hugar
Senior Data Analyst | Aspiring Full-Stack AI Engineer
💡 Passionate about data, visualization, and AI

