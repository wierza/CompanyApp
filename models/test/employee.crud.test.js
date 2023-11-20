const Employee = require("../employees.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");
const { ObjectId }  = require('mongodb');

describe("Employee", () => {
    before(async () => {
        try {
            await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (err) {
            console.error(err);
        }
    });

    describe('Reading data', () => {
		before(async () => {
			const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' })
			await testEmpOne.save()

			const testEmpTwo = new Employee({ firstName: 'James', lastName: 'Kirsch', department: 'Trading' })
			await testEmpTwo.save()
		});
		it('should return all the data with "find" method', async () => {
			const employees = await Employee.find()
			const expectedLength = 2
			expect(employees.length).to.be.equal(expectedLength)
		});
		it('should return proper document by various params with findOne method', async () => {
			const employee = await Employee.findOne({ firstName: 'John' })
			const expectedName = 'John'
			expect(employee.firstName).to.be.equal(expectedName)
		});
		after(async () => {
			await Employee.deleteMany()
		});
	});

	describe('Creating data', () => {
		it('should insert new document with "insertOne" method', async () => {
			const employee = new Employee({ firstName: 'James', lastName: 'Kirsch', department: 'Trading' })
			await employee.save()
			expect(employee.isNew).to.be.false
		});
		after(async () => {
			await Employee.deleteMany()
		});
	});

	describe('Updating data', () => {
		beforeEach(async () => {
			const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' })
			await testEmpOne.save()

			const testEmpTwo = new Employee({ firstName: 'James', lastName: 'Kirsch', department: 'Trading' })
			await testEmpTwo.save()
		});
		afterEach(async () => {
			await Employee.deleteMany()
		});
		it('should properly update one document with "updateOne" method', async () => {
			await Employee.updateOne({ firstName: 'John' }, { $set: { firstName: 'Alex' } })
			const updatedEmployee = await Employee.findOne({ firstName: 'Alex' })
			expect(updatedEmployee).to.not.be.null
		});
		it('should properly update one document with "save" method', async () => {
			const employee = await Employee.findOne({ firstName: 'James' })
			employee.firstName = 'Rafael'
			await employee.save()

			const updatedEmployee = await Employee.findOne({ firstName: 'Rafael' })
			expect(updatedEmployee).to.not.be.null
		});
		it('should properly update multiple documents with "updateMany" method', async () => {
			await Employee.updateMany({}, { $set: { firstName: 'Updated!' } })
			const employees = await Employee.find({ firstName: 'Updated!' })
			expect(employees.length).to.be.equal(2)
		});
	});

	describe('Removing data', () => {
		beforeEach(async () => {
			const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' })
			await testEmpOne.save()

			const testEmpTwo = new Employee({ firstName: 'James', lastName: 'Kirsch', department: 'Trading' })
			await testEmpTwo.save()
		});
		afterEach(async () => {
			await Employee.deleteMany()
		});
		it('should properly remove one document with "deleteOne" method', async () => {
			await Employee.deleteOne({ firstName: 'James' })
			const removeEmployee = await Employee.findOne({ firstName: 'James' })
			expect(removeEmployee).to.be.null
		});
		it('should properly remove multiple documents with "deleteMany" method', async () => {
			await Employee.deleteMany({})
			const employees = await Employee.find()
			expect(employees.length).to.be.equal(0)
		});
	});
});