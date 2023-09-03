import { StockMarket } from "./stock-market";
import { Investor } from "./investor";

const stockMarket = StockMarket.getInstance()

stockMarket.addStock('Apple','AAPL', 187)
stockMarket.addStock('Microsoft','MSFT', 327)

const investor1 = new Investor('Ted Mosby')
const investor2 = new Investor('Barney Stinson')

stockMarket.subscribe(investor1)
stockMarket.subscribe(investor2)

let stocks = stockMarket.getStocks()
console.log('Old Stocks: ', stocks)

stockMarket.updateStock('AAPL', 'Apple Inc.', 'APPL', 200)
console.log('Updated Stocks: ', stockMarket.getStocks())