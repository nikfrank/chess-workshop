Hello everyone! let's build a chess board:


This is an entry level workshop to learn CSS Flexbox, ReactJS and using npm modules in React.

We may expand it later as a career track workshop using chess.js to implement the entirety of the chess game.

Flex is a relatively new (CSS3) system which makes arranging lists of items on the page super intuitive and saves us from having to write dark-age 2005 ebaumsworld CSS.

---

agenda:

- <a href="#rending-basics">rendering basics</a>
  - <a href="#flex-containers">flex containers</a>
  - <a href="#responsive-design">responsive design</a>
  - <a href="#8x8-board">8x8 board</a>
    - <a href="#initial-board-array-of-arrays">initial board, array of arrays</a>
    - <a href="#arrays-in-js">arrays in js</a>
    - <a href="#rendering-from-our-array">rendering from our array</a>
    - <a href="#colouring-the-squares">colouring the squares</a>
  - <a href="#installing-an-npm-module">installing an npm module</a>
  - <a href="#moving-the-pieces-around">moving the pieces around</a>
    - <a href="#clicking-a-piece">clicking a piece</a>
    - <a href="#clicking-to-move">clicking to move</a>
    - <a href="#unselecting-the-piece">unselecting the piece</a>


---

let's open up a shell (git bash for windows, or mac users use terminal) in our code projects directory and run

`$ create-react-app chess`

then we can get started by running `npm start` and opening [localhost:3000](http://localhost:3000)

[check out these instructions to get npm, node, and create-react-app installed](https://elijahmanor.com/cra-getting-started/)

later we'll need yarn which we can get with

`$ sudo npm install -g yarn` on linux / mac (it will ask to auth)

or on windows, run git bash as an administrator and run

`$ npm install -g yarn`

then close the terminal / shell / git bash window and reopen it to have `yarn` available! :D

---

### rendering basics

without any further ado, let's write some code:

first, we'll start with a bunch of divs (3x3) so we can get the squares styled with CSS

let open up <sub>./src/App.js</sub>

where we see the default render function

```html
  render(){
   return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
```

let's replace it with

```html
//...

  render(){
    return (
      <div className='App'>
        <div className='Board'>
          <div className='Row'>
            <div className='Square'/>
            <div className='Square'/>
            <div className='Square'/>
          </div>
          <div className='Row'>
            <div className='Square'/>
            <div className='Square'/>
            <div className='Square'/>
          </div>
          <div className='Row'>
            <div className='Square'/>
            <div className='Square'/>
            <div className='Square'/>
          </div>
        </div>
      </div>
    );
  }
//...
```

after we update our code, we should save it (ctrl + s in most text editors) so we can see it running updated in the browser.

talk about `div` soup!, just a div for a Board, some Row divs each with Square divs in them

<img src="https://i.imgur.com/ZIISrIb.png?1" height=300 width=542 />

so far, this doesn't render anything we can see!

let's set our `.Board` to take up most of the screen (we'll use [view height units](https://www.w3schools.com/cssref/css_units.asp))

<sub>./src/App.css</sub>
```css
.Board {
  height: 80vh;
  width: 80vh;
  border: 1px solid black;
}
```

so far, all that's displaying is a black square outline, we can see it at least... let's add our [flex styling](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) so our `.Row`s will know which way to go

#### flex containers

we need to make our `.Board` a flex container for `.Row`s (`.Row`'s will  be flex containers for `.Square`s)

we want those rows to stack vertically, so we'll set `flex-direction: column-reverse;`

<sub>./src/App.css</sub>
```css
.Board {
//...

  display: flex;
  flex-direction: column-reverse;
}
```

`column-reverse` will go from bottom to top (like a chess board is numbered for the white player), though it is entirely possible to get this to work with `flex-direction: column;` if you reversed the order somewhere else.

(intuitively, `flex-direction: column-reverse;` can be read as "each child (here `.Row`) will be above the previous one")

like we said earlier, each `Row` will be a flex container for `.Square`s, which we want to go from left to right, so we'll set `flex-direction: row;`

(intuitively `flex-direction: row;` can be read as "each child (here `.Square`) will be to the right of the previous one")

<sub>./src/App.css</sub>
```css
.Row {
  width: 100%;
  display: flex;
  flex-direction: row;
}
```

let's put some basic styles on the `.Square` just to see that our flex solution is working.

<sub>./src/App.css</sub>
```css
.Square {
  height: 50px;
  width: 50px;
  border: 1px solid black;
}
```

now that the `.Square` divs have a size, flexbox will arrange them intuitively based on the rules we set.

we should center our Board on the screen before anyone sees it stuck to the side!

<sub>./src/App.css</sub>
```css
.Board {
//...

  margin: 10vh auto;

//...
}
```

the `10vh` will put a margin above and below, the `auto` will make the left and right margins center our `80vh` wide `.Board` div

[checkout the docs for margin](https://www.w3schools.com/css/css_margin.asp) - `auto` is really useful for left-right centering when our content is fixed-width, it doesn't work for up-down, so we have to do the math ourselves (100vh - 80vh)/ 2 = 10vh


#### Responsive design

Right now, our board works only when our screen is wider than it is tall.

This is because we use `80vh` for the height and width, which if height > 1.25*width, will make our board wider than the screen!

we can test how our site / app looks for different screen sizes / ratio by opening up the devtool panel (ctrl + shift + i, or on mac cmd + shift + j) and reorienting / resizing the panel. Chrome also has some nifty tools for pretending to run on a mobile screen [check out the docs here](https://developers.google.com/web/tools/chrome-devtools/device-mode/)

we can make the "Board wider than screen" bug using the devtool resize trick.

To fix this, we can set a `max-height` and `max-width` of `80vw`. These rules ([read about them](https://www.google.com/search?q=max+height+css)) will override the `height` and `width` when their value is smaller.

./src/App.css
```css
.Board {
  height: 80vh;
  width: 80vh;
  max-height: 80vw;
  max-width: 80vw;

  margin: 10vh auto;

  display: flex;
  flex-direction: column-reverse;
}
```

superb! Everyone should take 2 minutes now to add "responsive UI / UX" to their CV

"Responsive" is a fancy business word which means "works on mobile phones, tablets and desktop", so we can also add 2000NIS per month to our salary.

<img src="https://i.giphy.com/media/l41lFvtuqmey9QTAY/giphy.webp" height=304 width=480 />


#### 8x8 board

So far, our board is 3x3 with 50px hard-coded squares. We want our CSS to work for any board size, and for it to auto-size the squares to fit.

let's make use of [flex-grow](https://css-tricks.com/almanac/properties/f/flex-grow/) to achieve this modest aim.

we'll also need a `min-height` on the `.Square`

<sub>./src/App.css</sub>
```css
.Row {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.Square {
  flex-grow: 1;
  min-height: 100%;
  border: 1px solid black;
}
```

`min-height` on the `.Square` is necessary to give the div a size because it has no children elements - `100%` will by default be measured reelative to the flex parent, which here is the `.Row`, which is what we want (that the `.Square` be the entire height of the `.Row`)


##### initial board, array of arrays

it's a good point right now to write a starting point for our pieces, which we'll use to render the board.

let's define a constant above our `Component` to use within it

<sub>./src/App.js</sub>
```js
//...

const initialPosition = [
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["r", "n", "b", "q", "k", "b", "n", "r"]
];

class App extends Component {
  //...
```

Big letters will mean white pieces, little letters will mean black pieces.

we'll want to use this right away to initialize our state with

<sub>./src/App.js</sub>
```js
//...

class App extends Component {
  state = {
    pieces: initialPosition,
  }

//...
```

now later, we'll be able to read out the current board state from `this.state.pieces`

##### arrays in js

let's take a minute to learn about arrays in javascript, so we'll be comfortable with our pieces matrix (and learn that it's not really a matrix)

when we say `const listOfStuff = [];`, we're making a new constant named `listOfStuff` which is an empty array

we could put whatever values we want in our array

```js
const listOfDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
```

and we can read values out zero-indexed [because Dijkstra says so](https://www.cs.utexas.edu/users/EWD/transcriptions/EWD08xx/EWD831.html)

```js
console.log( listOfDays[0] ); // prints out 'Sunday' to the console
```


and they don't all have to be the same type

```js
const garfieldsListOfDays = ['Sunday', 'Tuesday', null, 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
```

```js
console.log( garfieldsListOfDays[1] ); // prints out 'Tuesday' to the console
console.log( garfieldsListOfDays[2] ); // prints out null to the console
```

<img src="https://66.media.tumblr.com/29f72477ece025dd8f7d1a64e20cbff4/tumblr_mji5xuSk1v1rtut36o1_1280.gif" height=177 width=600 />

OR

```js
const foremen = [
  { name: 'George', suffix: 'sr' },
  { name: 'George', suffix: 'jr' },
  { name: 'George', suffix: 'III' },
  { name: 'Georgetta', suffix: '' },
];

console.log( foremen[1].name, foremen[1].suffix ); // logs 'George' 'jr'
```

OR

```js
const userInputs = [ 0, 'blah', { great: 'success' }, null, [1, 2, 'three'] ];

console.log( userInputs[4][2] ); // prints out 'three' to the console
```


wait, what? is that an array inside an array? ... yes. yes it is.

in some other languages, there is a well defined notion of multidimensional arrays

js is all about intuition, and it turns out allowing arrays to have arrays inside of them is very intuitive


in our case we can read out which piece is in `this.state.pieces` at a given `columnIndex` and `rowIndex` with

```js
const columnIndex = 3; // the fourth column, aka the "D file" in chess lingo
const rowIndex = 0; // the first row, aka the "1st rank"

console.log( this.state.pieces[ rowIndex ][ columnIndex ] ); // 'Q', a white Queen
// ... in the starting position at least

// or if we wanted the entire column

console.log( this.state.pieces[0] ); // ['R','N','B','Q','K','B','N','R'] is logged
```



##### rendering from our array


Now that we have an 8x8 starting position in `this.state` we can use it to loop out `.Row`s and `.Square`s in our render function.

Our goal here is to apply DRY = Don't Repeat Yourself

We have a repetition of two things: a bunch of repeated `.Row`s and a bunch of repeated `.Square`s

Let's learn how to rewrite those repetitions by <a href="https://www.google.com/search?q=loops+in+jsx" target="_blank">googling JSX loops</a>

(checkout in the first google result the stack overflow answer with ES6 in bold... third best answer)


```js
{[...Array(10)].map((x, i) =>
  <ObjectRow key={i} />
)}
```

that looks like we can use it here if we're clever enough!

let's break it down:

- `{` open a breakout to go from html mode to js mode in JSX (( exactly what we need ))
- `[...Array(10)]` some array (( we have some array! `this.state.pieces` ))
- `.map(` mapping over the array, which is almost always how we loop in JSX  (( exactly what we need to do ))
- `(x, i)=> <ObjectRow key={i}/>` a mapping function which returns the repeated JSX tag  (( we'll put a different tag ))
- `)}` closing our breakout  (( closing brackets is fun in JS ))


we can use the exact same pattern to loop out a bunch of `.Row`s out of our `this.state.pieces` array


<sub>./src/App.js</sub>
```js
<div className='Board'>
  {this.state.pieces.map((rowOfPieces, rowIndex)=> (
    <div className='Row'>
      <div className='Square'/>
      <div className='Square'/>
      <div className='Square'/>
    </div>
  ))}
</div>
```

we know that `this.state.pieces` will always be the right size for our board, so we can use it to loop over to generate the rows

that's a lot shorter than having to repeat out a bunch of `.Row` divs eh?

similarly, we can generate the squares from the `rowOfPieces` array from each step of our first loop

<sub>./src/App.js</sub>
```js
<div className='Board'>
  {this.state.pieces.map( (rowOfPieces, rowIndex)=> (
    <div className='Row'>
      {rowOfPieces.map( (piece, colIndex)=> (
        <div className='Square'>
          {piece}
        </div>
      ))}
    </div>
  ))}
</div>
```

If you look closely, you'll notice that the squares are slightly different sizes (if they have a piece letter rendered in them or not)

so instead of fixing this with CSS now, we can wait for it to be fixed in two steps (using the `react-chess-pieces` svg library will solve the problem as well)

also, if you check your console in the devtools, you'll see react complaining about `key`s on elements.

Key is how react can tell the difference between different elements in a list (usually generated by a .map loop)

<img src="https://thumbs.gfycat.com/SphericalTartBoubou-max-1mb.gif" height=240 width=320 />

all we have to do is put a unique key={value} on each repeated item, which is easy enough using the indices from our loops


<sub>./src/App.js</sub>
```js
<div className='Board'>
  {this.state.pieces.map( (rowOfPieces, rowIndex)=> (
    <div key={rowIndex} className='Row'>
      {rowOfPieces.map( (piece, colIndex)=> (
        <div key={colIndex} className='Square'>
          {piece}
        </div>
      ))}
    </div>
  ))}
</div>
```

in some cases, this will help React keep our app fast when reordering elements. Here we're never reordering elements, so we're just doing this to get rid of the error message. D:


##### colouring the squares

using CSS's nth-child pseudoselector

our `.Board` looks pretty barren right now! Let's give alternating colors to the `.Square`s

regulation chessboards have a black square at A1 (which is [0][0] for us) and alternate from there

<img src="https://somemoresport.files.wordpress.com/2013/10/20131022-181008.jpg" height=271 width=500 />

so whenever the indices are both even (like A1 [0][0] was) or both odd (like B6 [1][5] is) we want a dark square

CSS tricks has a great reference about `:nth-child` patterns [here](https://css-tricks.com/useful-nth-child-recipies/)

<sub>./src/App.css</sub>
```css
.Row:nth-child(2n) .Square:nth-child(2n),
.Row:nth-child(2n + 1) .Square:nth-child(2n + 1) {
  background-color: #22d;
}
```

let's break down the first selector `.Row:nth-child(2n) .Square:nth-child(2n)`

the trick here is that the first pseudoselector (`:nth-child(2n)`) applies to the first tag selector (`.Row`), which means we're selecting an even numbered `.Row`

similarly and simultaneously, we're selecting an even numbered column (as the Squares in the row are one per column)

together, we're selecting any (even, even) pair and applying the `background-color` to it

... the (odd, odd) selector works the same way, and colours those `.Square`s with the same rule, using a `,` to separate the selectors



lastly whenever it's (even, odd) (like A2 [0][1] is) or (odd, even) (like F5 [5][4] is) we want a light square

<sub>./src/App.css</sub>
```css
.Row:nth-child(2n) .Square:nth-child(2n + 1),
.Row:nth-child(2n + 1) .Square:nth-child(2n) {
  background-color: #ccc;
}
```

it may be instructive to tinker with these selectors (only put one of the two for each color for instance) to understand better how they work.

<img src="https://i.pinimg.com/originals/6b/84/09/6b84099e0a76c4721e6836302cba0c61.gif" height=324 width=480/>



#### installing an npm module

let's open up a shell (git bash for windows, or mac users use terminal) in the project directory and run

`$ yarn add react-chess-pieces`

this will download the latest version of a component library I wrote which makes rendering chess pieces easy and fun!

we can read the docs for the library in its [github project page](https://github.com/nikfrank/react-chess-pieces)

it exports (default) one Component called `Piece` which will render the piece we tell it to in its `piece={...}` prop


./src/App.js
```js
//...

import Piece from 'react-chess-pieces';

//...

        <div className='Square'>
          <Piece piece={piece}/>
        </div>
//...
```

and there you have it! now let's figure out how to move the pieces around


#### moving the pieces around

##### clicking a piece

learn about setState

select a square

<sub>./src/App.js</sub>
```js
//..

  clickSquare = (col, row)=> this.setState({ selectedCol: col, selectedRow: row })

//...

  <div className="Square" onClick={()=> this.clickSquare(colIndex, rowIndex)}>
    <Piece piece={piece}/>
  </div>

//...
```

ok so what?

let's log out our `this.state.selectedCol` and `this.state.selectedRow` to see what we get

<sub>./src/App.js</sub>
```js
//..

  render(){
    console.log( this.state.selectedCol, this.state.selectedRow );

    //...
  }
//...
```

CAREFUL! logging the state in the render function is a memory leak, so we want to make sure to delete this before we push our code!

now when we run our app, we can see the `selectedCol/Row` getting saved to our state

let's use this value in our render to highlight the square when it is selected, then we can delete the console.log



to accomplish this, let's learn about the `style` prop in React

remember in HTML, we can apply styles directly to the element using the `style` attribute like so:

```html
<div style="color: green; font-size: 20px; font-weight: bold;"> Heyo </div>
```

when facebook (tm) built React, they wanted to make things easier to do in javascript,
 so the `style` attribute changed from being a string of CSS to the `style` prop,
 which takes an object full of CSS rules.
 They were even nice enough to change the `kebab-case` CSS rules like `style="background-color: green;"`
 to `camelCase` versions in js like `style={{ backgroundColor: 'green' }}`

there's a few other little differences you can read about [here](https://google.com/search/q=css+in+js+react+style+prop)


what's the idea here?

we want to be able to change the style of our rendered elements on the fly based on `this.state`.something

we could calculate `className` on the fly like:

```js
<div className={this.state.yellow ? 'yellow' : ''}> Yellow? </div>
```

and define some CSS class to style out div

```css
.yellow {
  background-color: yellow;
}
```

and that would be okay for us, but we'd have to calculate some ugly `className` combination string

There's a shorter more elegant solution that gets us to our highlight selection feature faster!

I'll give you the opportunity to pause this workshop here and try to figure out

the solution you're looking for calculates a `style` prop using `this.state`.something and all in one line of code, highlights the `.Square` that the user selected...

...

<img src="/something" width=200 height=800 />
...


for everyone who figured it out, congratulations, you're a great inline conditional writer

for those of you who are just here for the show:


what we want to do is declare a `style` prop that puts a `backgroundColor` value onto our div

we can start with

<sub>./src/App.js</sub>
```js
//...

<div className='Square' style={{ backgroundColor: 'gold' }}>
  <Piece piece={piece}
</div>

//...
```

but that always makes every `.Square` gold! We want to use the indices we saved in `this.state.selectedCol/Row` in the previous step to decide if this square should be gold or not.


so this is where we get to use the inline conditional (ternary) operator to get our task done

<sub>./src/App.js</sub>
```js
//...

<div className='Square'
     style={{ backgroundColor: this.state.selectedCol === colIndex &&
                               this.state.selectedRow === rowIndex ? 'gold' : '' }}>
  <Piece piece={piece}
</div>

//...
```

so this way, we change to a gold backgroundColor iff (in our loop) we're currently rendering the selected square (which we know by checking that the current `colIndex` and `rowIndex` that we're rendering are equal to the values we saved in `state` during the click handle)


very good!


next we'll think through what to do on the next click (to move the piece or not to move the piece!)


##### clicking to move

when we click again, we should see that the selected square updates each time to the newly clicked square

while entertaining, this is not how we're going to win at chess!

what we want to do instead, is when we click (and out `clickSquare` function is run), if there is a number saved already in `this.state.selectedCol/Row`, we want to move the piece


let's pseducode this in


<sub>./src/App.js</sub>
```js
//...

  clickSquare = (col, row) => {
     if( typeof this.state.selectedCol === 'number' ){
       // move the piece
     } else {
       // select the piece (our code from before)
       this.setState({ selectedCol: col, selectedRow: row });
     }
  }

//...
```

ok, now we can select one piece once, and then we get stuck there thinking where to move that piece forever! D:


all we have to do is calculate the next boardful of pieces, and our game should work!


<sub>./src/App.js</sub>
```js
//...

  clickSquare = (col, row) => {
     if( typeof this.state.selectedCol === 'number' ){
       // move the piece
       const nextPieces = JSON.parse( JSON.stringify( this.state.pieces )); // copy the pieces

       // move the selected piece to the clicked square
       nextPieces[col][row] = this.state.pieces[this.state.selectedCol][this.state.selectedRow];

       // empty the moved-from square
       nextPieces[this.state.selectedCol][this.state.selectedRow] = '';

       // set the nextPieces back into state, clear selection
       this.setState({ pieces: nextPieces, selectedCol: null, selectedRow: null });
       
     } else {
       // select the piece (our code from before)
       this.setState({ selectedCol: col, selectedRow: row });
     }
  }

//...
```

Great!, now take a break and play some chess.

here, we've written this up in imperative style, as it the most legible.

anyone who wants to write this as nested `.map`s or `.reduce`s is encouraged to do so on their own time :D




##### unselecting the piece

one last feature that will make this app more usable is that when we reclick the selected square, we should unselect it. (currently it deletes the piece from existence D:)

let's put a simple check into our `clickSquare` function to do the right thing

<sub>./src/App.js</sub>
```js
//...

  clickSquare = (col, row) => {
     if( typeof this.state.selectedSquare === 'number' ){
       // if reselecting, set state.selectedSquare to null
       if( this.state.selectedCol === col && this.state.selectedRow === row )
         return this.setState({ selectedCol: null, selectedRow: null });

       // move the piece
       //...
  }

//...
```

instead of `return` we could also wrap the piece movement logic in an else block.


!!! that's the game, I hope you enjoyed it !!!


(link to heroku deployment instructions)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

