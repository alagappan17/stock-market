import { Investor } from "./investor"

describe("Investor", () => {
    it("Should create a new Investor with name", () => {
        //Given
        const investorName = 'Barney Stinson'

        //When
        const investor = new Investor(investorName)

        //Then
        expect(investor.name).toEqual(investorName)
    })

    it("Should be able to view details", () => {
        //Given
        const investorName = 'Barney Stinson'
        const investor = new Investor(investorName)

        //When
        const investorDetails = investor.getDetails()

        //Then
        expect(investorDetails.name).toEqual(investorName)
    })

    it("Should be able to update details", () => {
        //Given
        const investorName = 'Barney Stinson'
        const investorNewName = 'Jake Peralta'

        const investor = new Investor(investorName)

        //When
        investor.updateDetails(investorNewName)
        const investorDetails = investor.getDetails()

        //Then
        expect(investorDetails.name).toEqual(investorNewName)

    })

    it("Should print an update notification", () => {
        //Given
        const investorName = 'Barney'
        const investor = new Investor(investorName)

        const logSpy = jest.spyOn(console, 'log');

        //When
        investor.update('Amazon has been updated')

        //Then
        expect(logSpy).toHaveBeenCalledWith('Hi Barney, You have a new notification!')
    })
})