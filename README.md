<p align="center">
  <img src="https://raw.githubusercontent.com/user-attachments/assets/10708605-7f15-46aa-a39c-c90d8a599605" width="700" alt="Neon Sort Cover Image">
</p>

<h1 align="center">
  <pre>NEON-SORT : A NEO-BRUTALIST SORTING VISUALIZER</pre>
</h1>

<p align="center">
  An interactive, web-based educational tool that brings sorting algorithms to life with a stark, neo-brutalist design and dynamic, real-time animations.
</p>

<p align="center">
  <strong><a href="#">[ VIEW LIVE DEMO ]</a></strong>
</p>

---

## ► FEATURES

Neon-Sort is more than just a visualizer; it's a comprehensive suite of tools designed to help you understand, compare, and inspect sorting algorithms in a highly engaging way.

-   🎨 **Real-Time Visualization**: Watch algorithms like Merge Sort, Quick Sort, and Heap Sort operate on the data in real-time, with a quirky, neo-brutalist aesthetic.
-   ⚔️ **Algorithm Showdown**:
    -   **Visual Race**: Pit all algorithms against each other in a head-to-head race on the same dataset.
    -   **Instant Results**: Get an immediate, data-driven ranking of algorithm performance for any given array.
-   🔬 **The Code Inspector**:
    -   View algorithm implementations in **Python, Java, C++, and C**.
    -   See the **currently executing line of code highlighted** in real-time as the animation runs.
    -   Convenient one-click **copy-to-clipboard** functionality.
-   ⚙️ **The Test Bench**:
    -   Generate random arrays or choose from specific presets like **Sorted**, **Reversed**, **Nearly Sorted**, or **Few Unique Values** to test algorithms against their best and worst-case scenarios.
-   ⏯️ **The Inspector Controls**:
    -   Pause the animation at any point.
    -   Step through the sorting process **one operation at a time** (forwards and backwards) to deeply analyze the logic.
-   🔊 **Audio Feedback**: Toggleable sound effects for array comparisons and writes provide an immersive, multi-sensory learning experience.
-   📱 **Fully Responsive**: A seamless experience on desktop, tablet, and mobile devices.

---

## ▋ TECH STACK

This project was built with modern, efficient technologies to ensure a fast and reliable user experience.

-   **Framework**: React 19
-   **Language**: TypeScript
-   **Build & Dev Tool**: esbuild (for lightning-fast builds and local development)
-   **Styling**: Tailwind CSS (with custom styles for the neo-brutalist theme)
-   **Audio**: Web Audio API

---

## 🚀 GETTING STARTED

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/neon-sort.git
    cd neon-sort
    ```

2.  **Install dependencies:**
    This project uses `npm` to manage dependencies.
    ```bash
    npm install
    ```

3.  **Run the development server:**
    This will start a local development server using `esbuild`.
    ```bash
    npm start
    ```
    Open your browser and navigate to the URL provided in the terminal (usually `http://127.0.0.1:8000`).

---

## 🌐 DEPLOYMENT

This repository is optimized for one-push deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  Connect your repository to your Vercel account.
3.  Vercel will automatically detect the configuration in `vercel.json` and `package.json`, run the `npm run build` command, and deploy the static site from the `dist` directory.

Any subsequent pushes to the `main` branch will trigger automatic redeployments.