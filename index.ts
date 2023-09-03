import { StockMarket } from "./stock-market";
import { Investor } from "./investor";

const stockMarket = StockMarket.getInstance()

console.log('*** Listing Stocks: ***')
stockMarket.addStock('Apple','AAPL', 187)
stockMarket.addStock('Microsoft','MSFT', 327)
stockMarket.addStock('Amazon','AMZN', 138)
console.log('\n')


const investor1 = new Investor('Ted Mosby')
const investor2 = new Investor('Barney Stinson')

console.log('*** Investors subscribing to stocks: ***\n')
stockMarket.subscribe(investor1, 'AAPL')
stockMarket.subscribe(investor2, 'MSFT')
stockMarket.subscribe(investor1, 'MSFT')
stockMarket.subscribe(investor1, 'AMZN')
console.log('\n')

console.log('*** Stocks being updated: ***')
stockMarket.updateStock('AAPL', 'Apple Inc.', 'APPL', 200)
stockMarket.updateStock('AMZN', 'Amazon Inc.', 'AMZN', 200)
stockMarket.updateStock('MSFT', 'Microsoft Inc.', 'MSFT', 100)