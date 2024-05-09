// Selecting DOM
let textArea = document.getElementById("text-input");
let charCounter = document.querySelector(".character-counter");
let wordCounter = document.querySelector(".word-counter");
let  sentenceCounter = document.querySelector(".sentence-counter");
let  paragraphCounter = document.querySelector(".paragraph-counter");
let  pageCounter = document.querySelector(".page-counter");
let  lineCounter = document.querySelector(".line-counter");
let  columnCounter = document.querySelector(".column-counter");
let  spaceCounter = document.querySelector(".space-counter");

const stopWords = [
    "a", "about", "after", "all", "also", "an", "and", "any", "as", "at", "be", "because", "been", "but", 
    "by", "can", "could", "do", "each", "for", "from", "has", "have", "had", "he", "her", "his", "how", 
    "I", "if", "in", "is", "it", "its", "just", "like", "me", "my", "no", "not", "now", "of", "on", "or", 
    "our", "out", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", 
    "this", "to", "too", "up", "us", "are", "very", "was", "we", "were", "what", "when", "where", "which", "who", 
    "will", "with", "would", "you", "your"
];
const specialCharacters = [
    "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~", "\n", " ", ".",
];

let wordStorage = [];

let counter = 0;

textArea.addEventListener("input", updateCounters);
textArea.addEventListener("focus", () => {
    updateCounters();
    frequency(textArea.value);
});
textArea.addEventListener("blur", () => {
    updateCounters();
    frequency(textArea.value);
});




function updateCounters() {
    if(textArea.value === "") {
        return;
    }
        // Character Counter
    let char = textArea.value.split("").length;
    charCounter.textContent = char;

    // Words Counter 
    let words = textArea.value.trim().split(" ").filter(word => !stopWords.includes(word.toLowerCase()) && !specialCharacters.includes(word) && word !== "\n\n\n\n").length;
    wordCounter.textContent = words;
    // Sentences Counter

    let sentences = textArea.value.split(".").filter(sentence => sentence !== "\n" && sentence.length >= 10).length;
    sentenceCounter.textContent = sentences;
    // Paragraph Counter
    let paragraphs = textArea.value.split("\n").filter(para => para !== "").length;
    paragraphCounter.textContent = paragraphs;

    pageCounter.textContent = calculatePages(words);
    lineCounter.textContent = countLines(textArea.value);
    spaceCounter.textContent = countWhiteSpaces(textArea.value);

}

updateCounters();


// Frequency Words

function frequency(words) {

    let wordOccurrences = {};

    words.replaceAll(",","").split(" ").filter(word => !stopWords.includes(word.toLowerCase()) && !specialCharacters.includes(word)).map(word => word.replace(".", '').replace('\n', "")).forEach((word,index) => {
        wordOccurrences[word.toLowerCase()] = (wordOccurrences[word.toLowerCase()] || 0) + 1;
    })

    const sortedWords = Object.keys(wordOccurrences).sort();

    sortedWords.forEach((word) => {
        if (word !== "") {
            const occurrences = wordOccurrences[word];
            let row = document.createElement("div");
            row.classList.add("row");

            let keyword = document.createElement("span");
            keyword.classList.add("word");
            keyword.textContent = word.substring(0,1).toUpperCase() + word.substring(1).replace(".", "");

            let occurrence = document.createElement("span");
            occurrence.classList.add("occurrence");
            occurrence.textContent = occurrences;

            row.appendChild(keyword)
            row.appendChild(occurrence)
            document.querySelector(".keywords-table").appendChild(row);
        }
    });
}

frequency(textArea.value);




function calculatePages(words) {
    const totalPages = Math.ceil(words / 250);
    return totalPages;
}



function countLines(text) {
    let lines = text.split("\n").length;
    return lines;
}

function countWhiteSpaces(text) {
    let spaces = text.split(/s+/g).length;
    return spaces;
}



document.querySelector(".refresh").onclick = () => {
    window.location.reload();
}
document.querySelector(".clear").onclick = () => {
    textArea.value = '';
    window.location.reload();
}