import React from 'react';
import ReactDOM from 'react-dom';
import Renderer from 'react-test-renderer'
import App from '../components/App';
import InvoiceList from '../components/InvoiceList';
import util from '../util/Helper'

/*App Level Test*/
describe('Test the App rendering and Snapshot',() =>{
	it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
	});

	test('Test App Snapshot',() =>{
		const component = Renderer.create(<App/>);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();

	});
});
/*Test cases for Helper methods*/
describe('Helper Method - isValidNumber',() =>{
	test('number is valid' ,() =>{
		expect(util.isValidNumber(2)).toBeTruthy();
	});

	test('number is null' ,() =>{
		expect(util.isValidNumber(null)).toBeFalsy();
	});
});

describe('Helper Method - getComputedValues - Returns Subtotal, taxAmount & Grand Total of items',() =>{
	let arrItems =[ {
			qty : 2,
			price: 1000,
			total : 2000
		},
		{
			qty : 3,
			price: 3000,
			total : 9000
		}
	];

	test('Values are returned' ,() =>{
		expect(util.getComputedValues(arrItems,0)).toBeDefined();
		
	});

	test('Printing grand total' ,() =>{
		let res = util.getComputedValues(arrItems,0)
		expect(res.grandTotal).toEqual('11550.00');
			
	});

	test('Printing Sub Total' ,() =>{
		let res = util.getComputedValues(arrItems,0)
		expect(res.subTotal).toEqual(11000);
	});

	test('Printing Tax Amount' ,() =>{
		let res = util.getComputedValues(arrItems,0)
		expect(res.taxAmount).toEqual('550.00');
	});



});

/*Test cases for Invoice List*/
it('Invoice List component is generated', () => {
	const div = document.createElement('div');
	ReactDOM.render(<InvoiceList />, div);
});


