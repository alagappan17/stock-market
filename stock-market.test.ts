import {StockMarket} from './stock-market'
import { Investor } from './investor'

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

    it("Should be able to add a stock to the list", () => {
        //Given
        
        //When
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        const stocks = stockMarket.getStocks()
        
        //Then
        expect(stocks[0].name).toEqual(appleStockName)
        expect(stocks[0].tickerSymbol).toEqual(appleStockTickerSymbol)
        expect(stocks[0].price).toEqual(appleStockPrice)
    })

    it("Should be able to add multiple stocks to the list", () => {
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

    it("Should be able to check if a stock exists in the list or not", () => {
        //Given
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        stockMarket.addStock(microsoftStockName, microsoftStockTickerSymbol, microsoftStockPrice)

        //When
        const doesStockExist1 = stockMarket.checkIfStockExist('AAPL')
        const doesStockExist2 = stockMarket.checkIfStockExist('AMZN')

        //Then
        expect(doesStockExist1).toBeTruthy()
        expect(doesStockExist2).not.toBeTruthy
    })

    it("Should be able to fetch details of a stock", () => {
        //Given
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)

        //When
        const stockDetails = stockMarket.fetchStockDetails('AAPL')

        //Then
        expect(stockDetails.name).toEqual(appleStockName)
        expect(stockDetails.tickerSymbol).toEqual(appleStockTickerSymbol)
        expect(stockDetails.price).toEqual(appleStockPrice)
    })

    it("Should not be able to fetch details of a stock that does not exist", () => {
        //Given
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)

        //When

        //Then
        expect(() => stockMarket.fetchStockDetails('AMZN')).toThrowError()
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
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        stockMarket.addStock(microsoftStockName, microsoftStockTickerSymbol, microsoftStockPrice)
        stockMarket.addStock(amazonStockName, amazonStockTickerSymbol, amazonStockPrice)
        
        //When
        stockMarket.deleteStock('MSFT')
        const stocks = stockMarket.getStocks()
        
        //Then
        expect(stocks[1].name).toEqual(amazonStockName)
        expect(stocks[1].tickerSymbol).toEqual(amazonStockTickerSymbol)
        expect(stocks[1].price).toEqual(amazonStockPrice)
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

    it("Should be able to store the list of investors who have subscribed to a particular stock", () => {
        //Given
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        stockMarket.addStock(microsoftStockName, microsoftStockTickerSymbol, microsoftStockPrice)

        //When
        const investor = new Investor('Ted Mosby')
        stockMarket.subscribe(investor, 'AAPL')
        const subscribers = stockMarket.getSubscribers('AAPL')

        //Then
        expect(subscribers).toEqual([investor])
    })

    it("Should not let investors subscribe to a stock that does not exist", () => {
        //Given
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        const investor = new Investor('Lily Aldrin')
        const stockToWatch = 'MSFT'

        //When
        
        //Then
        expect(() => stockMarket.subscribe(investor, stockToWatch)).toThrowError()
    })

    it("Should not be able to get a list of subscribers that does not exist", () => {
        //Given

        //When

        //Then
        expect(() => stockMarket.getSubscribers('MSFT')).toThrowError()
    })

    it("Should be able to send updates to the subscribed investors when the Stock is updated", () => {
        //Given
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        stockMarket.addStock(microsoftStockName, microsoftStockTickerSymbol, microsoftStockPrice)

        const investor = new Investor('Ted Mosby')
        stockMarket.subscribe(investor, 'AAPL')

        const appleStockNewName = 'Apple Inc.'
        const appleStockNewTickerSymbol = 'APPL'
        const appleStockNewPrice = 200

        const logSpy = jest.spyOn(console, 'log');

        //When
        stockMarket.updateStock('AAPL', appleStockNewName, appleStockNewTickerSymbol, appleStockNewPrice)

        //Then
        expect(logSpy).toHaveBeenCalledWith('Hi Ted Mosby, You have a new notification!')
        expect(logSpy).toHaveBeenCalledWith(`${appleStockNewName} has been updated! \nDetails: \n Name: ${appleStockNewName}\n Ticker Symbol: ${appleStockNewTickerSymbol}\n Price: ${appleStockNewPrice}`)
    })

    it("Should be able to check if an investor has subscribed to a stock or not", () => {
        //Given
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        stockMarket.addStock(microsoftStockName, microsoftStockTickerSymbol, microsoftStockPrice)
        const investor = new Investor('Marshall Eriksen')
        stockMarket.subscribe(investor, 'AAPL')

        //When
        const hasSubscibed1 = stockMarket.checkIfSubscribed(investor, 'AAPL')
        const hasSubscibed2 = stockMarket.checkIfSubscribed(investor, 'MSFT')

        //Then
        expect(hasSubscibed1).toBeTruthy()
        expect(hasSubscibed2).not.toBeTruthy()
    })

    it("Should not be able to check if an investor has subscribed to a stock or not for a stock that does not exist", () => {
        //Given
        const investor = new Investor('Marshall Eriksen')

        //When

        //Then
        expect(() => stockMarket.checkIfSubscribed(investor, 'AAPL')).toThrowError()
    })

    it("Should let user unscubscribe from a stock", () => {
        //Given
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        const investor = new Investor('Marshall Eriksen')
        stockMarket.subscribe(investor, 'AAPL')

        //When
        stockMarket.unsubscribe(investor, 'AAPL')

        //Then
        expect(stockMarket.checkIfSubscribed(investor, 'AAPL')).not.toBeTruthy()
    })

    it("Should not let user unscubscribe from a stock they have not subscribed to", () => {
        //Given
        stockMarket.addStock(appleStockName, appleStockTickerSymbol, appleStockPrice)
        const investor = new Investor('Marshall Eriksen')

        //When

        //Then
        expect(() => stockMarket.unsubscribe(investor, 'AAPL')).toThrowError()
    })

    it("Should not let user unscubscribe from a stock that does not exist", () => {
        //Given
        const investor = new Investor('Marshall Eriksen')

        //When

        //Then
        expect(() => stockMarket.unsubscribe(investor, 'AAPL')).toThrowError()
    })
})