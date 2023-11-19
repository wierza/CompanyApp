const Employee = require('../employees.model');
const Department = require('../department.model.js');
const expect = require('chai').expect;

describe('Employee', () => {
    it('should throw an error if no "firstName" arg', () => {
        const emp = new Employee({ lastName: 'Doe', department: new Department({ name: 'Management' }) });
      
        emp.validateSync(err => {
          expect(err.errors.firstName).to.exist;
        });
    });

    it('should throw an error if no "firstName" arg', () => {
        const emp = new Employee({ lastName: 'Doe', department: new Department({ name: 'Management' }) });
      
        emp.validateSync(err => {
          expect(err.errors.firstName).to.exist;
        });
    });

    it('should throw an error if no "lastName" arg', () => {
        const emp = new Employee({ firstName: 'John', department: new Department({ name: 'Management' }) });
      
        emp.validateSync(err => {
          expect(err.errors.lastName).to.exist;
        });
    });

    it('should throw an error if no "department" arg', () => {
        const emp = new Employee({ firstName: 'John', lastName: 'Doe' });
      
        emp.validateSync(err => {
          expect(err.errors.department).to.exist;
        });
    });

    it('should throw an error if "firstName" is not a string', () => {
        const cases = [{}, []];
        for(let firstName of cases) {
          const emp = new Employee({ firstName, lastName: 'Doe', department: new Department({ name: 'Management' }) });
      
          emp.validateSync(err => {
            expect(err.errors.firstName).to.exist;
          });
      
        }
      });

    it('should throw an error if "lastName" is not a string', () => {
        const cases = [{}, []];
        for(let lastName of cases) {
          const emp = new Employee({ firstName: 'John', lastName, department: new Department({ name: 'Management' }) });
      
          emp.validateSync(err => {
            expect(err.errors.lastName).to.exist;
          });
      
        }
    });

    it('should not throw an error if "firstName", "lastName", and "department" are correct', () => {
        const emp = new Employee({ firstName: 'John', lastName: 'Doe', department: new Department({ name: 'Management' }) });
      
        emp.validateSync(err => {
          expect(err).to.not.exist;
        });     
    });
});