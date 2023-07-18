const fs = require('fs');
const matter = require('gray-matter');

// Function to read and parse the Markdown files
const readMarkdownFiles = (folderPath) => {
  const files = fs.readdirSync(folderPath);
  const jsonData = [];

  files.forEach((file, index) => {
    const filePath = `${folderPath}/${file}`;
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    console.log(`file: ${file}`);
    console.log('---');
    console.log('Front Matter:', data);
    console.log('Content:', content);
    console.log('---');

    jsonData.push({
      id: index + 1, // Assign a unique ID to each blog post
      title: data.title,
      date: data.date,
      content,
    });
  });

  return jsonData;
};

const folderPath = '../my-blog/src/posts';
// Generate JSON Data from Markdown Files
const jsonData = readMarkdownFiles(folderPath);
// Convert JSON to String
const jsonContent = JSON.stringify(jsonData, null, 2);
// Path to output JSON File
const outputFilePath = '../my-blog/public/data/output.json';
// Write JSON data to output File
fs.writeFileSync(outputFilePath, jsonContent);

console.log('JSON file generated successfully!');
