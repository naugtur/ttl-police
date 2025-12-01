#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { glob } from "node:fs/promises";
import { resolve } from "node:path";
import { cwd, exit, argv } from "node:process";
import { parseArgs } from "node:util";

const TTL_POLICE_FILE = ".ttl-police";
const DEFAULT_TTL_DAYS = 7;
const TEMPORARY_REGEX = /TEMPORARY\((\d{4}-\d{2}-\d{2})\):\s*(.+)/gi;
const TEMPORARY_WORD_REGEX = /temporary/gi;

let NOW = new Date();

function parseCliArgs() {
  const { values, positionals } = parseArgs({
    args: argv.slice(2),
    options: {
      help: {
        type: "boolean",
        short: "h",
      },
      ttl: {
        type: "string",
      },
      "i-made-new-unenforceable-promises": {
        type: "boolean",
      },
      "--TEST_DATE_OVERRIDE": {
        type: "string",
      },
    },
    allowPositionals: true,
  });

  const options = {
    location: positionals[0] || "./*",
    ttl: DEFAULT_TTL_DAYS,
    updateMode: values["i-made-new-unenforceable-promises"] || false,
    help: values.help || false,
    testDateOverride: values["--TEST_DATE_OVERRIDE"] || null,
  };

  if (options.testDateOverride) {
    NOW = new Date(options.testDateOverride);
  }

  if (values.ttl) {
    const ttlValue = parseInt(values.ttl);
    if (isNaN(ttlValue) || ttlValue <= 0) {
      console.error("Error: TTL must be a positive number");
      exit(1);
    }
    options.ttl = ttlValue;
  }

  return options;
}

function showHelp() {
  console.log(`ttl-police

enforcement for temporary changes to be temporary

Usage: ttl-police [options] [location]

Check the specified location for files with comments declaring temporary changes 
and alert if their time-to-live has expired.

Options:
  location                                    path or glob pattern to check (default: current directory)
  -h, --help                                 Show help message and exit
  --ttl DAYS                                 Set the time-to-live in days for temporary changes (default: 7 days)
  --i-made-new-unenforceable-promises       Update the .ttl-police file with current temporary comments without throwing errors

Comment Format:
  TEMPORARY(YYYY-MM-DD): description of the change

Where YYYY-MM-DD is the creation date of the temporary change.`);
}

async function loadKnownTemporaries() {
  try {
    const content = await readFile(TTL_POLICE_FILE, "utf-8");
    return new Set(content.split("\n").filter((line) => line.trim()));
  } catch {
    return new Set();
  }
}

async function saveKnownTemporaries(temporaries) {
  const content = Array.from(temporaries).join("\n");
  await writeFile(TTL_POLICE_FILE, content, "utf-8");
}

function parseDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${dateString}`);
  }
  return date;
}

function daysSince(date) {
  const diffTime = NOW - date;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

async function processFile(
  filePath,
  options,
  knownTemporaries,
  newTemporaries
) {
  try {
    const content = await readFile(filePath, "utf-8");
    const lines = content.split("\n");
    let hasErrors = false;

    // Check for TEMPORARY comments
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let match;

      TEMPORARY_REGEX.lastIndex = 0;
      if (TEMPORARY_REGEX.test(line)) {
        while ((match = TEMPORARY_REGEX.exec(line)) !== null) {
          const [fullMatch, dateString, description] = match;
          const temporaryKey = `${filePath}:${i + 1}:${fullMatch}`;

          newTemporaries.add(temporaryKey);

          try {
            const date = parseDate(dateString);
            const days = daysSince(date);

            if (days < 0) {
              console.error(
                `❌ ${filePath}:${
                  i + 1
                }: Temporary comment has a date in the future: ${dateString}`
              );
              hasErrors = true;
            } else if (days > options.ttl) {
              console.error(
                `❌ ${filePath}:${
                  i + 1
                }: Temporary change expired ${days} days ago (TTL: ${
                  options.ttl
                } days): ${description.trim()}`
              );
              hasErrors = true;
            }
          } catch (error) {
            console.error(`❌ ${filePath}:${i + 1}: ${error.message}`);
            hasErrors = true;
          }
        }
      } else {
        // Check for non-conforming "temporary" mentions
        let wordMatch;
        while ((wordMatch = TEMPORARY_WORD_REGEX.exec(line)) !== null) {
          const wordKey = `${filePath}:${i + 1}:temporary`;

          // Skip if this line already has a proper TEMPORARY comment
          TEMPORARY_REGEX.lastIndex = 0;
          if (TEMPORARY_REGEX.test(line)) {
            continue;
          }

          if (!knownTemporaries.has(wordKey)) {
            console.error(
              `❌ ${filePath}:${
                i + 1
              }: New mention of "temporary". Use the convention TEMPORARY(YYYY-MM-DD): description`
            );
            hasErrors = true;
          }

          newTemporaries.add(wordKey);
        }
      }
    }

    return hasErrors;
  } catch (error) {
    console.error(`❌ Failed to read ${filePath}: ${error.message}`);
    return true;
  }
}

async function findFiles(location) {
  try {
    const files = [];
    for await (const file of glob(location, {
      cwd: cwd(),
      exclude: ["node_modules/*", ".git/*"],
    })) {
      files.push(resolve(file));
    }

    return files;
  } catch (error) {
    console.error(`❌ Failed to find files: ${error.message}`);
    return [];
  }
}

async function main() {
  const options = parseCliArgs();

  if (options.help) {
    showHelp();
    return;
  }

  const knownTemporaries = await loadKnownTemporaries();
  const newTemporaries = new Set();
  let hasErrors = false;

  const files = await findFiles(options.location);

  if (files.length === 0) {
    console.error(`❌ No files found matching: ${options.location}`);
    exit(1);
  }

  for (const file of files) {
    const fileHasErrors = await processFile(
      file,
      options,
      knownTemporaries,
      newTemporaries
    );
    hasErrors = hasErrors || fileHasErrors;
  }

  if (hasErrors && !options.updateMode) {
    exit(1);
  }

  if (options.updateMode) {
    await saveKnownTemporaries(newTemporaries);
    console.log("✅ Updated .ttl-police file with known mentions of temporary");
  } else if (!hasErrors) {
    console.log("✅ No expired temporary changes found");
  }
}

main().catch((error) => {
  console.error(`❌ Unexpected error: ${error.message}`);
  exit(1);
});
