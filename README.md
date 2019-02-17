let's build a chess board:

`$ create-react-app checkers`


first, we'll start with a bunch of divs (3x3) so we can get the squares styled with CSS

./src/App.js
```js
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

not bad, just a div for a Board, some Row divs each with Square divs in them

so far, this doesn't render anything though!

let's style it a bit and see what we got

Board is a flex container for the Rows, and we want those rows to stack vertically, so we'll set flex-direction: column-reverse;

./src/App.css
```
.Board {
  height: 80vh;
  width: 80vh;
  border: 1px solid black;
}
```

now we can see it at least... let's add our [flex styling](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) so our Rows will know which way to go

we need to make our .Board a flex container for Rows

./src/App.css
```css
...

  display: flex;
  flex-direction: column-reverse;
}
```

column-reverse will go from bottom to top (like a chess board is numbered for the white player :D)

each Row will be a flex container for Squares, which we want to go from left to right, so we'll set flex-direction: row;

```css
.Row {
  width: 100%;
  display: flex;
  flex-direction: row;
}
```
let's put some basic styles on the Square just to see that our flex solution is working

```css
.Square {
  height: 50px;
  width: 50px;
  border: 1px solid black;
}
```

great, now we can center our Board and make it responsive

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


let's make the board work for different grid sizes:

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


it's a good point right now to write a starting point for our pieces

./src/App.js
```js
const pieces = [
  ["R", "P", "", "", "", "", "p", "r"],
  ["N", "P", "", "", "", "", "p", "n"],
  ["B", "P", "", "", "", "", "p", "b"],
  ["K", "P", "", "", "", "", "p", "k"],
  ["Q", "P", "", "", "", "", "p", "q"],
  ["B", "P", "", "", "", "", "p", "b"],
  ["N", "P", "", "", "", "", "p", "n"],
  ["R", "P", "", "", "", "", "p", "r"]
];

//...
```

Big letters will mean white pieces, little letters will mean black pieces.

Now that we have an 8x8 starting position, we'll need to make our board work at any size

Our goal here is to apply DRY = Don't Repeat Yourself

We have a repetition of two things: Row and Square

Let's learn how to rewrite those repetitions as [JSX loops](https://www.google.com/search?q=loops+in+jsx)

(checkout in the first google result the stack overflow answer with ES6 in bold... third best answer)


```js
{[...Array(10)].map((x, i) =>
  <ObjectRow key={i} />
)}
```

that looks like we can use it here if we're clever enough!

./src/App.js
```js
<div className='Board'>
  {pieces.map((colOfPieces, rowIndex)=> (
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




(( remember is selectedSquare not selectedPiece ))


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

