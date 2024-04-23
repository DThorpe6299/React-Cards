import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import PlayingCard from "./PlayingCard";
import useAxios from "./hooks/useAxios";
import "./PlayingCardList.css";

function CardTable() {
  const [cards, setCards] = useState([]);
  const [deckData, fetchDeck] = useAxios("https://deckofcardsapi.com/api/deck/new/");
  const [deckId, setDeckId] = useState(null);

  useEffect(() => {
    fetchDeck();
  }, []);

  useEffect(() => {
    if (deckData && deckData.deck_id) {
      setDeckId(deckData.deck_id);
    }
  }, [deckData]);

  const addCard = async () => {
    if (!deckId) return; // Ignores request if deckId is undefined
    try {
      const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const newCard = response.data.cards[0];
      setCards((prevCards) => [
        ...prevCards,
        { ...newCard, id: uuidv4() },
      ]);
      console.log(response.data.remaining);
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  if (!deckData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={addCard}>Add a playing card!</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map((card) => (
          <PlayingCard key={card.id} front={card.image} />
        ))}
      </div>
    </div>
  );
}

export default CardTable;
