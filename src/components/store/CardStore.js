import React from 'react'

const CardStore = () => {

  const packs=[
    {
      name: "Bronze Pack",
      price: 1000,
      amount: 3,
      description: "3 regular cards"
    },
    {
      name: "Silver Pack",
      price: 3000,
      amount: 5,
      description: "includes 2 rare card"
    },
    {
      name: "Gold Pack",
      price: 7500,
      amount: 7,
      description: "includes 2 rare and 1 epic card"
    },
  ]

  return (
    <div className="store-container">
      <div className="store-pack-container">
        {packs.map(pack => {
          return <div className="store-pack">
            <div className="store-pack-name">
              {pack.name}
            </div>
            <div className="store-pack-price">
              {pack.price}
            </div>
            <div className="store-pack-amount">
              {pack.amount} cards
            </div>
            <div className="store-pack-description">
              {pack.name}
            </div>
            
          </div>
        })}
      </div>
    </div>
  )
}

export default CardStore;