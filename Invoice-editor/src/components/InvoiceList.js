import React, { Component } from 'react';
import InvoiceRow from './InvoiceRow'
import '../css/invoiceList.css'

/*Invoice list component creates Invoice Headers
***Called Components :InvoiceRow 
*/

class InvoiceList extends Component{
    render(){
        return(
            <div className="invoice">
                <section className="invoice-header">
                    <div>Item</div>
                    <div>Qty</div>
                    <div>Price </div>
                    <div>Total</div>
                </section>
                <InvoiceRow/>  
            </div> 


        )
    }
}


export default InvoiceList;