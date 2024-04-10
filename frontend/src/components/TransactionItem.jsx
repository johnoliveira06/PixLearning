import React from "react";
import moment from 'moment';

function TransactionItem(props) {

  return (

    <div 
      id={"transactions-list-item-"+props.id} 
      className="transactions-list-item">

        <div className="transactions-list-item-first">
          <div className="item-date">{moment(props.date).format('DD/MM/YYYY')}</div>
          <div className="item-amount">
            {
              (props.type) == "income" ?
              "+" + props.amount.toLocaleString('pt-br',{
                style: 'currency', currency: 'BRL'
              }) :
              "-" + props.amount.toLocaleString('pt-br',{
                style: 'currency', currency: 'BRL'
              })
            }
          </div>
        </div>
        <div className="item-description">{props.description}</div>

    </div>

  );
  
}

export default TransactionItem;
