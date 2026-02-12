#!/bin/bash
# make-it-mine.sh — Transform this scaffold into your project
# Run this once after cloning to personalize the project.

set -e

echo ""
echo "  Make It Mine"
echo "  Turn this scaffold into your project."
echo ""

# Prompt for project name
read -p "  Project name (e.g., my-cool-app): " PROJECT_NAME

if [ -z "$PROJECT_NAME" ]; then
  echo "  No project name provided. Exiting."
  exit 1
fi

# Slugify the name for package.json (lowercase, dashes)
SLUG=$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-')

echo ""
echo "  Setting up: $PROJECT_NAME ($SLUG)"
echo ""

# 1. Update package.json name
if [ -f package.json ]; then
  # Use node for reliable JSON manipulation
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    pkg.name = '$SLUG';
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
  "
  echo "  Updated package.json name to: $SLUG"
fi

# 2. Update content/en.json title
if [ -f content/en.json ]; then
  node -e "
    const fs = require('fs');
    const content = JSON.parse(fs.readFileSync('content/en.json', 'utf8'));
    content.app.title = '$PROJECT_NAME';
    content.app.tagline = 'Built with Investiture';
    fs.writeFileSync('content/en.json', JSON.stringify(content, null, 2) + '\n');
  "
  echo "  Updated content/en.json title to: $PROJECT_NAME"
fi

# 3. Regenerate CLAUDE.md if install.sh exists
if [ -f install.sh ]; then
  rm -f CLAUDE.md
  bash install.sh 2>/dev/null | grep -q "CLAUDE.md" && true
  echo "  Regenerated CLAUDE.md"
fi

# 4. Ask about removing examples
echo ""
read -p "  Remove the examples/ folder? (y/N): " REMOVE_EXAMPLES

if [ "$REMOVE_EXAMPLES" = "y" ] || [ "$REMOVE_EXAMPLES" = "Y" ]; then
  rm -rf examples/
  # Remove examples script from package.json
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    delete pkg.scripts.examples;
    delete pkg.scripts['build:examples'];
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
  "
  echo "  Removed examples/"
fi

# 5. Ask about fresh git history
echo ""
read -p "  Reset git history? This gives you a clean start. (y/N): " RESET_GIT

if [ "$RESET_GIT" = "y" ] || [ "$RESET_GIT" = "Y" ]; then
  rm -rf .git
  git init
  git add .
  git commit -m "Initial commit — $PROJECT_NAME, built on Investiture"
  echo "  Fresh git history created"
fi

# 6. Ask about creating a GitHub repo
echo ""
if command -v gh &> /dev/null; then
  read -p "  Create a GitHub repo for $SLUG? (y/N): " CREATE_REPO

  if [ "$CREATE_REPO" = "y" ] || [ "$CREATE_REPO" = "Y" ]; then
    read -p "  Public or private? (public/private): " VISIBILITY
    VISIBILITY=${VISIBILITY:-private}
    gh repo create "$SLUG" --"$VISIBILITY" --source=. --push
    echo "  GitHub repo created and pushed"
  fi
fi

# Done
echo ""
echo "  Your project $PROJECT_NAME is ready."
echo ""
echo "  Next steps:"
echo "    npm start              — Launch your app"
echo "    claude                 — Open Claude Code"
echo "    git add . && git commit -m 'my changes'  — Save your work"
echo ""
