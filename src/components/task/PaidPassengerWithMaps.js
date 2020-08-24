// Step 0: Defining the data

// these have to be of the same size
const passengerKeys = ["passengerid", "name", "sex", "embarked", "pclass", "fare", "survived"];
const tableHeader = ["id", ["surname", "given names"], "gender", "embarked from", "ticket class", "ticket fare class", "survived?"]

const locations = new Map([ ["C", "Cherboug"], ["Q", "Queesntown"], ["S", "Southampton"]])
const ticketClasses = new Map([ [1, "First"], [2, "Second"], [3, "Third"]]);

const paidPassengers = []; // storing an array of maps

const retrievePassengers = async function () {
    // Step 1: Fetch
    const passengerData = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=titanic-passengers&q=&rows=100";
    const passengers = new Request(passengerData);
    
    const response = await fetch(passengers);
    const data = await response.json();
    data.records.forEach(record => paidPassengers.push(process(record.fields)));

    return paidPassengers;

    function process(passengerDetails) {
       const passengerHasPaid = passengerDetails.fare > 0;

        if (passengerHasPaid) {
            // use map because insertion order is important
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
            
            return newPaidPassenger;
        }
    }
}

function arraynge(nameString) {
    //the space and position is important!
    const byComma = ", ";
    const byOpeningBracket =" (";
    const bySpace = " ";

    const nameArray = nameString.split(byComma);
    const surname = nameArray[0];
    const titleAndGivenNames = nameArray[1].split(bySpace);

    let givenNames = "";
    if (titleAndGivenNames[0] === "Mrs.") {
        givenNames = nameArray[1].split(byOpeningBracket)[1];
        givenNames = givenNames.substring(0,givenNames.length - 1);
    } else {
        titleAndGivenNames.splice(0,1); // removes Mr. or Miss.
        givenNames = titleAndGivenNames.join(bySpace);
    }

    return [surname, givenNames];
}

function classify(fare) {
    // Only one of these evaluates to true
    const fareIsCheap = fare < 20;
    const fareIsRegular = fare >= 20 && fare <= 100;
    const fareIsExpensive = fare > 100;

    const classifications = [[fareIsCheap, "Cheap"], [fareIsRegular, "Regular"], [fareIsExpensive, "Expensive"]];
    return classifications.filter(i => i[0]).flat()[1];
}

export default retrievePassengers;