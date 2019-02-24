Hello everyone! let's build a chess board:


This is an entry level workshop to learn CSS Flexbox, ReactJS and using npm modules in React.

We may expand it later as a career track workshop using chess.js to implement the entirety of the chess game.

Flex is a relatively new (CSS3) system which makes arranging lists of items on the page super intuitive and saves us from having to write dark-age 2005 ebaumsworld CSS.

---

let's open up a shell (git bash for windows, or mac users use terminal) in our code projects directory and run

`$ create-react-app chess`

then we can get started by running `npm start` and opening [localhost:3000](http://localhost:3000)

[check out these instructions to get npm, node, and create-react-app installed](https://elijahmanor.com/cra-getting-started/)

---

without any further ado, let's write some code:

first, we'll start with a bunch of divs (3x3) so we can get the squares styled with CSS

let open up <sub>./src/App.js</sub>

where we see the default render function

```html
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

##### flex container

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

`column-reverse` will go from bottom to top (like a chess board is numbered for the white player), though it is entirely possible to get this to work with `column` if you reversed the order somewhere else.

(intuitively, `flex-direction: column-reverse` can be read as "each child (here `.Row`) will be above the previous one")

like we said earlier, each `Row` will be a flex container for `.Square`s, which we want to go from left to right, so we'll set `flex-direction: row;`

(intuitively `flex-direction: row;` can be read as "each child (here `.Square`) will be to the right of the previous one")

```css
.Row {
  width: 100%;
  display: flex;
  flex-direction: row;
}
```

let's put some basic styles on the `.Square` just to see that our flex solution is working.

```css
.Square {
  height: 50px;
  width: 50px;
  border: 1px solid black;
}
```

now that the `.Square` divs have a size, flexbox will arrange them intuitively based on the rules we set.

we should center our Board on the screen before anyone sees it stuck to the side!

./src/App.css
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

#### 8x8 board

So far, our board is 3x3 with 50px hard-coded squares. We want our CSS to work for any board size, and for it to auto-size the squares to fit.

let's make use of [flex-grow](https://css-tricks.com/almanac/properties/f/flex-grow/) to achieve this modest aim.

./src/App.css
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

`min-height` on the `.Square` is necessary to give the div a size because it has no children elements - `100%` will by default be measured reelative to the flex parent, which here is the `.Row`, which is what we want (that the Square be the entire height of the Row)


##### initial board, array of arrays

it's a good point right now to write a starting point for our pieces, which we'll use to render the board.

./src/App.js
```js
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
//...
```

Big letters will mean white pieces, little letters will mean black pieces.

we'll want to use this right away to initialize our state with

./src/App.js
```js
//...

class App extends Component {
  state = {
    pieces: initialPosition,
  }

//...
```

let's take a minute to learn about arrays in javascript, so we'll be comfortable with our pieces matrix (and learn that it's not really a matrix)

when we say `const listOfStuff = [];`, we're making a new constant named `listOfStuff` which is an empty array

we could put whatever values we want in our array

`const listOfDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];`

and we can read values out zero-indexed [because Dijkstra says so](https://www.cs.utexas.edu/users/EWD/transcriptions/EWD08xx/EWD831.html)

`console.log( listOfDays[0] ); // prints out 'Sunday' to the console


and they don't all have to be the same type

`const garfieldsListOfDays = ['Sunday', undefined, 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];`

`console.log( garfieldsListOfDays[1] ); // prints out undefined to the console`

OR

`const userInputs = [ 0, 'blah', {}, null, [1, 2, 'three'] ];`

`console.log( userInputs[4][2] ); // prints out 'three' to the console`


wait, what? is that an array inside an array? ... yes. yes it is.

in some other languages, there is a well defined notion of multidimensional arrays

js is all about intuition, and it turns out allowing arrays to have arrays inside of them is very intuitive


in our case we can read out which piece is in `this.state.pieces` at a given `columnIndex` and `rowIndex` with

```
const columnIndex = 3; // the fourth column, aka the "D file" in chess lingo
const rowIndex = 0; // the first row, aka the "1st rank"

console.log( this.state.pieces[ rowIndex ][ columnIndex ] ); // 'Q', a white Queen, in the starting position at least
```



##### rendering from our array


Now that we have an 8x8 starting position in `this.state` we can use it to loop out `.Row`s and `.Square`s in our render function.

Our goal here is to apply DRY = Don't Repeat Yourself

We have a repetition of two things: a bunch of repeated `.Row`s and a bunch of repeated `.Square`s

Let's learn how to rewrite those repetitions by [googling JSX loops](https://www.google.com/search?q=loops+in+jsx)

(checkout in the first google result the stack overflow answer with ES6 in bold... third best answer)


```js
{[...Array(10)].map((x, i) =>
  <ObjectRow key={i} />
)}
```

that looks like we can use it here if we're clever enough!

let's break it down:

- `{` open a breakout to go from html mode to js mode in JSX
- `[...Array(10)]` some array
- `.map(` mapping over the array, which is almost always how we loop in JSX
- `(x, i)=> <ObjectRow key={i}/>` a mapping function which returns the repeated JSX tag
- `)}` closing our breakout


we can use the exact same pattern to loop out a bunch of `.Row`s out of our `this.state.pieces` array


./src/App.js
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

we know that pieces will always be the right size for our board, so we can use it to loop over to generate the rows

similarly, we can generate the squares

./src/App.js
```js
<div className='Board'>
  {this.state.pieces.map( (colOfPieces, rowIndex)=> (
    <div className='Row'>
      {colOfPieces.map( (piece, colIndex)=> (
        <div className='Square'>
          {piece}
        </div>
      ))}
    </div>
  ))}
</div>
```

If you look closely, you'll notice that the squares are slightly different sizes (if they have a piece letter rendered in them or not)

so instead of fixing this with CSS, we can go ahead to the next step (installing `react-chess-pieces` svg library) which will solve the problem as well.



##### installing an npm module

let's open up a shell (git bash for windows, or mac users use terminal) in the project directory and run

`$ npm install --save react-chess-pieces`

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

and there you have it!




(( remember is selectedSquare not selectedPiece ))


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

