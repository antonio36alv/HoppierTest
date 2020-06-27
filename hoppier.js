const axios = require("axios");

const init = async () => {
    // will be used to store a leads - email and the snack that is relevant to their fave_snack
    const leads = [];
    // will be used to total potential revenue
    let potentialRevenue = 0;
    // match criteria
    const matchCriteria = 2;
    // count leads found
    let leadsFound = 0;
    // get consumer data
    const MOCK_SNACKER_DATA = await axios.get("https://s3.amazonaws.com/misc-file-snack/MOCK_SNACKER_DATA.json")
        .then(data => data.data)
        .catch(err => console.log(err));
    // get product listing of snack products    
    const snackProducts = await axios.get("https://shop.hoppier.com/collections/snacks-1/products.json?limit=500")
        .then(data => data.data.products)
        .catch(err => console.log(err));
    // loop through each of the mocker snackers
    for(consumer = 0; consumer < MOCK_SNACKER_DATA.length; consumer++) {
        // array to be populated with any snack matches for the consumer
        const snackMatches = [];
        // split fave_snack into array of strings, each word being an element
        const keyWords = MOCK_SNACKER_DATA[consumer].fave_snack.split(" ");
        // loop through each snack product
        for(currentSnack = 0; currentSnack < snackProducts.length; currentSnack++) {
            // counter to determine how many key words match the title of a product, will aim for two
            let matchCount = 0;
            // loop through keywords
        keywordLoop:
            for(currentKeyWord = 0; currentKeyWord < keyWords.length; currentKeyWord++) {
                // if the current snack title includes the current key word
                if(snackProducts[currentSnack].title.includes(keyWords[currentKeyWord])) {
                    // increment match count
                    matchCount++;
                }
                // if the current snack meets the match criteria
                if(matchCount === matchCriteria) {
                    // check to see if we already have already defined a lead
                    // for this consumer
                    if(typeof leads[leadsFound] === "undefined") {
                        // we dont have the current consumer
                        // init this consumer into the leads array with their email since it
                        // the first time including recording them
                        leads[leadsFound] = { email: MOCK_SNACKER_DATA[consumer].email };
                    }
                    // either way we need to add the current snack into the snack matches
                    snackMatches.push(snackProducts[currentSnack].title);
                    // also add the price of the current snack into potential revenue
                    potentialRevenue = potentialRevenue + parseFloat(snackProducts[currentSnack].variants[0].price);
                    // stop checking the keywords move onto the next product
                    break keywordLoop;
                }
            }
        }
        // after we are done checking keywords and the current snack
        // if we have recorded info for this consumer - which will only happen if theres a snack match
        if(typeof leads[leadsFound] !== "undefined") {
            // add the snack matches we have accumulated to their record
            leads[leadsFound].snackMatches = snackMatches;
            // increment leads found since we are done recording info for this lead
            leadsFound++;
        }
    }
    // Answers
    // a) List the real stocked snack products you found under the consumer's 'fave_snack'?
    for(i = 0; i < leads.length; i++) {
        console.log(`Lead ${i + 1}'s recommended favorite snacks are:`)
        for(const favSnack of leads[i].snackMatches) console.log(favSnack)
        console.log("----------------------------------------------------------------")
    }
    // b) What're the emails of the snackers who listed those as a 'fave_snack'?
    console.log(`Email of each lead: `)
    for(const lead of leads) console.log(lead.email);
    console.log("----------------------------------------------------------------")
    // c) If all those snackers we're to pay for their 'fave_snack'what's the total price?
    console.log(`If all those snackers were to pay for their 'fave_snack' the total price would be $${potentialRevenue}`)
    console.log("----------------------------------------------------------------")
    // My favorite snack
    console.log("My favorite snack probably has to be pistachios or combos. I love that combos come in all sorts of different flavors.")
}

init();