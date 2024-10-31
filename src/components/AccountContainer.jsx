import React from 'react';
import info from "../info.json";

const accountContainer = () => {
  return (
    <div>
        {info.transactions.map((transaction, index) => (
            <section key={index} className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">{transaction.title}</h3>
                    <p className="account-amount">${transaction.montant}</p>
                    <p className="account-amount-description">{transaction.available}</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View Transaction</button>
                </div>
            </section>
        ))}
    </div>
  )
}

export default accountContainer