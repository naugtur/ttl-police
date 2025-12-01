# ttl-police

enforcement for temporary changes to be temporary

## Usage

```bash
ttl-police [options] [glob]
```

Check the specified glob for files with comments declaring temporary changes and alert if their time-to-live has expired.

### options

- `glob`: glob pattern to check (default: `./*`).
- `-h`, `--help`: Show help message and exit.
- `--ttl DAYS`: Set the time-to-live in days for temporary changes (default: 7 days).
- `--i-made-new-unenforceable-promises`: Update the .ttl-police file with current temporary comments without throwing errors. The flag is deliberately annoying to type.

### Comment Format

Comments declaring temporary changes should follow this format:

```
TEMPORARY(YYYY-MM-DD): description of the change
```

Where `YYYY-MM-DD` is the creation date of the temporary change.

## Warnings

The tool will complain about the following:

- Temporary changes that have exceeded their time-to-live.
- Temporary comment has a date in the future.
- New mentions of the word temporary not following the convention were added.

## Technical notes

- uses Node.js built-in globbing for `glob` argument
- reads files as UTF-8 text
- keeps all known occurences of the word "temporary" in a .ttl-police file in the current working directory
