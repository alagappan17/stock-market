import {StockMarket} from './stock-market'
import { Investor } from './investor'
import { Stock } from './stock'

describe("Stock Market", () => {
    var stockMarket: StockMarket
    var appleStockName: string, appleStockTickerSymbol: string, appleStockPrice: number
    var microsoftStockName: string, microsoftStockTickerSymbol: string, microsoftStockPrice: number
    var amazonStockName: string, amazonStockTickerSymbol: string, amazonStockPrice: number

    beforeEach(() => {
        stockMarket = StockMarket.getInstance()

        appleStockName = 'Apple'
        appleStockTickerSymbol = 'AAPL'
        appleStockPrice = 187

        microsoftStockName = 'Microsoft'
        microsoftStockTickerSymbol = 'MSFT'
        microsoftStockPrice = 327
    
        amazonStockName = 'Amazon'
        amazonStockTickerSymbol = 'AMZN'
        amazonStockPrice = 138
    })

    afterEach(() => {
        StockMarket.resetInstance()
    })

    it("Should be able to view the list of stocks", () => {
        //Given

        //When
        const stocks = stockMarket.getStocks()
        
        //Then
        expect(stocks).toEqual([])
    })

    it("Should be able to add stocks to the list", () => {
        //Given
        
        //When
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        stockMarket.addStock(microsoftStockName, microsoftStockTickerSymbol, microsoftStockPrice)
        const stocks = stockMarket.getStocks()
        
        //Then
        expect(stocks[0].name).toEqual(appleStockName)
        expect(stocks[0].tickerSymbol).toEqual(appleStockTickerSymbol)
        expect(stocks[0].price).toEqual(appleStockPrice)
        expect(stocks[1].name).toEqual(microsoftStockName)
        expect(stocks[1].tickerSymbol).toEqual(microsoftStockTickerSymbol)
        expect(stocks[1].price).toEqual(microsoftStockPrice)
    })

    it("Should not be able to add multiple stocks with the same ticker symbol", () => {
        //Given
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        
        //When

        //Then
        expect(() => stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)).toThrowError()
    })

    it("Should be able to delete a Stock with it's Ticker Symbol", () => {
        //Given
        const appleStock = new Stock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        const amazonStock = new Stock(amazonStockName, amazonStockTickerSymbol, amazonStockPrice)

        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        stockMarket.addStock(microsoftStockName, microsoftStockTickerSymbol, microsoftStockPrice)
        stockMarket.addStock(amazonStockName, amazonStockTickerSymbol, amazonStockPrice)
        
        //When
        stockMarket.deleteStock('MSFT')
        const stocks = stockMarket.getStocks()
        
        //Then
        expect(stocks).toEqual([appleStock, amazonStock])
    })

    it("Should not be able to delete a stock that does not exist", () => {
        //Given
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        stockMarket.addStock(microsoftStockName, microsoftStockTickerSymbol, microsoftStockPrice)

        //When

        //Then
        expect(() => stockMarket.deleteStock('ABCD')).toThrowError()
    })

    it("Should be able to update an existing stock", () => {
        //Given
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        const appleStockNewName = 'Apple Inc.'
        const appleStockNewTickerSymbol = 'APPL'
        const appleStockNewPrice = 200

        //When
        stockMarket.updateStock('AAPL', appleStockNewName, appleStockNewTickerSymbol, appleStockNewPrice)
        const stocks = stockMarket.getStocks()

        //Then
        expect(stocks[0].name).toEqual(appleStockNewName)
        expect(stocks[0].tickerSymbol).toEqual(appleStockNewTickerSymbol)
        expect(stocks[0].price).toEqual(appleStockNewPrice)
    })

    it("Should not be able to update a stock that does not exist", () => {
        //Given
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        stockMarket.addStock(microsoftStockName, microsoftStockTickerSymbol, microsoftStockPrice)
        const appleStockNewName = 'Apple Inc.'
        const appleStockNewTickerSymbol = 'APPL'
        const appleStockNewPrice = 200

        //When

        //Then
        expect(() => stockMarket.updateStock('AZMN', appleStockNewName, appleStockNewTickerSymbol, appleStockNewPrice)).toThrowError()
    })

    it("Should be able to store all the investors who have subscribed", () => {
        //Given
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        stockMarket.addStock(microsoftStockName, microsoftStockTickerSymbol, microsoftStockPrice)

        //When
        const investor = new Investor('Ted Mosby')
        stockMarket.subscribe(investor, 'AAPL')
        const subscribers = stockMarket.getSubscribers('AAPL')
        console.log('From Test: ', [investor])

        //Then
        expect(subscribers).toEqual([investor])
    })

    // it("Should send back a notification when stocks are updated", () => {
    //     //Given
    //     stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
    //     stockMarket.addStock(microsoftStockName, microsoftStockTickerSymbol, microsoftStockPrice)

    //     const investor = new Investor('Ted Mosby')
    //     stockMarket.subscribe(investor)

    //     const appleStockNewName = 'Apple Inc.'
    //     const appleStockNewTickerSymbol = 'APPL'
    //     const appleStockNewPrice = 200

    //     const logSpy = jest.spyOn(console, 'log');

    //     //When
    //     stockMarket.updateStock('AAPL', appleStockNewName, appleStockNewTickerSymbol, appleStockNewPrice)

    //     //Then
    //     expect(logSpy).toHaveBeenCalledWith('New stock update!')
    // })
})