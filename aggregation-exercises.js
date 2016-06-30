/* ## Atlanta Population */
//
// db.getCollection('zipcodes').find({})

// 1. use db.zipcodes.find() to filter results to only the results where city is ATLANTA and state is GA.

db.zipcodes.find({ $and: [ { city: 'ATLANTA' }, { state: 'GA' }]})


// 2. use db.zipcodes.aggregate with $match to do the same as above.

db.zipcodes.aggregate([{$match: {city: 'ATLANTA', state: 'GA'}}])


// 3. use $group to count the number of zip codes in Atlanta.
db.zipcodes.aggregate([
     {$match: {city: 'ATLANTA', state: 'GA'}},
     {$group: {_id: '_', total: {$sum: 1}}}
])


// 4. use $group to find the total population in Atlanta.
db.zipcodes.aggregate([
     {$match: {city: 'ATLANTA', state: 'GA'}},
     {$group: {_id: '_', pop: {$sum: '$pop'}}}
])

/* ## Populations By State */

//1. use aggregate to calculate the total population for each state
db.zipcodes.aggregate([
     {$group: {_id: '$state', pop: {$sum: '$pop'}}}
])

//2. sort the results by population, highest first

db.zipcodes.aggregate([
     {$group: {_id: '$state', pop: {$sum: '$pop'}}},
     { $sort: { pop: -1 } }
])


//3. limit the results to just the first 3 results. What are the top 3 states in population?
db.zipcodes.aggregate([
     {$group: {_id: '$state', pop: {$sum: '$pop'}}},
     { $sort: { pop: -1 } },
     {limit: 3}
])

//## Populations by City

//1. use aggregate to calculate the total population for each city (you have to use city/state combination). You can use a combination for the _id of the $group: { city: '$city', state: '$state' }
db.zipcodes.aggregate(
     { $group: {_id: { city: '$city', state: '$state' }, output: {$sum: '$pop'}}}
)


2. sort the results by population, higest first
3. limit the results to just the first 3 results. What are the top 3 cities in population?
4. What are the top 3 cities in population in Texas?
