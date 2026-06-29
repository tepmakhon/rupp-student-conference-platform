import fs from "fs";

const files = fs.readdirSync("src/modules", { recursive: true });

console.log("Extracting routes...");
