//the following event is triggered when the page is fully loaded.
document.addEventListener('DOMContentLoaded', function () {
    //Selecting various HTML elements by their ID's 
    //shows up as the main item in the screen ready to start the quiz
    var startBtn = document.getElementById('start-btn');
    //this adds the quiz sreen once the start button is elected
    var quizScreen = document.getElementById('quiz-screen');
    //this is shwon once the quiz has ended
    var endScreen = document.getElementById('end-screen');
    //this shows the count down time when the quiz has started
    var timerDisplay = document.getElementById('time');
    //this displays the submit answer button on ineractive conding challenges
    var submitBtn = document.getElementById('submit-btn');
    //the save button shows at the end when sacing your score and initials
    var saveBtn = document.getElementById('save-btn');
    //creates the space to do the code imput on the quiz
    var codeInput = document.getElementById('code-input');

    //Variables for the quiz and scoring
    //timer variable
    var timer;
    //Initial time in seconds
    var timeLeft = 90;
    //Index for current questions
    var currentQuestionIndex = 0;
    //score variable starting at zero
    var score = 0;

    //Array containing quiz questions, poppulated with question objects.
    var questions = [
        {
            //this is indicatin the type of question. 
            type: 'multiple-choice',
            //the question to display to the user
            question: 'What does the Window Object represent in JavaScript?',
            //array of options for the user to choose from
            options: ['The browser window', 'The current HTML document', 'The global environment'],
            //The correct answer to the question
            correctAnswer: 'The global environment'
        },
        {
            type: 'multiple-choice',
            question: 'What does the DOM Stand for in JavaScript?',
            options: ['Document Object Model', 'Data Object Model', 'Document Oriented Moduel'],
            correctAnswer: 'Document Object Model'
        },
        {
            type: 'multiple-choice',
            question: 'What is the purpose of the "use strict" directive in JavaScript?',
            options: ['Enforces a more strict set of rules for writing JavaScript', 'Allows the use of deprecated features', 'Declares a variable with strict scope'],
            correctAnswer: 'Enforces a more strict set of rules for writing JavaScript'
        },
        {
            type: 'multiple-choice',
            question: 'Which of the following is NOT a valid way to declare a JavaScript variable?',
            options: ['var x = 10;', 'var y = 20;', 'const z = 30;', 'variable w = 40;'],
            correctAnswer: 'variable w = 40;'
        },
        {
            type: 'coding',
            question: 'Write code to create a new div element and append it to the body:',
            codeChallenge: 'var newDiv = document.createElement(\'div\');\n// Your code here\n',
            correctCode: 'document.body.appendChild(newDiv);'
        },
        {
            type: 'multiple-choice',
            question: 'Which method is used to open a new browser window in JavaScript?',
            options: ['window.open()', 'document.open()', 'browser.newWindow()'],
            correctAnswer: 'window.open()'
        },
        {
            type: 'coding',
            question: 'Write a function to close the current browser window:',
            codeChallenge: ' // Your code here\n',
            correctCode: 'function closeWindow() {\n  window.close();\n}'
        },
        {
            type: 'multiple-choice',
            question: 'What is the purpose of the window.onload event?',
            options: ['To trigger an action when the window is resized', 'To execute code when the HTML document is fully loaded', 'To handle mouse click events on the window'],
            correctAnswer: 'To execute code when the HTML document is fully loaded'
        },
        {
            type: 'coding',
            question: 'Write code to change the title of the current window to "My New Title":',
            codeChallenge: ' // Your code here\n',
            correctCode: 'window.document.title = "My New Title";'
        },
        {
            type: 'multiple-choice',
            question: 'Which method is used to select all elements with a specific class name?',
            options: ['getElementById', 'getElementsByClassName', 'querySelector', 'querySelectorAll'],
            correctAnswer: 'getElementsByClassName'
        },
        {
            type: 'coding',
            question: 'Write code to select and log the text content of all paragraphs on the page:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var paragraphs = document.querySelectorAll(\'p\');\nparagraphs.forEach(paragraph => console.log(paragraph.textContent));'
        },
        {
            type: 'multiple-choice',
            question: 'What does the querySelector method return if no matching element is found?',
            options: ['null', 'undefined', 'false', '0'],
            correctAnswer: 'null'
        },
        {
            type: 'coding',
            question: 'Write a function that adds a CSS class "highlight" to all even-numbered list items (li elements):',
            codeChallenge: 'function highlightEvenItems() {\n// Your code here\n}',
            correctCode: 'function highlightEvenItems() {\n  var listItems = document.querySelectorAll(\'li:nth-child(even)\');\n  listItems.forEach(item => item.classList.add(\'highlight\'));\n}'
        },
        {
            type: 'multiple-choice',
            question: 'What does the parentNode property return?',
            options: ['The previous sibling element', 'The parent element', 'The first child element', 'The last child element'],
            correctAnswer: 'The parent element'
        },
        {
            type: 'coding',
            question: 'Write code to change the background color of the body element to "lightblue":',
            codeChallenge: '// Your code here\n',
            correctCode: 'document.body.style.backgroundColor = "lightblue";'
        },
        {
            type: 'multiple-choice',
            question: 'Which method is used to remove an HTML element from the DOM?',
            options: ['removeElement', 'deleteElement', 'removeChild', 'discardElement'],
            correctAnswer: 'removeChild'
        },
        {
            type: 'coding',
            question: 'Write a function to find and return the total number of paragraphs in the document:',
            codeChallenge: 'function countParagraphs() {\n// Your code here\n}',
            correctCode: 'function countParagraphs() {\n  var paragraphs = document.querySelectorAll(\'p\');\n  return paragraphs.length;\n}'
        },
        {
            type: 'multiple-choice',
            question: 'Which method is used to set an attribute value in JavaScript?',
            options: ['setAttribute', 'updateAttribute', 'changeAttribute', 'modifyAttribute'],
            correctAnswer: 'setAttribute'
        },
        {
            type: 'coding',
            question: 'Write code to set the "src" attribute of an image element with the ID "myImage" to "image.jpg":',
            codeChallenge: '// Your code here\n',
            correctCode: 'var imageElement = document.getElementById(\'myImage\');\nimageElement.setAttribute(\'src\', \'image.jpg\');'
        },
        {
            type: 'multiple-choice',
            question: 'What does the "dataset" property allow you to do?',
            options: ['Access and manipulate data attributes', 'Set CSS styles directly', 'Retrieve element dimensions', 'Access event-related properties'],
            correctAnswer: 'Access and manipulate data attributes'
        },
        {
            type: 'coding',
            question: 'Write a function that sets the "disabled" attribute of a button with the ID "myButton":',
            codeChallenge: 'function disableButton() {\n// Your code here\n}',
            correctCode: 'function disableButton() {\n  var buttonElement = document.getElementById(\'myButton\');\n  buttonElement.setAttribute(\'disabled\', \'true\');\n}'
        },
        {
            type: 'multiple-choice',
            question: 'Which method is used to remove an attribute in JavaScript?',
            options: ['deleteAttribute', 'removeAttribute', 'discardAttribute', 'eraseAttribute'],
            correctAnswer: 'removeAttribute'
        },
        {
            type: 'coding',
            question: 'Write code to remove the "href" attribute from a link with the class "external":',
            codeChallenge: '// Your code here\n',
            correctCode: 'var linkElement = document.querySelector(\'.external\');\nlinkElement.removeAttribute(\'href\');'
        },
        {
            type: 'multiple-choice',
            question: 'What does the "value" property allow you to do in relation to form elements?',
            options: ['Retrieve or set the value of form elements', 'Change the font size of form elements', 'Access the parent form of an element', 'Disable form validation'],
            correctAnswer: 'Retrieve or set the value of form elements'
        },
        {
            type: 'coding',
            question: 'Write a function that sets the value of an input element with the ID "username" to "JohnDoe":',
            codeChallenge: 'function setUsername() {\n// Your code here\n}',
            correctCode: 'function setUsername() {\n  var usernameInput = document.getElementById(\'username\');\n  usernameInput.value = \'JohnDoe\';\n}'
        },
        {
            type: 'multiple-choice',
            question: 'Which method is used to create a new HTML element in JavaScript?',
            options: ['createElement', 'createNode', 'newElement', 'makeElement'],
            correctAnswer: 'createElement'
        },
        {
            type: 'coding',
            question: 'Write code to create a new paragraph element and append it to a div with the ID "content":',
            codeChallenge: '// Your code here\n',
            correctCode: 'var newParagraph = document.createElement(\'p\');\ndocument.getElementById(\'content\').appendChild(newParagraph);'
        },
        {
            type: 'multiple-choice',
            question: 'What does the "appendChild" method do in JavaScript?',
            options: ['Appends a child element to a parent element', 'Removes the last child element', 'Modifies the content of an element', 'Hides the element from the DOM'],
            correctAnswer: 'Appends a child element to a parent element'
        },
        {
            type: 'coding',
            question: 'Write a function that creates a new list item element and appends it to an unordered list with the ID "myList":',
            codeChallenge: 'function appendListItem() {\n// Your code here\n}',
            correctCode: 'function appendListItem() {\n  var newListitem = document.createElement(\'li\');\n  document.getElementById(\'myList\').appendChild(newListitem);\n}'
        },
        {
            type: 'multiple-choice',
            question: 'What is the purpose of the "cloneNode" method in JavaScript?',
            options: ['Creates a copy of a node', 'Deletes a node from the DOM', 'Moves a node to a different location', 'Modifies the attributes of a node'],
            correctAnswer: 'Creates a copy of a node'
        },
        {
            type: 'coding',
            question: 'Write code to create a copy of an existing div element with the ID "originalDiv" and append it to the body:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var originalDiv = document.getElementById(\'originalDiv\');\nvar clonedDiv = originalDiv.cloneNode(true);\ndocument.body.appendChild(clonedDiv);'
        },
        {
            type: 'multiple-choice',
            question: 'Which property is used to access the parent node of an element in JavaScript?',
            options: ['parentNode', 'parentElement', 'parent', 'elementParent'],
            correctAnswer: 'parentNode'
        },
        {
            type: 'coding',
            question: 'Write a function that creates a new header element (h2) with the text "Hello" and appends it to the body:',
            codeChallenge: 'function appendHeader() {\n// Your code here\n}',
            correctCode: 'function appendHeader() {\n  var newHeader = document.createElement(\'h2\');\n  newHeader.textContent = \'Hello\';\n  document.body.appendChild(newHeader);\n}'
        },
        {
            type: 'multiple-choice',
            question: 'Which method is used to repeatedly execute a function at specified intervals?',
            options: ['setInterval', 'setTimeout', 'setRepeat', 'executeInterval'],
            correctAnswer: 'setInterval'
        },
        {
            type: 'coding',
            question: 'Write code to set an interval that logs "Hello, World!" every 2 seconds:',
            codeChallenge: '// Your code here\n',
            correctCode: 'setInterval(() => { console.log("Hello, World!"); }, 2000);'
        },
        {
            type: 'multiple-choice',
            question: 'What does the "clearInterval" method do in JavaScript?',
            options: ['Stops the execution of a function at specified intervals', 'Clears the console log', 'Removes an element from the DOM', 'Stops the execution of a repeating function set by setInterval'],
            correctAnswer: 'Stops the execution of a repeating function set by setInterval'
        },
        {
            type: 'coding',
            question: 'Write code to clear the interval set in the previous example:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var intervalId = setInterval(() => { console.log("Hello, World!"); }, 2000);\nclearInterval(intervalId);'
        },
        {
            type: 'multiple-choice',
            question: 'How does the setInterval method handle asynchronous code?',
            options: ['It executes asynchronously', 'It waits for asynchronous code to complete', 'It does not support asynchronous code', 'It throws an error with asynchronous code'],
            correctAnswer: 'It does not support asynchronous code'
        },
        {
            type: 'coding',
            question: 'Write a function that sets an interval to increase a counter variable by 1 every second:',
            codeChallenge: 'var counter = 0;\n// Your code here\n',
            correctCode: 'var counter = 0;\nsetInterval(() => { counter++; }, 1000);'
        },
        {
            type: 'multiple-choice',
            question: 'What is the purpose of the "setTimeout" method in JavaScript?',
            options: ['Executes a function after a specified delay', 'Repeats a function at specified intervals', 'Controls the speed of animations', 'Measures the time taken by a function'],
            correctAnswer: 'Executes a function after a specified delay'
        },
        {
            type: 'coding',
            question: 'Write code to create a timeout that alerts "Time\'s up!" after 5 seconds:',
            codeChallenge: '// Your code here\n',
            correctCode: 'setTimeout(() => { alert("Time\'s up!"); }, 5000);'
        },
        {
            type: 'multiple-choice',
            question: 'Which method is used to attach an event listener to an HTML element in JavaScript?',
            options: ['addEventListener', 'attachEvent', 'onEvent', 'listenEvent'],
            correctAnswer: 'addEventListener'
        },
        {
            type: 'coding',
            question: 'Write code to add a click event listener to a button element with the id "myButton" that alerts "Button clicked!":',
            codeChallenge: '// Your code here\n',
            correctCode: 'var myButton = document.getElementById("myButton");\nmyButton.addEventListener("click", () => { alert("Button clicked!"); });'
        },
        {
            type: 'multiple-choice',
            question: 'What does the "event" object contain in the context of an event listener?',
            options: ['Information about the event', 'HTML element triggering the event', 'CSS styles of the element', 'Event handler function'],
            correctAnswer: 'Information about the event'
        },
        {
            type: 'coding',
            question: 'Write code to prevent the default behavior of a form submission when the submit button is clicked:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var form = document.getElementById("myForm");\nform.addEventListener("submit", (event) => { event.preventDefault(); });'
        },
        {
            type: 'multiple-choice',
            question: 'Which of the following is a valid event type in JavaScript?',
            options: ['mouseEnter', 'keyPress', 'elementChange', 'windowLoad'],
            correctAnswer: 'keyPress'
        },
        {
            type: 'coding',
            question: 'Write code to log the key pressed when any key is pressed on the document:',
            codeChallenge: '// Your code here\n',
            correctCode: 'document.addEventListener("keydown", (event) => { console.log("Key pressed:", event.key); });'
        },
        {
            type: 'multiple-choice',
            question: 'What is event delegation in JavaScript?',
            options: ['Attaching multiple event listeners to an element', 'Delegating event handling to a parent element', 'Preventing events from bubbling', 'Triggering events programmatically'],
            correctAnswer: 'Delegating event handling to a parent element'
        },
        {
            type: 'coding',
            question: 'Write code to dynamically add a click event listener to all list items inside an unordered list with the id "myList":',
            codeChallenge: '// Your code here\n',
            correctCode: 'var listItems = document.getElementById("myList").querySelectorAll("li");\nlistItems.forEach(item => { item.addEventListener("click", () => { alert("List item clicked!"); }); });'
        },
        {
            type: 'multiple-choice',
            question: 'What does the method `preventDefault()` do in the context of an event in JavaScript?',
            options: ['Stops the event from propagating', 'Prevents the default browser behavior', 'Triggers the default behavior', 'Adds a default action to the event'],
            correctAnswer: 'Prevents the default browser behavior'
        },
        {
            type: 'coding',
            question: 'Write code to prevent the default behavior of a right-click on an image element with the id "myImage":',
            codeChallenge: '// Your code here\n',
            correctCode: 'var myImage = document.getElementById("myImage");\nmyImage.addEventListener("contextmenu", (event) => { event.preventDefault(); });'
        },
        {
            type: 'multiple-choice',
            question: 'When might you want to use `preventDefault()`?',
            options: ['To force the default behavior', 'To speed up event propagation', 'To customize browser styles', 'To override the event type'],
            correctAnswer: 'To customize browser styles'
        },
        {
            type: 'coding',
            question: 'Write code to prevent the default form submission behavior when the submit button is clicked:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var form = document.getElementById("myForm");\nform.addEventListener("submit", (event) => { event.preventDefault(); });'
        },
        {
            type: 'multiple-choice',
            question: 'What is the purpose of using `preventDefault()` in a drag-and-drop scenario?',
            options: ['To disable drag-and-drop functionality', 'To enhance accessibility', 'To prevent elements from being dragged', 'To control the drop behavior'],
            correctAnswer: 'To control the drop behavior'
        },
        {
            type: 'coding',
            question: 'Write code to prevent the default behavior of a link with the class "external" when it is clicked:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var externalLink = document.querySelector(".external");\nexternalLink.addEventListener("click", (event) => { event.preventDefault(); });'
        },
        {
            type: 'multiple-choice',
            question: 'In a keyboard event, how can `preventDefault()` be useful?',
            options: ['To disable all keyboard events', 'To modify the pressed key', 'To prevent default key actions', 'To trigger additional key events'],
            correctAnswer: 'To prevent default key actions'
        },
        {
            type: 'coding',
            question: 'Write code to prevent the default behavior of the "copy" command when a user tries to copy content on the page:',
            codeChallenge: '// Your code here\n',
            correctCode: 'document.addEventListener("copy", (event) => { event.preventDefault(); });'
        },
        {
            type: 'multiple-choice',
            question: 'Which keyboard event is triggered when a key is pressed down?',
            options: ['keydown', 'keyup', 'keypress', 'keypressdown'],
            correctAnswer: 'keydown'
        },
        {
            type: 'coding',
            question: 'Write code to log the key that is pressed when any key is pressed on the document:',
            codeChallenge: '// Your code here\n',
            correctCode: 'document.addEventListener("keydown", (event) => { console.log(event.key); });'
        },
        {
            type: 'multiple-choice',
            question: 'What property of the event object contains the value of the pressed key?',
            options: ['event.char', 'event.value', 'event.keyCode', 'event.key'],
            correctAnswer: 'event.key'
        },
        {
            type: 'coding',
            question: 'Write code to change the background color to red when the "R" key is pressed:',
            codeChallenge: '// Your code here\n',
            correctCode: 'document.addEventListener("keydown", (event) => { if (event.key === "R") document.body.style.backgroundColor = "red"; });'
        },
        {
            type: 'multiple-choice',
            question: 'Which keyboard event is triggered when a key is released?',
            options: ['keydown', 'keyup', 'keypress', 'keyrelease'],
            correctAnswer: 'keyup'
        },
        {
            type: 'coding',
            question: 'Write code to prevent the default behavior when the "Enter" key is pressed inside a form element:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var form = document.getElementById("myForm");\nform.addEventListener("keydown", (event) => { if (event.key === "Enter") event.preventDefault(); });'
        },
        {
            type: 'multiple-choice',
            question: 'What is the purpose of the `event.ctrlKey` property in a keyboard event?',
            options: ['It indicates if the Control key is pressed', 'It specifies the event control type', 'It controls the event propagation', 'It checks if the key is a control character'],
            correctAnswer: 'It indicates if the Control key is pressed'
        },
        {
            type: 'coding',
            question: 'Write code to detect and log a combination of "Ctrl + S" key press:',
            codeChallenge: '// Your code here\n',
            correctCode: 'document.addEventListener("keydown", (event) => { if (event.ctrlKey && event.key === "S") console.log("Ctrl + S pressed"); });'
        },
        {
            type: 'multiple-choice',
            question: 'Which keyboard event is not fired repeatedly when a key is held down?',
            options: ['keydown', 'keyup', 'keypress', 'keyhold'],
            correctAnswer: 'keypress'
        },
        {
            type: 'coding',
            question: 'Write code to play a sound when the "Space" key is held down:',
            codeChallenge: '// Your code here\n',
            correctCode: 'document.addEventListener("keydown", (event) => { if (event.key === " ") { /* Code to play sound */ } });'
        },
        {
            type: 'multiple-choice',
            question: 'What is event bubbling in the context of the DOM?',
            options: [
                'An event propagates from the target element to its ancestors',
                'An event moves downward from an ancestor to the target element',
                'An event spreads horizontally across sibling elements',
                'An event occurs only at the target element'
            ],
            correctAnswer: 'An event propagates from the target element to its ancestors'
        },
        {
            type: 'coding',
            question: 'Write code to stop event propagation during the click event on a button:',
            codeChallenge: '// Your code here\n',
            correctCode: 'document.getElementById("myButton").addEventListener("click", (event) => { event.stopPropagation(); });'
        },
        {
            type: 'multiple-choice',
            question: 'Which method is used to prevent event propagation in JavaScript?',
            options: ['event.stopPropagation()', 'event.preventBubble()', 'event.haltPropagation()', 'event.cancelBubble()'],
            correctAnswer: 'event.stopPropagation()'
        },
        {
            type: 'coding',
            question: 'Write code to log the target element and its ancestors during the click event:',
            codeChallenge: '// Your code here\n',
            correctCode: 'document.body.addEventListener("click", (event) => { var currentElement = event.target; while (currentElement) { console.log(currentElement); currentElement = currentElement.parentElement; } });'
        },
        {
            type: 'multiple-choice',
            question: 'Which phase of event flow does event bubbling occur?',
            options: ['Capture phase', 'Target phase', 'Bubbling phase', 'Propagation phase'],
            correctAnswer: 'Bubbling phase'
        },
        {
            type: 'coding',
            question: 'Write code to attach a click event listener to a div element and log "Bubbling" during the bubbling phase:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var myDiv = document.getElementById("myDiv");\nmyDiv.addEventListener("click", (event) => { console.log("Bubbling"); }, false);'
        },
        {
            type: 'multiple-choice',
            question: 'What is the default value for the third parameter of the addEventListener method?',
            options: ['true', 'false', 'null', 'undefined'],
            correctAnswer: 'false'
        },
        {
            type: 'coding',
            question: 'Write code to demonstrate the use of event delegation using event bubbling:',
            codeChallenge: '// Your code here\n',
            correctCode: 'document.body.addEventListener("click", (event) => { if (event.target.tagName === "BUTTON") { /* Code for handling button click */ } });'
        },
        {
            type: 'multiple-choice',
            question: 'In which order do events get processed during event bubbling?',
            options: ['Capture order', 'Random order', 'Bubbling order', 'Alphabetical order'],
            correctAnswer: 'Bubbling order'
        },
        {
            type: 'coding',
            question: 'Write code to add an event listener during the capture phase:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var myElement = document.getElementById("myElement");\nmyElement.addEventListener("click", (event) => { console.log("Capturing phase"); }, true);'
        },
        {
            type: 'multiple-choice',
            question: 'What is the purpose of the data-* attribute in HTML?',
            options: [
                'To store custom data private to the page or application',
                'To create visible data on the webpage',
                'To link external data sources',
                'To define CSS styles for elements'
            ],
            correctAnswer: 'To store custom data private to the page or application'
        },
        {
            type: 'coding',
            question: 'Write code to access the value of the data-price attribute on an element with the id "product"',
            codeChallenge: '// Your code here\n',
            correctCode: 'var productElement = document.getElementById("product");\nvar priceValue = productElement.dataset.price;'
        },
        {
            type: 'multiple-choice',
            question: 'Which JavaScript method is used to access data attributes?',
            options: ['element.getAttribute()', 'element.dataset()', 'element.getData()', 'element.data()'],
            correctAnswer: 'element.dataset()'
        },
        {
            type: 'coding',
            question: 'Write code to set the data-color attribute on an element with the class "color-box" to "blue":',
            codeChallenge: '// Your code here\n',
            correctCode: 'var colorBox = document.querySelector(".color-box");\ncolorBox.dataset.color = "blue";'
        },
        {
            type: 'multiple-choice',
            question: 'How do you define a data attribute named "user-id" in HTML?',
            options: [
                '<div data-id="user-id">',
                '<div data-user-id>',
                '<div data:userid>',
                '<div data="user-id">'
            ],
            correctAnswer: '<div data-user-id>'
        },
        {
            type: 'coding',
            question: 'Write code to iterate over all elements with the data-category attribute set to "fruit" and log their values:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var fruitElements = document.querySelectorAll("[data-category=\"fruit\"]");\nfruitElements.forEach(element => console.log(element.dataset.category));'
        },
        {
            type: 'multiple-choice',
            question: 'What is the naming convention for data attributes?',
            options: [
                'camelCase (e.g., data-myAttribute)',
                'snake_case (e.g., data_my_attribute)',
                'PascalCase (e.g., data-MyAttribute)',
                'kebab-case (e.g., data-my-attribute)'
            ],
            correctAnswer: 'kebab-case (e.g., data-my-attribute)'
        },
        {
            type: 'coding',
            question: 'Write code to check if an element with the id "product" has a data-in-stock attribute set to "true":',
            codeChallenge: '// Your code here\n',
            correctCode: 'var productElement = document.getElementById("product");\nvar isInStock = productElement.dataset.inStock === "true";'
        },
        {
            type: 'multiple-choice',
            question: 'What is the purpose of using data attributes over regular attributes?',
            options: [
                'To provide additional metadata without affecting the appearance or behavior',
                'To apply styles and layout to elements',
                'To define required form fields',
                'To improve SEO by adding keywords'
            ],
            correctAnswer: 'To provide additional metadata without affecting the appearance or behavior'
        },
        {
            type: 'coding',
            question: 'Write code to remove the data-highlight attribute from an element with the class "highlighted":',
            codeChallenge: '// Your code here\n',
            correctCode: 'var highlightedElement = document.querySelector(".highlighted");\ndelete highlightedElement.dataset.highlight;'
        },
        {
            type: 'multiple-choice',
            question: 'What is the maximum storage limit for data in Local Storage?',
            options: [
                '5 MB per domain',
                '10 MB per domain',
                'Unlimited storage',
                'Depends on the browser'
            ],
            correctAnswer: '5 MB per domain'
        },
        {
            type: 'coding',
            question: 'Write code to store the string "username" with the value "john_doe" in Local Storage:',
            codeChallenge: '// Your code here\n',
            correctCode: 'localStorage.setItem("username", "john_doe");'
        },
        {
            type: 'multiple-choice',
            question: 'Which method is used to retrieve data from Local Storage by key?',
            options: [
                'localStorage.getItem()',
                'localStorage.getData()',
                'localStorage.fetch()',
                'localStorage.retrieveItem()'
            ],
            correctAnswer: 'localStorage.getItem()'
        },
        {
            type: 'coding',
            question: 'Write code to remove the data stored with the key "username" from Local Storage:',
            codeChallenge: '// Your code here\n',
            correctCode: 'localStorage.removeItem("username");'
        },
        {
            type: 'multiple-choice',
            question: 'What happens if you exceed the storage limit in Local Storage?',
            options: [
                'The browser prompts the user to increase storage',
                'New data overwrites old data',
                'An error is thrown',
                'Excess data is automatically deleted'
            ],
            correctAnswer: 'New data overwrites old data'
        },
        {
            type: 'coding',
            question: 'Write code to clear all data stored in Local Storage:',
            codeChallenge: '// Your code here\n',
            correctCode: 'localStorage.clear();'
        },
        {
            type: 'multiple-choice',
            question: 'Which data types can be stored in Local Storage without conversion?',
            options: [
                'Strings only',
                'Numbers only',
                'Objects only',
                'Strings, numbers, and objects'
            ],
            correctAnswer: 'Strings only'
        },
        {
            type: 'coding',
            question: 'Write code to check if Local Storage contains data with the key "theme":',
            codeChallenge: '// Your code here\n',
            correctCode: 'var hasTheme = localStorage.getItem("theme") !== null;'
        },
        {
            type: 'multiple-choice',
            question: 'When is data in Local Storage cleared?',
            options: [
                'When the browser is closed',
                'When the user clears browser cookies',
                'Manually by the user or programmatically',
                'Never, data persists indefinitely'
            ],
            correctAnswer: 'Never, data persists indefinitely'
        },
        {
            type: 'coding',
            question: 'Write code to update the value of the key "counter" in Local Storage to its current value plus 1:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var currentCounterValue = parseInt(localStorage.getItem("counter")) || 0;\nlocalStorage.setItem("counter", currentCounterValue + 1);'
        },
        {
            type: 'multiple-choice',
            question: 'What is the purpose of the localStorage object in web development?',
            options: [
                'To store data on the client-side persistently',
                'To fetch data from external APIs',
                'To manage server-side databases',
                'To handle user authentication'
            ],
            correctAnswer: 'To store data on the client-side persistently'
        },
        {
            type: 'coding',
            question: 'Write code to add an object with key-value pairs { "city": "New York", "population": 8500000 } to Local Storage:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var cityInfo = { "city": "New York", "population": 8500000 };\nlocalStorage.setItem("cityInfo", JSON.stringify(cityInfo));'
        },
        {
            type: 'multiple-choice',
            question: 'What method is used to retrieve an object from Local Storage by key?',
            options: [
                'localStorage.getObject()',
                'localStorage.fetchObject()',
                'localStorage.getItem()',
                'localStorage.retrieveObject()'
            ],
            correctAnswer: 'localStorage.getItem()'
        },
        {
            type: 'coding',
            question: 'Write code to retrieve and parse the object stored with the key "cityInfo" from Local Storage:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var storedCityInfo = JSON.parse(localStorage.getItem("cityInfo")) || {};'
        },
        {
            type: 'multiple-choice',
            question: 'What is the data type of values stored in Local Storage?',
            options: [
                'Objects only',
                'Strings only',
                'Numbers only',
                'Objects, strings, and numbers'
            ],
            correctAnswer: 'Strings only'
        },
        {
            type: 'coding',
            question: 'Write code to update the "population" value in the "cityInfo" object in Local Storage to 9000000:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var storedCityInfo = JSON.parse(localStorage.getItem("cityInfo")) || {};\nstoredCityInfo.population = 9000000;\nlocalStorage.setItem("cityInfo", JSON.stringify(storedCityInfo));'
        },
        {
            type: 'multiple-choice',
            question: 'How can you check if an object with the key "userData" exists in Local Storage?',
            options: [
                'localStorage.check("userData")',
                'localStorage.has("userData")',
                'localStorage.contains("userData")',
                'localStorage.getItem("userData") !== null'
            ],
            correctAnswer: 'localStorage.getItem("userData") !== null'
        },
        {
            type: 'coding',
            question: 'Write code to remove the object with the key "cityInfo" from Local Storage:',
            codeChallenge: '// Your code here\n',
            correctCode: 'localStorage.removeItem("cityInfo");'
        },
        {
            type: 'multiple-choice',
            question: 'What happens if you try to store a non-string object directly in Local Storage without conversion?',
            options: [
                'An error is thrown',
                'The object is automatically converted to a string',
                'The object is stored as is',
                'The browser prompts the user for confirmation'
            ],
            correctAnswer: 'The object is automatically converted to a string'
        },
        {
            type: 'coding',
            question: 'Write code to clear all objects stored in Local Storage:',
            codeChallenge: '// Your code here\n',
            correctCode: 'localStorage.clear();'
        },
        {
            type: 'multiple-choice',
            question: 'What does the acronym API stand for?',
            options: [
                'Application Programming Interface',
                'Advanced Programming Interface',
                'Automated Programming Interface',
                'Application Process Integration'
            ],
            correctAnswer: 'Application Programming Interface'
        },
        {
            type: 'multiple-choice',
            question: 'Which method is used to schedule a function to run after a specified amount of time in the browser?',
            options: [
                'setTimeout()',
                'setInterval()',
                'delay()',
                'runAfter()'
            ],
            correctAnswer: 'setTimeout()'
        },
        {
            type: 'coding',
            question: 'Write code to add a click event listener to a button with the ID "myButton" that logs "Button clicked!" to the console when clicked:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var button = document.getElementById("myButton");\nbutton.addEventListener("click", () => console.log("Button clicked!"));'
        },
        {
            type: 'multiple-choice',
            question: 'What is the purpose of the XMLHttpRequest object in JavaScript?',
            options: [
                'To manipulate XML documents only',
                'To make asynchronous HTTP requests',
                'To handle browser events',
                'To create dynamic HTML content'
            ],
            correctAnswer: 'To make asynchronous HTTP requests'
        },
        {
            type: 'coding',
            question: 'Write code to create a new HTML element <div> and append it to the document body:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var newDiv = document.createElement("div");\ndocument.body.appendChild(newDiv);'
        },
        {
            type: 'multiple-choice',
            question: 'Which of the following methods is used to modify the content of an HTML element using JavaScript?',
            options: [
                'document.append()',
                'element.addContent()',
                'element.innerHTML',
                'document.modify()'
            ],
            correctAnswer: 'element.innerHTML'
        },
        {
            type: 'coding',
            question: 'Write code to change the text content of an element with the ID "myElement" to "Hello, World!":',
            codeChallenge: '// Your code here\n',
            correctCode: 'var myElement = document.getElementById("myElement");\nmyElement.textContent = "Hello, World!";'
        },
        {
            type: 'multiple-choice',
            question: 'What does the term "AJAX" stand for in web development?',
            options: [
                'Asynchronous JavaScript and XML',
                'Advanced JavaScript and XML',
                'Asynchronous JavaScript and XHTML',
                'Automated JavaScript and XML'
            ],
            correctAnswer: 'Asynchronous JavaScript and XML'
        },
        {
            type: 'coding',
            question: 'Write code to prevent the default form submission behavior when a form with the ID "myForm" is submitted:',
            codeChallenge: '// Your code here\n',
            correctCode: 'var myForm = document.getElementById("myForm");\nmyForm.addEventListener("submit", (event) => {\n  event.preventDefault();\n  // Additional handling code\n});'
        },
        {
            type: 'multiple-choice',
            question: 'What does the Window Object represent in JavaScript?',
            options: ['The browser window', 'The current HTML document', 'The global environment'],
            correctAnswer: 'The global environment'
        },
        {
            type: 'multiple-choice',
            question: 'What is the difference between `let`, `const`, and `var` in JavaScript for variable declaration?',
            options: ['All are function-scoped', '`let` is hoisted, `const` is not hoisted', '`var` is block-scoped'],
            correctAnswer: 'let is block-scoped, can be reassigned, and is not hoisted.'
        },
        {
            type: 'multiple-choice',
            question: 'Explain the concept of closures in JavaScript.',
            options: ['Functions that are closed to modification', 'Functions bundled with references to surrounding state', 'Functions used for closing operations'],
            correctAnswer: 'Functions bundled with references to surrounding state, allowing them to retain access to variables from their containing scope.'
        },
        {
            type: 'multiple-choice',
            question: 'What is the difference between `null` and `undefined` in JavaScript?',
            options: ['They are the same', '`undefined` means a variable has been declared but not assigned', '`null` represents intentional absence of any object value'],
            correctAnswer: '`undefined` means a variable has been declared but not assigned, while `null` represents the intentional absence of any object value.'
        },
        {
            type: 'multiple-choice',
            question: 'How does JavaScript handle asynchronous operations?',
            options: ['Callbacks only', 'Promises only', 'Callbacks, Promises, and async/await'],
            correctAnswer: 'Callbacks, Promises, and async/await are used to handle asynchronous operations in JavaScript.'
        },
        {
            type: 'multiple-choice',
            question: 'What is the purpose of the `bind` method in JavaScript?',
            options: ['To create new objects', 'To bind data to HTML elements', 'To create a new function with a specific `this` value'],
            correctAnswer: 'To create a new function with a specific `this` value when called.'
        },
        {
            type: 'multiple-choice',
            question: 'How does event delegation work in JavaScript?',
            options: ['Attaching events to each child element', 'Using a single event listener on a common ancestor', 'Using inline event handlers'],
            correctAnswer: 'Using a single event listener on a common ancestor to manage events on child elements through event bubbling.'
        },
        {
            type: 'multiple-choice',
            question: 'Explain the concept of prototypal inheritance in JavaScript.',
            options: ['Inheriting properties through classes', 'Copying properties from one object to another', 'Searching for properties in the prototype chain'],
            correctAnswer: 'Searching for properties in the prototype chain to achieve inheritance in JavaScript.'
        },
    ];

    //evet listener for the "Start" buttton click invokng startQuiz fuction below
    startBtn.addEventListener('click', startQuiz);
    //event listenere for the "submit" button click, invoking the submitAnswer fuction below
    submitBtn.addEventListener('click', submitAnswer);
    //event listener for the "save" button click invoking the saveScore below
    saveBtn.addEventListener('click', saveScore);

    //fuction to start the quiz when the 'start' button is clicked
    function startQuiz() {
        //Hide the 'Start' button when the quiz begins
        startBtn.style.display = 'none';
        //Display the quiz screen
        quizScreen.style.display = 'block';
        //show the first question
        showQuestion();
        //set up a timer to call the 'updateTimer' fuction every second (1000 milliseconds)
        timer = setInterval(updateTimer, 1000);
    }

    //Function to display the current question on the quiz screen
    function showQuestion() {
        //Retrieve the current question object fromt he 'questions' array based on the current question indez.
        var currentQuestion = questions[currentQuestionIndex];
        //set the context of the HTML element with the ID 'question' to the question text.
        document.getElementById('question').textContent = currentQuestion.question;

        //check the type of current question.
        if (currentQuestion.type === 'multiple-choice') {
            //IF it's a multiple-choice question:
            // - Display the options container
            document.getElementById('options').style.display = 'flex';
            // - Hide the code input by using = 'none'
            codeInput.style.display = 'none';
            // - Create multiple-chocie options dynamically.
            createOptions(currentQuestion.options);
            //if it's a coding question question:
        } else if (currentQuestion.type === 'coding') {
            // - Hide the options containcer. 
            document.getElementById('options').style.display = 'none';
            //Display the code input.
            codeInput.style.display = 'block';
            // Clear previous code input with = ''
            codeInput.value = '';
        }
        // Display the 'Submit' button.
        submitBtn.style.display = 'block';
    }

    //Function to dynamically create and display multiple-choice options. 
    function createOptions(options) {
        //Get the HTML element with the ID 'options' to serve as the container for the options.
        var optionsContainer = document.getElementById('options');
        //this clears anu exiting content within the options container.
        optionsContainer.innerHTML = '';

        //Iterate for each option in the 'options' array.
        options.forEach((option, index) => {
            //Create a new button element for each option.
            var button = document.createElement('button');
            //set the tex content of the button  to the current option.
            button.textContent = option;
            //Adds an event listener to the buttion, then when clicked it calls for the 'checkAnwer' function with the index of the selected option.
            button.addEventListener('click', () => checkAnswer(index));
            //Append the button to the options container.
            optionsContainer.appendChild(button);
        });
    }

    //Fucntion to check the user's answes based on the questions type.
    function checkAnswer(answerIndex) {
        //Retrieve the current question obejct from the 'questions' array.
        var currentQuestion = questions[currentQuestionIndex];

        //Check the type of the current question with strict equality operator for multiple question
        if (currentQuestion.type === 'multiple-choice') {
            //if its a multiple-choice question: then retrieve the user's selected answer.
            var userAnswer = currentQuestion.options[answerIndex];
            //Compare the user's answer qirh the correct answer.
            if (userAnswer === currentQuestion.correctAnswer) {
                // if the answer is correct then increase the score.
                score++;
                //then re-set the timer to 90 seconds
                timeLeft = 90;
                // and display 'Correct answer'
                showFeedback('Correct answer!');
                //in incorrect
            } else {
                //then subtract 10 seconds from the timer for the incorrect answer.
                timeLeft -= 10;
                //then ensure that the timer doesn't go below 0.
                if (timeLeft < 0) timeLeft = 0;
                // and show 'Incorrect'
                showFeedback('Incorrect');
            }
            //if its a coding question
        } else if (currentQuestion.type === 'coding') {
            //then retrieve the user's entered fromt he code input field
            var userCode = codeInput.value.trim();
            // then compare the user's code with the correct answer.
            if (userCode === currentQuestion.correctCode.trim()) {
                //In correct (matching code) then increase the score
                score++;
                // and re-set the code to 90 seconds.
                timeLeft = 90;
                //And show "Correct Answer"
                showFeedback('Correct answer!');
                //otherwise
            } else {
                //if the answer is incorrec then deduct 10 seconds fromt he time left
                timeLeft -= 10;
                //confrimt that the timer does not go below 0.
                if (timeLeft < 0) timeLeft = 0;
                //then show Incorrect.
                showFeedback('Incorrect');
            }
        }

        //Increase the current question index to move to the next question.
        currentQuestionIndex++;

        //check of there are any more question remaining in the quiz..
        if (currentQuestionIndex < questions.length) {
            //if there are more question then display the next question.
            showQuestion();
            //otherwise if there are no more questions
        } else {
            //then end the quiz
            endQuiz();
        }
    }

    //Fucntion to display the feedback ont he quiz screen. 
    function showFeedback(feedback) {
        //Retrieve the HTML element witht he ID 'feedback' to display feeback 
        var feedbackElement = document.getElementById('feedback');
        //Set the text context of the feedback element to the provided feedback message.
        feedbackElement.textContent = feedback;
    }

    //Fucntion to handle the submission of an answer
    function submitAnswer() {
        //Hide the 'Submit' button after its clicked by using none
        submitBtn.style.display = 'none';

        //check if the current question is a coding challenge
        if (questions[currentQuestionIndex].type === 'coding') {
            // In coding challenges, checks the answer immediately
            checkAnswer();
            //otherwise  
        } else {
            // For multiple-choice questions, proceed to the next question
            currentQuestionIndex++;
            //chek to see if there are any remaining queestions in the que quiz.
            if (currentQuestionIndex < questions.length) {
                //If there are more question, then displayt he next question
                showQuestion();
                //otherwise
            } else {
                //if there are no more questions then end the quiz
                endQuiz();
            }
        }
    }

    //Function to end the quiz
    function endQuiz() {
        //Clear the timer interval to stop the countdown.
        clearInterval(timer);
        //hide the quiz screen when the test concludes 
        quizScreen.style.display = 'none';
        //Then display the end of the screen to show the user's score
        endScreen.style.display = 'block';
        //Set the text context of the HTML element with the ID 'Final-Score to the user's final score
        document.getElementById('final-score').textContent = score;
    }

    //Fuction to update the countdown timer
    function updateTimer() {
        //check if there is remaining time on the count down.
        if (timeLeft > 0) {
            //if there is time left
            timeLeft--;
            //then update the timer value on the HTML element with the ID 'time'
            timerDisplay.textContent = timeLeft;
            //otherwise
        } else {
            //if there is no time left then End the quiz .
            endQuiz();
        }
    }

    // Function to save the user's score along with their initials.
    function saveScore() {
        // Retrieve the HTML element with the ID 'initials' to get the user's initials input.
        var initialsInput = document.getElementById('initials');

        // Trim and convert the user's entered initials to uppercase.
        var initials = initialsInput.value.trim().toUpperCase();

        // Check if initials are provided.
        if (initials !== '') {
            // Save the score and initials in local storage.
            saveToLocalStorage(initials, score);

            // Display an alert indicating that the score is saved.
            alert(`Score saved: ${score}`);
        } else {
            // If no initials are provided:
            // - Display an alert instructing the user to enter their initials.
            alert('Please enter your initials.');
        }
    }

    // Function to save data in local storage.
    function saveToLocalStorage(initials, score) {
        // Retrieve existing data from local storage or initialize an empty array.
        var savedScores = JSON.parse(localStorage.getItem('quizScores')) || [];

        // Add the current score and initials to the array.
        savedScores.push({ initials: initials, score: score });

        // Save the updated array back to local storage.
        localStorage.setItem('quizScores', JSON.stringify(savedScores));
    }
});