const chai = require('chai')
const expect = chai.expect
const db = require('../server/db')

//User Model
const User = db.models.user
const Order = db.models.order


describe('Order model', () => {
    beforeEach(()=>{
        return db.sync({ force: true })
        .then(()=>{
            Order.create({
                session: '8RePk4Pd63VTatQdocoIJa1zBN-CIk03',
                user: 1,
                quantity: 1, 
                status: 'complete',
                relatedId: 1
            })
        })
    })
    
    describe('default scope', () => {
        let firstOrder
        beforeEach(() => {
            return Order.findAll({
                where: {
                    status: "complete"
                }
            })
                .then(orders => {
                    firstOrder = orders[0]
                })
        })

        it('returns true if product exists', () => {
            expect(firstOrder.product.to.exist
            )
        })
    })
})



describe('User model', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })

    describe('instanceMethods', () => {
        describe('correctPassword', () => {
            let lady

            beforeEach(() => {
                return User.create({
                    email: 'lady@pruppies.com',
                    password: 'ladyisgreat'
                })
                    .then(user => {
                        lady = user
                    })
            })

            it('returns true if the password is correct', () => {
                expect(lady.correctPassword('ladyisgreat')).to.be.equal(true)
            })

            it('returns false if the password is incorrect', () => {
                expect(lady.correctPassword('ladyisntgreat')).to.be.equal(false)
            })
        })
    })
})