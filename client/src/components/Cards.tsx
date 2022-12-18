import React from "react";
import { CardsList, PagesList } from "../utils/types";
import Card from "./Card";

interface iCards {
  cards: CardsList[];
  page?: PagesList
}
const Cards: React.FC<iCards> = ({cards, page}) => {
  if (!cards.length) {
    return (
      <div className="no-records">
        <h3> No Records Available</h3>
      </div>
    )
  }
  return (
    <div className="cards-wrapper">
      {cards.map((item: CardsList) => <Card currentPage={page} key={item.id} card={item} />)}
    </div>
  )
}

export default Cards;