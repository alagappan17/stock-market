import { Stock } from "./stock"
import { Investor } from "./investor"

export class StockMarket {
    public stocks: Stock[]= []
    public static stockMarket: StockMarket
    public subscribers: Map<string, Investor[] | undefined>

    private constructor() {
        this.subscribers = new Map<string, Investor[]>();
    }

    /**
     * Returns the instance of Stock Market
     * @returns StockMarket
     */
    public static getInstance = (): StockMarket => {
        if(!StockMarket.stockMarket) {
            StockMarket.stockMarket = new StockMarket()
        }
        return StockMarket.stockMarket
    }

    /**
     * Resets the instance of Stock Market
     */
    public static resetInstance = (): void => {
        if(StockMarket.stockMarket) {
            StockMarket.stockMarket = new StockMarket()
        }
    }

    /**
     * This function returns all the available stocks in the Stock Market
     * @returns Stock[]
     */
    public getStocks = (): Stock[] => {
        return this.stocks
    }

    /**
     * Checks if a stock exists in the stock list
     * @param tickerSymbol string
     * @returns boolean
     */
    public checkIfStockExist = (tickerSymbol: string): boolean => {
        let doesStockExist = false
        this.stocks.forEach((stock) => {
            if(stock.tickerSymbol === tickerSymbol)
                doesStockExist = true
        })
        return doesStockExist
    }

    /**
     * This functions creates a new Stock and pushes it to the Stocks List
     * @param name String
     * @param tickerSymbol String
     * @param price Number
     * @param time Date
     * @returns Stock
     */
    public addStock = (name: string, tickerSymbol: string, price: number) => {
        if(this.checkIfStockExist(tickerSymbol)) {
            throw new Error('The stock with same ticker symbol already exists')
        }
        
        const newStock = new Stock(name, tickerSymbol, price)

        this.stocks.push(newStock)
        return newStock
    }

    /**
     * This function deletes a Stock from the Stocks List
     * @param tickerSymbol String
     */
    public deleteStock = (tickerSymbol: string) => {
        if(!this.checkIfStockExist(tickerSymbol))
            throw new Error('Cannot delete a Stock that does not exist')

        const getNewStocksList = (stock: Stock) => {
            return stock.tickerSymbol !== tickerSymbol
        }

        const newStocks = this.stocks.filter(getNewStocksList)
        this.stocks = newStocks
    }

    /**
     * This function updates an existing stock. Searches for the existing stock with it's ticker symbol.
     * @param searchTickerSymbol String
     * @param newStockName String
     * @param newStockTickerSymbol String
     * @param newStockPrice Number
     */
    public updateStock = (searchTickerSymbol: string, newStockName: string, newStockTickerSymbol: string, newStockPrice: number) => {
        if(!this.checkIfStockExist(searchTickerSymbol))
            throw new Error("Cannot update stock that does not exist")

        this.stocks.forEach((stock: Stock) => {
            if(stock.tickerSymbol === searchTickerSymbol) {
                stock.name = newStockName
                stock.tickerSymbol = newStockTickerSymbol
                stock.price = newStockPrice
                stock.lastUpdated = new Date()
            }
        })

        if(searchTickerSymbol !== newStockTickerSymbol) {
            const stockSubscribers = this.subscribers.get(searchTickerSymbol)
            this.subscribers.delete(searchTickerSymbol)
            this.subscribers.set(newStockTickerSymbol, stockSubscribers)
        }

        this.notifySubscribers(newStockTickerSymbol)
    }


    /**
     * This function returns a list of investors who have subscribed to ay stock in the stock market
     * @returns Investor[]
     */
    public getSubscribers = (tickerSymbol: string): Investor[] | undefined => {
        if(!this.checkIfStockExist(tickerSymbol)) {
            throw new Error('The Stock you have requested for does not exist')
        }

        return this.subscribers.get(tickerSymbol)
    }


    /**
     * Adds investors to the subscribers list of the stock they have subscribed to and the all subscribers list
     * @param investor Investor
     */
    public subscribe = (investor: Investor, tickerSymbol: string) => {
        let doesStockExist = this.checkIfStockExist(tickerSymbol)

        if(this.subscribers.get(tickerSymbol) === undefined && doesStockExist){
            this.subscribers.set(tickerSymbol, [])
        }

        let stockSubscribers = this.subscribers.get(tickerSymbol)

        if(stockSubscribers && doesStockExist) {
            stockSubscribers.push(investor)
            this.subscribers.set(tickerSymbol, stockSubscribers)
        }

        console.log('From Stock Market: ', this.subscribers.get(tickerSymbol))
    }

    /**
     * Sends a notification to the subscribers
     */
    public notifySubscribers = (tickerSymbol: string) => {
        const stockSubscribers = this.subscribers.get(tickerSymbol)
        if(stockSubscribers){
            stockSubscribers.forEach((subscriber) => {
                subscriber.update()
            })
        }
    }
}