const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..", "..", "..");
const readmePath = path.join(repoRoot, "README.md");

function readJsonFromStdin() {
  return new Promise((resolve, reject) => {
    let input = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      input += chunk;
    });
    process.stdin.on("end", () => {
      if (!input.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(input));
      } catch (error) {
        reject(error);
      }
    });
  });
}

function referencesReadme(event) {
  const args =
    event.tool_input ??
    event.toolArgs ??
    event.tool_args ??
    event.toolInput ??
    {};

  let serialized;
  try {
    serialized =
      typeof args === "string" ? args : JSON.stringify(args, null, 2);
  } catch {
    serialized = "";
  }

  return /\breadme\.md\b/i.test(serialized);
}

function localTimestamp() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  const offsetMinutes = -now.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absoluteOffset = Math.abs(offsetMinutes);
  const hours = pad(Math.floor(absoluteOffset / 60));
  const minutes = pad(absoluteOffset % 60);

  return (
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ` +
    `${sign}${hours}:${minutes}`
  );
}

function updateReadmeComment() {
  const current = fs.readFileSync(readmePath, "utf8");
  const commentPattern =
    /^<!--\s*\r?\nAuthor:\s*Sid\r?\nModification date:\s*[^\r\n]+\r?\n-->\r?\n?/;
  const nextComment =
    `<!--\nAuthor: Sid\nModification date: ${localTimestamp()}\n-->\n`;
  const content = commentPattern.test(current)
    ? current.replace(commentPattern, nextComment)
    : nextComment + current;

  if (content !== current) {
    fs.writeFileSync(readmePath, content, "utf8");
  }
}

readJsonFromStdin()
  .then((event) => {
    if (fs.existsSync(readmePath) && referencesReadme(event)) {
      updateReadmeComment();
    }
    process.stdout.write("{}");
  })
  .catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
