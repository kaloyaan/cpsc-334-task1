# cpsc-334-task1
This repository contains the code for Task 1 for Yale's CPSC334: Creative Embedded Systems in Fall 2021.


## Group
- Alana Liu
- Harry Jain
- Kaloyan Kolev
- Roxanne Harris


## Task Description
- Write a program to discover the mapping of screen space to physical space in the Leeds Studio at the Yale CCAM.
- The program should be semi-automatic in that it may require human input.


## Implementation Details

### Languages
- HTML for the basic UI
- CSS for styling the UI
- JavaScript for the computational aspects

### File Structure
- *README.md* (read for instructions) describes all aspects of the project and solution
- *final* contains the main program (download this folder to run the program)
  - *index.html* contains the UI for the main program (open this in a browser to run the program)
  - *saveFile.html* contains the UI for the popup to save the JSON file
  - *css* contains the style sheets for each html file
    - *styles.css* establishes the style for index.html
    - *fileStyles.css* estables the style for saveFile.html
  - *js* contains the scripts that control the rectangle drawing and outputting
    - *script.js* is the main file that controls input and output
    - *fileScript.js* contains the logic for saving the JSON file
    - *resizeScript.js* attempts to resize the Canvas on page resize (defunct)
- *images* contains the images and videos used in *README.md*
- *oldStuff* contains previous attempts at various parts of our solution (defunct)


## Usage Instructions

### Setup
To set up this repository locally for display configuration, use the following steps:
  1. Download the code to your local computer (either using git clone or by downloading a .zip folder).
  2. Open up *index.html* under the *final* folder within the *cpsc-334-task1* root folder (by double clicking or via some sort of web server if desired).

### Screen Mapping
Once the program loads, to create the mapping, use the following steps:
  1. Cycle to the leftmost desktop (with **SHIFT** + **WIN** + **LEFT**) you wish to address and make sure the window is fullscreened there (by pressing F11).
  2. Press F5 to reload and start the program on your desired display.
  3. Press **ENTER** twice to close the instructions.
  4. Draw a rectangle with your mouse covering a single "display" from top left to bottom right (visually).
  5. Input the virtual desktop number (1 to the number of desktops from left to right) on the following prompt.
  6. Input the screen number (1 to the number of screens from left to right, irrespective of virtual displays) on the following prompt.
  7. Repeat steps 4-6 for each screen on the virtual desktop.
  8. Shift through each virtual desktop (cycle with **SHIFT** + **WIN** + **LEFT**) and repeat steps 4-7.

When you are completely done with all desired desktops/screens, you can download a JSON file with the coordinates using the following steps:
  1. (Recommended) cycle with **SHIFT** + **WIN** + **LEFT** to your main computer display.
  2. Press the **d** key on your keyboard to open a new "save" tab.
  3. Click the "Create file" button to create the JSON file.
  4. Press the "Download" link to download the link to your computer.

![demo](/images/demo.gif)

### Output
The output is *leedsConfiguration.json*, a JSON file with the coordinates detailing the virtual display, screen number, screen dimensions, and corner coordinates (x and y) of each screen according to the following hierarchy:
  - Virtual Display Number (from left to right)
    - Screen Number (from left to right): what number screen the entry is for, irrespective of virtual displays
    - width: the length of the screen in the x-direction
    - height: the length of the screen in the y-direction
    - x1: the x-coordinate of the "top left" point of the screen
    - x2: the x-coordinate of the "bottom right" point of the screen
    - y1: the y-coordinate of the "top left" point of the screen
    - y2: the y-coordinate of the "bottom right" point of the screen

By using JSON, this output can be easily used programatically yet still understood visually.


## Approach Analysis

### Benefits
- Unlike other popular languages and frameworks like Python and Processing, Javascript can run on anything with a browser.
- Users do not have to change their system configuration to make this program work.
- Nothing was hard-coded, so this program could be applied reasonably easily to any extended-display setup, regardless of display dimensions or number of displays/extended desktops.

### Downsides
- The current system configuration does not allow us to run across virtual displays, unlike some natively-run code.
- The process of utilizing full screen is a bit janky without changing system settings.
- To use all the features of Javascript, we would need to run on a server rather than just via files, removing some of the universality.
- The output still needs to be interpreted somewhat as opposed to a more visual picture.


## Potential Pitfalls
- Sometimes when drawing a rectangle, a prompt does not immendiately appear. To fix this, click the center of the rectangle to initiate the prompt.
- If you draw a rectangle and did not want to save it, you can hit 'cancel' on the prompts and it will not be saved.


## Interesting Note on Generative Art
While not meant to be a generative art system, this program could definitely be modified to be one, and some outputs from playing around are quite visually appealing (and evocative of the introduction sequence to Pixar's *Monster's Inc.*), as shown below.

![rectangles](/images/rectangleArt.png)
