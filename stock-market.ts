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
     * Searches a stock with ticker symbol and returns the stock if it exists in the list
     * @param searchTickerSymbol String
     * @returns Stock
     */
    public fetchStockDetails = (searchTickerSymbol: string): Stock => {
        if(!this.checkIfStockExist(searchTickerSymbol)) {
            throw new Error('Cannot get details of stock that does not exist')
        }

        let stockDetails: Stock = new Stock('','',0)
        this.stocks.forEach((stock) => {
            if(stock.tickerSymbol === searchTickerSymbol) {
                stockDetails = stock
            }
        })
        return stockDetails
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
        console.log(`${newStock.tickerSymbol} has been listed!`)
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
            throw new Error('Cannot fetch list of subscribers for a stock that does not exist!')
        }
        return this.subscribers.get(tickerSymbol)
    }


    /**
     * Adds investors to the subscribers list of the stock they have subscribed to and the all subscribers list
     * @param investor Investor
     */
    public subscribe = (investor: Investor, tickerSymbol: string) => {
        if(!this.checkIfStockExist(tickerSymbol)) {
            throw new Error('Cannot subscrbe to a stock that does not exist!')
        }

        if(this.subscribers.get(tickerSymbol) === undefined){
            this.subscribers.set(tickerSymbol, [])
        }

        let stockSubscribers = this.subscribers.get(tickerSymbol)

        if(stockSubscribers) {
            stockSubscribers.push(investor)
            this.subscribers.set(tickerSymbol, stockSubscribers)
        }

        console.log(investor.name + " is now watching " + tickerSymbol)
    }

    /**
     * This function checks if the investor has subscribed to a stock or not
     * @param investorToCheck Investor
     * @param tickerSymbol String
     * @returns Boolean
     */
    public checkIfSubscribed = (investorToCheck: Investor, tickerSymbol: string): boolean => {
        if(!this.checkIfStockExist(tickerSymbol)) {
            throw new Error('Cannot check subscription for a stock that does not exist!')
        }
        let hasSubscribed: boolean = false
        const stockSubscribers = this.subscribers.get(tickerSymbol)
        if(stockSubscribers) {
            stockSubscribers.forEach((investor) => {
                if(investor.id == investorToCheck.id) {
                    hasSubscribed = true
                }
            })
        }
        return hasSubscribed
    }

    public unsubscribe = (investorToBeUnsubscribed: Investor, tickerSymbol: string) => {
        if(!this.checkIfStockExist(tickerSymbol)) {
            throw new Error('Cannot unsubscribe from a stock that does not exist!')
        }
        if(!this.checkIfSubscribed(investorToBeUnsubscribed, tickerSymbol)) {
            throw new Error('Cannot unsubscribe from a stock that you are not subscribed to!')
        }
        
        const subscribers = this.getSubscribers(tickerSymbol)

        const getNewSubscriberList = (investor: Investor) => {
            return investor.id !== investorToBeUnsubscribed.id
        }

        if(subscribers) {
            const newSubscribers = subscribers.filter(getNewSubscriberList)
            this.subscribers.set(tickerSymbol, newSubscribers)
        }
    }

    /**
     * Sends a notification to the subscribers
     */
    public notifySubscribers = (tickerSymbol: string) => {
        const stockSubscribers = this.subscribers.get(tickerSymbol)
        const stockDetails = this.fetchStockDetails(tickerSymbol)
        if(stockSubscribers){
            stockSubscribers.forEach((subscriber) => {
                subscriber.update(`${stockDetails.name} has been updated! \nDetails: \n Name: ${stockDetails.name}\n Ticker Symbol: ${stockDetails.tickerSymbol}\n Price: ${stockDetails.price}`)
            })
        }
    }
}