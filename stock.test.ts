import { Stock } from "./stock";

describe("Stock", () => {
    it("Should create a new stock with name, tickerSymbol, price and time", () => {
        //Given
        const appleStockName = 'Apple'
        const appleStockTickerSymbol = 'AAPL'
        const appleStockPrice = 187
        
        //When
        const stock = new Stock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        
        //Then
        expect(stock.name).toEqual(appleStockName)
        expect(stock.tickerSymbol).toEqual(appleStockTickerSymbol)
        expect(stock.price).toEqual(appleStockPrice)
    })
})