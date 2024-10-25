import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  type Card = {
    id: number;
    name: string;
  };
  const [data, setData] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card>();
  const [loading, setLoading] = useState(true); // Loading state
  const [showCardFullscreen, setShowCardFullscreen] = useState(false); // Loading state
  const API_URL = "https://sheetdb.io/api/v1/8x87dvviqlcq8?sheet=Custom Format";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data from SheetDB:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []);
  console.log(data);

  const toggleShowCard = (card:Card) => {
    setShowCardFullscreen(!showCardFullscreen);
    setCurrentCard(card)
  }
  return (
    <>
      <h1>OC Format</h1>
      {!loading && (
        <>
          <h3>All Cards ({data.length})</h3>
          <div className="allFormatCardsHolder">
            {data.map((card) => (
              <img
              className="smallCardImage"
                loading="lazy"
                key={card.id}
                src={`https://images.ygoprodeck.com/images/cards_small/${card.id}.jpg`}
                alt={card.name}
                onClick={() => toggleShowCard(card)}
              />
            ))}
          </div>

          {showCardFullscreen && (<div className="showFullCardHolder">
            <div className="mask" onClick={() => setShowCardFullscreen(false)}></div>
            <img className="selectedCard" loading="lazy" src={`https://images.ygoprodeck.com/images/cards/${currentCard.id}.jpg`} alt={currentCard?.name || ""} />
          </div>)}

        </>
      )}
    </>
  );
}

export default App;
