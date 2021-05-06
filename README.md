# DndSpellCardGenerator

## Deploy to Github Pages
```cmd
ng build --prod
git add dist
git commit -m ""
git subtree push --prefix dist/dnd-spell-card-generator/ origin gh-pages
```
For Force Push use
```cmd
git push origin `git subtree split --prefix dist/dnd-spell-card-generator/ master`:gh-pages --force
```

## Serve Locally
```cmd
ng serve --baseHref=dnd-spell-card-generator --open
```
