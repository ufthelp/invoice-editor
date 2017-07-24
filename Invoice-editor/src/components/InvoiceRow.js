import React, { Component } from 'react';
import '../css/invoiceRow.css'
import util from '../util/Helper'


/*Invoice Row component creates each item row and do price calculations
***Called Components :N/A 
*/

class InvoiceList extends Component{
    constructor(props){
        super(props);
        this.state = {
            subTotal: null,
            taxAmount: null,
            grandTotal: null,
            items: [
                {   
                    qty: 0,
                    price: 0,
                    total: 0
                }]
    };
    this.itemPrice = this.itemPrice.bind(this);
  }

  /*Method to add new item row in invoice list */
    addNewItem = (e) => {
        e.preventDefault();
        this.setState({ 
            items: this.state.items.concat([
                { 
                    qty: 0 ,
                    price: 0,
                    total:0
                }
            ])
        });
    }

  /*Method to remove item row from invoice list */
    removeInvoiceRow = (idx) => () => {
         this.setState({ items: this.state.items.filter((s, sidx) => idx !== sidx) },function(){
      
               let result = util.getComputedValues(this.state.items,idx);
               this.setState({ 
                    subTotal: result.subTotal,
                    taxAmount: result.taxAmount,
                    grandTotal: result.grandTotal 
                });
         });
        
    }
    

  /*Method to calculate item price (qty*price) for each row in invoice list */
    itemPrice = (idx) => (evt) => {
        /*Create new items list */
        const newItemList = this.state.items.map((item, sidx) => {  
            if (idx !== sidx) return item;
            //idetify the calling inputbox 
            const name = evt.target.name;
            //set the value
            return { ...item,[name]:evt.target.value };
        })

        let qty = newItemList[idx].qty;
        let price = newItemList[idx].price;
        /*Do total calculations only when Qty and Price is added by user */
        if(util.isValidNumber(qty) && util.isValidNumber(price))
        {
            let itemPrice = parseFloat(price * qty).toFixed(2);
            newItemList[idx].total = itemPrice;
            let result = util.getComputedValues(newItemList,idx);
                
            this.setState({ 
                subTotal: result.subTotal,
                taxAmount: result.taxAmount,
                grandTotal: result.grandTotal 
            });
            
        }
        /*Add newly created list to main items list*/
        this.setState({ 
            items: newItemList
        });
  }

/*Creates the items row for each item values */
  render(){
        return(
        <form >
              {this.state.items.map((item, idx) => (
           
                    <div className="item-row" key={idx}>
                        <input type="text" 
                            id="item"
                            ref="item"
                            required
                            className="form-item"
                            placeholder="Description of Item..."
                            defaultValue={''}/>
                        <input type="number" 
                            name="qty"
                            ref="qty"
                            required
                            value={item.qty}
                            onChange={this.itemPrice(idx)} 
                            className="form-item form-qty"/>
                        <input type="number"
                            name="price"
                            ref="price"
                            required
                             value={item.price}
                            onChange={this.itemPrice(idx)}
                            className="form-item"/>
                        <input type="text"  
                            name="total"
                            required
                            value={item.total}
                            className="form-item"/>
                        <button type="button" 
                            onClick={this.removeInvoiceRow(idx)} 
                            className="delete-btn ">
                            X
                         </button>
                     </div>
            ))}

            <button type="button" onClick={this.addNewItem} className="add-btn">Add Item</button>

            {/* calculating the total of all items */}
            <section className="invoice-total">
                <section className="invoice-p-labels">   
                     <div className="item-label">
                         Subtotal
                     </div>
                     <div className="item-label">
                         Tax (5%)
                     </div>
                      <div className="item-label">
                          Total
                     </div>
                </section>
                <section className="invoice-cal">
                    <label value>${this.state.subTotal}</label>
                    <label value>${this.state.taxAmount}</label>
                    <label value>${this.state.grandTotal}</label>
                </section>
            </section>

        </form>
        )
    }
}

export default InvoiceList;