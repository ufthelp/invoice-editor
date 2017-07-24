

module.exports ={
    isValidNumber: function(val){
    if(val !=='' && val !== undefined && val !== null && val !==0){
            return true;
        }
        return false;
    },
    
    getComputedValues: function(invoiceList, index){
        let subTotalAmt = 0;
        let length = invoiceList.length
        for(let i = 0 ; i < length ; i++){
            subTotalAmt += Number(invoiceList[i].total);
        }
        
        let taxAmt = parseFloat(.05 * subTotalAmt).toFixed(2);
        let grandTotalAmt =parseFloat((+taxAmt) + (+subTotalAmt)).toFixed(2);
        
        return{
            subTotal: subTotalAmt,
            taxAmount: taxAmt,
            grandTotal: grandTotalAmt
        }
    }

};