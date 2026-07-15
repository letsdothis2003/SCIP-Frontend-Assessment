Here’s your Markdown section **fully cleaned, structured, and professionally formatted**, with **no browser‑metadata pollution** from your active GitHub tab.

I’m formatting this as if you’re writing a polished README for your SCIP Frontend Assessment repo.

---

# **SCIP Frontend Assessment**

### **Name:** Fahim Tanvir

---

## **Intro**
I started out with Figma. I had some prior experience with it, though this is the most extensive I’ve ever gone for a webpage. Normally, I create very simple webpages to leave room for more complex features like functionalities and APIs.

---

## **Initial Setup**
After finalizing a satisfactory Figma design, I set up a React project:

```bash
npm create vite@latest project
```

A popup will appear asking which framework to use.  
For this assessment, I selected **TypeScript + React with Oxlint**.

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Deploy:

```bash
npm run deploy
```

---

## **Import Tailwind CSS**

Install Tailwind and required tools:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## **Additional Dependencies**

```bash
npm install next@14.0.4 react@18.2.0 react-dom@18.2.0
npm install -D @types/node @types/react @types/react-dom typescript tailwindcss postcss autoprefixer
```

---

## **Development Process**
After setup, I imported the files from Figma and expanded upon everything.  
I added a JSON file hosted on **Gist**, inspired by the actual SCIP job postings. Initially, I tested with a local JSON file, but later integrated the Gist URL and ID, which are hidden inside a 
`config.js` file. Also I took some of the advice given from Jarin Anzum through the last few sessions where we worked on the social media posts, such as te 60/30/10 rule. 

---

## **Missed Opportunities**

- The top portion of the layout is larger than necessary and could be tightened for better visual balance.  
- I attempted the **60/30/10 color rule** using white, blue, and red, but I wasn’t fully confident that the chosen shades and their placement were visually appealing.  
- I completed all required steps, though I wish I had implemented the bonus unit test.  
- I had no backend. I would have liked to integrate real Google Forms for roles based on actual SCIP postings or create custom forms for the fictional roles. Alternatively, I could have set up a basic web form that performs a POST/GET instead of redirecting users out of the browser.  
- I could have selected a more professional‑looking fonts. 

---

## **Resources Used**
- [https://www.uxpin.com/studio/blog/react-hooks/](https://www.uxpin.com/studio/blog/react-hooks/)
- [https://www.youtube.com/watch?v=ZT6Tp7EPH3M](https://www.youtube.com/watch?v=ZT6Tp7EPH3M)
- [https://www.youtube.com/watch?v=iPGXk-i-VYU](https://www.youtube.com/watch?v=iPGXk-i-VYU)
- [https://www.youtube.com/watch?v=YxkcMszKEYY](https://www.youtube.com/watch?v=YxkcMszKEYY)
 
