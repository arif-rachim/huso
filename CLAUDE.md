# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js project named "huso" that appears to be in early development stages. The main entry point is `index.js` which currently contains a simple console log message.

## Commands

### Running the Application
```bash
node index.js
```

### Package Management
```bash
npm install    # Install dependencies (when added)
```

### Testing
Currently no test framework is configured. The default test script will fail with "Error: no test specified".

## Project Structure

```
.
├── index.js           # Main entry point - currently just logs "Happy developing ✨"
├── package.json       # Node.js package configuration
└── docs/              # Educational materials (PDF documents)
    ├── biology.pdf
    ├── chemistry.pdf
    ├── earth-science.pdf
    ├── HUSO ME (Innoventures Education).pdf
    ├── math.pdf
    └── physics.pdf
```

## Development Notes

- This appears to be an educational project based on the PDF materials in the docs/ folder
- The project is currently minimal with no dependencies, test framework, or build process
- Consider adding appropriate scripts to package.json as the project develops
- No linting, formatting, or build tools are currently configured