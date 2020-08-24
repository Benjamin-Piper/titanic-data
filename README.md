# Quantiful Frontend Test 2020

To begin:

```
cd fed-intern-test-2020

npm install

npm start
```

### Brief summary of my findings

**TODO**

### How I approached the task

#### Table headers

After researching what each attribute means at [kaggle](https://www.kaggle.com/c/titanic/data), I decided what my header should be. 

- **The WHO**
	- id (every good database has at least one unique attribute)
	- surname
	- given names
	- gender
- **The WHERE**
	- embarked from
	- ticket class
	- ticket fare class
- **The WHAT HAPPENED**
	- survived?

This way I could get the table to *tell a story*.

#### Backend structure

I boiled down the getting of data to two steps:

1. Fetching the data
2. Processing the data

These steps were encapuslated in a single `main()` function which sat alongside some helper functions as well.

The end result was an array of Maps. Maps were used instead of objects to preserve the ordering of keys (so that I could tell the story).

#### Coding style

Whenever I code, I try to make each line as readable as possible before I add comments in. A good example of this is setting booleans before using them in if statements or elsewhere. E.g.

```js
const passengerHasPaid = passengerDetails.fare > 0;

if (passengerHasPaid) {
// ...
}
```

Other things I did to make the code cleaner:

- Use of camelCase
- Reduced usage of if statements
- Maxmised usage of array functiosn

### Frontend

After researching and checking out the React docs a bit I decided to use a class as the component for the table. By using a class I was able to keep state of headings and rows. This meant that I could render promised data from the backend while also putting a quick and dirty `loading. . .` screen.

**Note:** While rendering I needed to convert my maps to arrays as I found that React can't render objects.

### Look into drawing graphs with Rechart TODO

### Look into filtering TODO

- alphabetical?
	- surname
	- given names
- enum?
	- embarked from
	- ticket class
	- fare class
- numerical
	- id
