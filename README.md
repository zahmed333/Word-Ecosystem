
**Title:** Dynamic Word Cloud Generator

**Description:**
This repository contains a p5.js application that dynamically creates a word cloud from a text file. The word cloud updates in real-time, showcasing the frequency of words, excluding common stop words. The project is interactive and visually appealing, perfect for visualizing text data in a creative way.

**How to Run:**
1. Clone the repository.
2. Open `index.html` in a web browser, or use a local server if your browser blocks file requests.
3. The sketch will automatically load `yourfile.txt`. Replace this file with any text file of your choice.

**Features:**
- Dynamic word cloud generation.
- Real-time visualization of word frequency.
- Interactive word movement with collision handling.
- Aesthetically pleasing color scheme and motion.

**Configuration:**
- `yourfile.txt`: Replace this file with any text of your choice.
- `stopWords` array: Modify this array to change the list of words excluded from the word cloud.

**Contributing:**
Feel free to fork the project, make changes, and open a pull request with your improvements.

**Project Name:** Dynamic Word Cloud Generator

**Purpose:**
The purpose of this project is to create an interactive and visually appealing word cloud generator using p5.js. It processes a given text file, counts the frequency of each word (excluding a predefined list of stop words), and displays these words in varying sizes and colors based on their frequency. The words float around the canvas, colliding and interacting with each other.

**How It Works:**
- The `preload` function loads the text file.
- The `setup` function initializes the canvas and word list.
- The `draw` function continuously updates the canvas, displaying words and handling their movements and collisions.
- The `processText` function processes the loaded text, splitting it into words and counting their frequency.
- The `Word` class defines the properties and behaviors of each word in the cloud.

**Technical Details:**
- Written in JavaScript using the p5.js library.
- Uses Object-Oriented Programming principles for managing word objects.
- Implements collision detection and response among words.

**Future Enhancements:**
- User interface for loading different text files.
- Options to customize colors, fonts, and motion parameters.
- Enhanced performance optimizations for handling larger texts.
