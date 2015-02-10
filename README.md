#Arrow-Browse

## What is it?

  A Chrome Extension that searches pages for elements, filters those elements for references to 'prev' or 'next' and binds those elements to event listeners on the left/right arrow keys that trigger a click event. Its handy if you're browsing tutorials, webcomics, videos or forums. Obviously its limited by the structure of the page it is running on; the page must have a <a> or <button> element containing "prev" or "next" in its outer HTML.

## What is in it?

content.js runs on the background page, it gets the settings saved in storage, finds the elements, searches for "prev" and "next" and in the darkness binds them (just like the one ring). 

extension.html is the popup which contains information about the background page's prev/next elements.

extension.js runs on the extension pop-up and communicates with content.js via messages to the background pages DOM. It gets and saves settings to chrome storage and alerts the content script to reload on a setting update. It requests the target elements from prev-next.js and inserts them in prev-next.html

options.html and options.js make up the UI available in the chrome extensions page and are basically the 

##  Contacts
    Me: Ben
    Email: thegassworks@gmail.com