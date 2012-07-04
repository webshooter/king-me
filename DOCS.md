King Me!
========

*	[Game](#game)
*	[Player](#player)
*	[Board](#board)
*	[Square](#square)
*	[Checker](#checker)
*	[Data](#data)



<p id="game"></p>
## Game

_Not yet added_



<p id="player"></p>
## Player

_Not yet added_



<p id="board"></p>
## Board
The `board` is the main container for the game. It holds a collection of active game `square`s and `checker`s and is responsible for canvas updates.

###Constructor

    var board = new Board(containerElement, options);
* `containerElement`  
The DOM element onto which the board canvas element will be appended.  
* `options`  
The options object used to define the board's properties.  


**Valid options:**  

 Option        |  Description  
 ------------- | ------------
 `id`          |  The string that will be applied to the board's canvas `id` attribute.<br>Default: `gameboard`
 `width`       |  The pixel width of the game board canvas.<br>Default: `0`
 `height`      |  The pixel height of the game board canvas.<br>Default: `0`
 `rowCount`    |  The number of rows to draw onto the canvas.<br>Default `8`
 `colCount`    |  The number of columns to draw onto the canvas.<br>Default `8`
 `squareColor` |  The background square color that is applied to the entire canvas.<br>Default: `rgb(100,100,100)`

**Example:**  
````js
	var opts = {
		id: "myGameBoard",
		rowCount: 12,
		colCount: 15
	};
	
    var board = new Board(document.body, opts);
````

###Properties  
*To be added later*


###Methods  
+ `initCheckers()`  
Creates the `checker` objects for both player one and player two and adds them to the `checkers[]` collection.
  
+ `draw()`  
Draws the current set of board `squares` and `checkers` onto the board canvas.
  
+ `clear()`  
Clears the current board canvas.
  
+ `drawSquares()`  
Draws all of the `square` objects from the board's `squares[]` collection onto the board canvas.
  
+ `drawCheckers()`  
Draws all of the `Checker` objects from the board's `checkers[]` collection onto the board canvas.
  
+ `getSquareById(squareId) `  
Returns the `square` object from the board's `squares[]` collection whose `id` property matches the supplied `squareId`.
  
+ `removeChecker(square) `  
Removes the `checker` object assigned to the provide `square` from the board's `checkers[]` collection and sets the square's `checker ` property to `null`.
  
+ `getSquareById(checker, fromSquare, toSquare) `  
Removes the supplied `checker` from the `fromSquare`,assigns it to the `toSquare`, and then redraws the board.
  



<p id="square"></p>
## Square

The `square` contains information about it's board position, color, highlighting, and checker state.

###Constructor

    var square = new Square(x, y, size, board, color);
    
* `x`  
The x coordinate for the top-left corner of the square.  
* `y`  
The y coordinate for the top-left corner of the square.  
* `size`  
The measure in pixels of the square's length and width.  
* `board`  
The `board` object that will contain the `square`.  
* `color`  
A valid color value for the square's fill color.  


###Properties  
* `id`  
A unique identifier for the `square`. By default the board assigns a number between 1 and 32 to each square's `id` property. Numbering starts on the board's bottom-right-most active `square` and continues right to left up the board.  
* `x`  
The x coordinate for the top-left corner of the square.  
* `y`  
The y coordinate for the top-left corner of the square.  
* `size`  
The measure in pixels of the square's length and width.  
* `board`  
The `board` object that will contain the `square`.  
* `color`  
A valid color value for the square's fill color.  
* `context`  
The `context` object into which the `square` will be drawn and manipulated. By default this is the `board` object's context.   
* `checker`  
The `checker` object that is currently assigned to this `square`. Returns `null` if the `square` has no `checker`.  
* `isHighlighted`  
Returns `true` if the `square` currently has the highlight effect and `false` if it does not.  


###Methods  
+ `draw()`  
Draws the `square` onto the current canvas context.  
+ `clear()`  
Clears the area of the current canvas context where the `square` resides.  
+ `highlightSelected(highlightOn, highlightColor)`  
Draws or removes the highlight effect onto the square.  
  + `highlightOn`  
  Boolean value. If `true` the highlight effect will be draw. If `false` the effect will be removed.  
  + `highlightColor`  
  A valid color value.  
+ `hasChecker()`  
Returns `true` if the `square` has an assigned `checker`, false if not.  



<p id="checker"></p>
## Checker
The `checker` contains information about its place within the the `board`.  

###Constructor

    var checker = new Checker(square, color);
    
* `square`  
The `square` to which the checker will be assigned and drawn.  
* `color`  
A valid color value to be used as the checker's fill color.  

###Properties  
* `id`  
A unique identifier for the `square`. By default is a number between 1 and 32 that matches the id of the `square` to which the `checker was initially assigned.  
* `square`  
The `square` to which this `checker` is CURRENTLY assigned.  
* `x`  
The x coordinate for center of the `checker`.  
* `y`  
The y coordinate for center of the `checker`.  
* `color`  
A valid color value to be used as the checker's fill color.  
* `size`  
The pixel measurement of the radius of the `checker`.  
* `context`  
The `context` object into which the `checker` will be drawn and manipulated. By default this is the `square` object's context.  
* `isKing`  
Represents the checker's 'king' promotion status.
* `context`  
A collection of squares that are valid moves for the `checker`.  
  
###Methods  
+ `draw()`  
Draws the `checker` onto the context.  


<p id="date"></p>
## Data

*To be added later*

