# Quantiful Frontend Test 2020

To begin:

```
cd quantiful-frontend-test-2020

npm install

npm start
```

### Brief summary

Overall this was an enjoyable task, it has certainly taught me more about React and the people who were aboard the Titanic.

I think it's really fascinating that we're able to hoist historical data and represent it in new and meaningful ways to the world.

### How I approached the task (in chronological order)

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

#### Frontend

After researching and checking out the React docs a bit I decided to use a class as the component for the table. By using a class I was able to keep state of headings and rows. This meant that I could render promised data from the backend while also putting a quick and dirty `loading. . .` screen.

**Note:** While rendering I needed to convert my maps to arrays as I found that React can't render objects.

#### Drawing a graph with Recharts (Optional task)

After researching and installing Rechart with npm, I decided to display where the paid passengers embarked from.

For this I had to refactor the backend a little bit and then export the fetch request. From there I was able to simply increment an array depending where each index was mapped to the location name.

Then came formatting the data into objects to be rendered into an svg by Recharts.

I also decided to keep styling of all components localised to their respective files to maintain encapsulation.

#### Filtering

If I had more time I would have implemented more filters optimally such that they could be used simultaneously in an effective manner.

What I ended up doing was creating a simple Filter component to render rows if people survided or not or both.
