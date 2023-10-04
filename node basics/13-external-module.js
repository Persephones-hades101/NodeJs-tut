// to use external modules you will first have to install them using "npm i <pakage-name>"

// once you do that you will find that your pakage.json file is updated and now it has one more value in the dependencies properties ie the pakage you just installed.

// i have installed pakage called lodash to test it and use it

const _=require('lodash')

const arr=[3,[4,[5,6,[8,7]]]]

const newarr=_.flattenDeep(arr)
console.log(newarr);