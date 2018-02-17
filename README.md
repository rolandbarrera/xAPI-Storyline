# xAPI-Storyline

### This script is a proof in concept that shows how to send an xAPI statement then retrieve it from the LRS and display portions as text in storyline.

## Basic Instructions for use

1. Download and open [xapi-storyline.story](hxapi-storyline.story)
2. Edit LRS Variables with your LRS info: (leave other variables alone for now)
    * lrsendPoint
    * lrsuserName
    * lrspassWord
    
3. Save file and publish.
4. copy [xapi-storyline.js](xapi-storyline.js) into the story_content folder located in you published directory. 
5. Open story.html in text editor and add these lines to line 123.  (line 78 of story_html5.html)

```html
<script src="https://rawgit.com/RusticiSoftware/TinCanJS/master/build/tincan-min.js" type="text/javascript"></script>
<script src="story_content/xapi-storyline.js" type="text/javascript"></script>
```
6. View story.html or story_html5.html in browser

## Advanced Instructions for use
Coming Soon
