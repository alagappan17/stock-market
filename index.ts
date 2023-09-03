import { StockMarket } from "./stock-market";
import { Investor } from "./investor";


// Stock Market
//      getInstance
//      resetInstance
//      getStocks
//      checkIfStockExist
//      fetchStockDetails
//      addStock
//      deleteStock
//      updateStock
//      getSubscribers
//      subscribe
//      checkIfSubscribed
//      unsubscribe
//      notifySubscribers

// Investor
//      getDetails
//      updateDetails
//      update
const stockMarket = StockMarket.getInstance()

console.log('*** Listing Stocks: ***')
stockMarket.addStock('Apple','AAPL', 187)
stockMarket.addStock('Microsoft','MSFT', 327)
stockMarket.addStock('Amazon','AMZN', 138)
console.log('\n')


console.log('*** Creating Investors: ***')
const investor1 = new Investor('Ted Mosby')
console.log(investor1)
const investor2 = new Investor('Barney Stinson')
console.log(investor2)
console.log('\n')

console.log('*** Updating Investor: ***')
investor1.updateDetails('Lily Aldrin')
console.log('\n')

console.log('*** Investors subscribing to stocks: ***')
stockMarket.subscribe(investor1, 'AAPL')
stockMarket.subscribe(investor1, 'MSFT')
stockMarket.subscribe(investor1, 'AMZN')
stockMarket.subscribe(investor2, 'MSFT')
console.log('\n')

console.log('*** Stocks being updated: ***')
stockMarket.updateStock('AAPL', 'Apple Inc.', 'APPL', 200)
stockMarket.updateStock('AMZN', 'Amazon Inc.', 'AMZN', 200)
stockMarket.updateStock('MSFT', 'Microsoft Inc.', 'MSFT', 100)
console.log('\n')