# Hoppier Test

## Description

![Node.js Badge](https://img.shields.io/badge/JavaScript-Node.js-Green)

This is a test for a Hoppier job application. I was given mock customer data and an API endpoint with product listings. Using Node.js I answered the following questions:

        a) List the real stocked snacks you found under the snacker's 'fave_snack'?
        b) What're the emails of the snackers who listed those as a 'fave_snack'?
        c) If all those snackers we're to pay for their 'fave_snack'what's the total price?

## Installation

Requirements: Node.js/npm and Git/Git-Bash

To Clone this repository:

    git clone git@github.com:antonio36alv/HoppierTest.git

Command Line Installations:
    
    npm install

To Run: 

    node hoppier.js

## Logic/Business Logic

This is just to elaborate some of my thought process on what I saw fit for matching a consumer to their favorite snacks. This aren't perfect matches (i.e. if a consumers favorite snack is a clif crunch bar they were also going to get other recommendation) and this was done on purpose. With my background as a waiter/server if a guest was looking for a particular beer and we did not have it or ran out of it, we always wanted to suggest something similar to it. The reason for that is simply why waste the oppurtunity to give the guest a great experience and also lose out on the sale. However, if we wanted perfect matches it would not be difficult to change the code to reflect that. Simply moving the matchCriteria variable to after we split up the consumer's favorite snack and then having it reflect the length of the keyWords array.