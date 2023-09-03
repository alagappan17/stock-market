export class Stock {
    public name: string
    public tickerSymbol: string
    public price: number
    public lastUpdated: Date

    constructor(name: string, tickerSymbol: string, price: number) {
        this.name = name
        this.tickerSymbol = tickerSymbol
        this.price = price
        this.lastUpdated = new Date()
    }
}