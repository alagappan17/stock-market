import { Stock } from "./stock"
import { v4 as uuidv4 } from 'uuid';

type InvestorType = {
    update(message: string): void
}

export class Investor implements InvestorType {
    public id: string
    public name: string

    constructor(name: string) {
        this.name = name
        this.id = uuidv4()
    }

    /**
     * This function fetches the details of the investor
     * @returns Object with id and name
     */
    public getDetails = () => {
        return {
            id: this.id,
            name: this.name
        }
    }

    /**
     * This function updates the details of the investor
     * @param investorNewName String
     */
    public updateDetails = (investorNewName: string) => {
        this.name = investorNewName
    }

    /**
     * This function prints notifications when a stock is updated
     */
    public update = (message: string) => {
        console.log(`Hi ${this.name}, You have a new notification!`)
        console.log(message)
    }
}