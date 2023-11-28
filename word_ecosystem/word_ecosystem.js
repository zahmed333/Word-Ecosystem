let wordCounts = {};
let wordList = [];
const stopWords = [
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at", "american", 
    "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", 
    "could", "did", "do", "does", "doing", "down", "during", 
    "each", "few", "for", "from", "further", 
    "had", "has", "have", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's",
    "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "it", "it's", "its", "itself", "immigration", "immigrant", 
    "me", "more", "most", "my", "myself",
    "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own",
    "she", "she'd", "she'll", "she's", "should", "so", "some", "such", 
    "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too",
    "under", "until", "up",
    "was", "we", "we'd", "we'll", "we're", "we've", "were", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "would",
    "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"
];


function preload() {
  let txt = loadStrings('yourfile.txt', processText);
}

function setup() {
  createCanvas(windowWidth, windowHeight);  
  for (let word in wordCounts) {
    wordList.push(new Word(word, wordCounts[word]));
  }
  setTimeout(function() {
    window.location.reload();
  }, 60000);
}

function draw() {
  background(0);
  
  for (let w of wordList) {
    w.move();
    w.display();
  }
  
  for (let i = wordList.length - 1; i >= 0; i--) {
    wordList[i].lifeSpan -= 0.2;
    if (wordList[i].lifeSpan <= 0) {
      wordList.splice(i, 1);
    }
  }

  handleCollisions();
}

function processText(txt) {
  let allText = txt.join(" ");
  let tokens = allText.split(/\W+/);

  for (let word of tokens) {
    word = word.toLowerCase();
    if (word.length > 0 && !stopWords.includes(word)) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  }
}

function handleCollisions() {
  for (let i = 0; i < wordList.length; i++) {
    for (let j = i + 1; j < wordList.length; j++) {
      if (wordList[i].intersects(wordList[j])) {
        if (wordList[i].count > wordList[j].count) {
          wordList.push(new Word(wordList[i].word, 1));
          wordList[wordList.length - 1].lifeSpan = 255; // reset lifespan of the new word
          wordList[j].count--;
          if (wordList[j].count <= 0) {
            wordList.splice(j, 1);
          }
        } else {
          wordList.push(new Word(wordList[j].word, 1));
          wordList[wordList.length - 1].lifeSpan = 255; // reset lifespan of the new word
          wordList[i].count--;
          if (wordList[i].count <= 0) {
            wordList.splice(i, 1);
          }
        }
      }
    }
  }
}

class Word {
  constructor(word, count) {
    this.word = word;
    this.count = count;
    this.textSize = count * 10;
    this.calculatePosition();
    this.speed = map(this.count, 1, max(Object.values(wordCounts)), 0.5, 3);
    this.xSpeed = random(-this.speed, this.speed);
    this.ySpeed = random(-this.speed, this.speed);
    this.lifeSpan = 255; // for aging and dying
    this.color = color(random(100, 255), random(50, 200), random(100, 255));
    this.growthRate = map(this.count, 1, max(Object.values(wordCounts)), 0.05, 0.5); // Adjusted for faster growth
  }

  calculatePosition() {
    textSize(this.textSize);
    let textW = textWidth(this.word);
    this.x = random(textW / 2, width - textW / 2);
    this.y = random(this.textSize, height - this.textSize);
  }
  
  attract(other) {
    let force = createVector(other.x - this.x, other.y - this.y);
    let distance = force.mag();
    distance = constrain(distance, 5, 25);
    force.normalize();
    let strength = (0.1 * this.count * other.count) / (distance * distance);
    force.mult(strength);
    if (distance < 20) {
      force.mult(-1);
    }
    return force;
  }

  intersects(other) {
    let distance = dist(this.x, this.y, other.x, other.y);
    return distance < (this.textSize / 2 + other.textSize / 2);
  }

  move() {
    for (let other of wordList) {
      if (other !== this) {
        let force = this.attract(other);
        this.xSpeed += force.x;
        this.ySpeed += force.y;
      }
    }
    
        // If this word is the biggest, slow its growth rate significantly
    if (this.textSize >= max(wordList.map(w => w.textSize))) {
      this.growthRate = 0.01; // adjustable
    }
    
    // Increase the word size
    this.textSize += this.growthRate;

    // To keep it from growing indefinitely
    this.textSize = constrain(this.textSize, 1, 150); // Adjusted the upper limit for bigger sizes
    
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);

    // Screen boundary check
    if (this.x > width || this.x < 0) {
      this.xSpeed *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.ySpeed *= -1;
    }
    
    this.xSpeed = constrain(this.xSpeed, -this.speed, this.speed);
    this.ySpeed = constrain(this.ySpeed, -this.speed, this.speed);

  }

  display() {
    textSize(this.textSize);
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifeSpan);
    text(this.word, this.x, this.y);
  }
}
