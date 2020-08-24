// Step 0: Defining the data.

// These have to be of the same size.
const passengerKeys = ["passengerid", "name", "sex", "embarked", "pclass", "fare", "survived"];
const tableHeader   = ["id", ["surname", "given names"], "gender", "embarked from", "ticket class", "ticket fare class", "survived?"];

const locations = new Map([ ["C", "Cherboug"], ["Q", "Queesntown"], ["S", "Southampton"]])
const ticketClasses = new Map([ [1, "First"], [2, "Second"], [3, "Third"]]);

const paidPassengers = []; // Storing an array of maps.

// Main.
const retrievePassengers = async function () {
    // Step 1: Fetch.
    const data = await fetchRequest();

    // Step 2: Process each passenger.
    data.records.forEach(record => process(record.fields));

    return paidPassengers;
}

export async function fetchRequest() {
    const passengers = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=titanic-passengers&q=&rows=1000";
    const response = await fetch(passengers);
    const data = await response.json();

    return data;
}

function process(passengerDetails) {
    const passengerHasPaid = passengerDetails.fare > 0;
     if (passengerHasPaid) {
         // Maps are used to preserve insertion order.
         const newPaidPassenger = new Map();
         passengerKeys.forEach((key, index) => {
             switch(key) {
                 case "name":
                     const names = arraynge(passengerDetails[key]);
                     newPaidPassenger.set(tableHeader[index][0], names[0]);
                     newPaidPassenger.set(tableHeader[index][1], names[1]);
                     break;
                 case "embarked":
                     newPaidPassenger.set(tableHeader[index], locations.get(passengerDetails[key]));
                     break;
                 case "pclass":
                     newPaidPassenger.set(tableHeader[index], ticketClasses.get(passengerDetails[key]));
                     break;
                 case "fare":
                     newPaidPassenger.set(tableHeader[index], classify(passengerDetails.fare));
                     break;
                 default:
                     newPaidPassenger.set(tableHeader[index], passengerDetails[key]);
             }
         });   
         paidPassengers.push(newPaidPassenger);
     }
 }

// Helper: arrange a name string into a string array.
function arraynge(nameString) {
    // The space and position is important!
    const byComma = ", ";
    const byOpeningBracket =" (";
    const bySpace = " ";

    const nameArray = nameString.split(byComma);
    const surname = nameArray[0];
    const titleAndGivenNames = nameArray[1].split(bySpace);

    let givenNames = "";
    if (titleAndGivenNames[0] === "Mrs.") {
        if (nameArray[1].includes(byOpeningBracket)) {
            givenNames = nameArray[1].split(byOpeningBracket)[1];
            givenNames = givenNames.substring(0,givenNames.length - 1);
        }
    } else {
        titleAndGivenNames.splice(0,1); // removes Mr. or Miss.
        givenNames = titleAndGivenNames.join(bySpace);
    }

    return [surname, givenNames];
}

// Helper: classify fare as one of three types.
function classify(fare) {
    // Only one of these evaluates to true.
    const fareIsCheap = fare < 20;
    const fareIsRegular = fare >= 20 && fare <= 100;
    const fareIsExpensive = fare > 100;

    const classifications = [[fareIsCheap, "Cheap"], [fareIsRegular, "Regular"], [fareIsExpensive, "Expensive"]];
    return classifications.filter(i => i[0]).flat()[1];
}

export default retrievePassengers;