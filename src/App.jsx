import { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const originalWasteItems = [
  { name: "Yogurt Cup", image: "/images/yogurt-cup.png", correctBin: "Garbage" },
  { name: "Milk Carton", image: "/images/milk-carton.png", correctBin: "Recycling Station" },
  { name: "Pop Can", image: "/images/pop-can.png", correctBin: "Beverage Collection Bin" },
  { name: "Aluminum Foil", image: "/images/aluminum-foil.png", correctBin: "Recycling Station" },
  { name: "Wine Bottle", image: "/images/wine-bottle.png", correctBin: "Recycling Station" },
  { name: "Food Leftovers", image: "/images/food-leftovers.png", correctBin: "Garbage" },
  { name: "500ml Beverage Bottle", image: "/images/beverage-bottle.png", correctBin: "Beverage Collection Bin" },
  { name: "Soup Can", image: "/images/soup-can.png", correctBin: "Recycling Station" },
  { name: "Plastic Wrap", image: "/images/plastic-wrap.png", correctBin: "Recycling Station" },
  { name: "Pens and Highlighters", image: "/images/pens.png", correctBin: "Writing Utensil Box" },
  { name: "Juice Box", image: "/images/juice-box.png", correctBin: "Recycling Station" },
  { name: "Chip Bag", image: "/images/chip-bag.png", correctBin: "Snack Wrapper Box" },
  { name: "Used Batteries", image: "/images/batteries.png", correctBin: "Battery Bin" },
  { name: "Old Cell Phone", image: "/images/cell-phone.png", correctBin: "Garbage" },
  { name: "Popsicle Sticks", image: "/images/popsicle-sticks.png", correctBin: "Garbage" },
  { name: "Plastic Coffee Pod", image: "/images/coffee-pod.png", correctBin: "Coffee Pod Box" },
  { name: "Coffee Cup Lid", image: "/images/coffee-lid.png", correctBin: "Garbage" },
  { name: "Paper Coffee Cup", image: "/images/paper-cup.png", correctBin: "Garbage" },
  { name: "Ice Cream Carton", image: "/images/ice-cream-carton.png", correctBin: "Recycling Station" },
  { name: "Plastic Utensils", image: "/images/plastic-utensils.png", correctBin: "Garbage" },
  { name: "Styrofoam", image: "/images/styrofoam.png", correctBin: "Garbage" },
  { name: "Coffee Grounds", image: "/images/coffee-grounds.png", correctBin: "Compost" },
  { name: "Oils and Fats", image: "/images/oils.png", correctBin: "Compost" },
  { name: "Condiments", image: "/images/condiments.png", correctBin: "Compost" },
  { name: "Egg Shells", image: "/images/egg-shells.png", correctBin: "Compost" },
  { name: "Fruit and Veggies", image: "/images/fruit-veggies.png", correctBin: "Compost" },
  { name: "Meat and Fish", image: "/images/meat-fish.png", correctBin: "Compost" },
  { name: "Seafood", image: "/images/seafood.png", correctBin: "Compost" },
  { name: "Paper Towels", image: "/images/paper-towels.png", correctBin: "Compost" },
  { name: "Pizza Carton", image: "/images/pizza-carton.png", correctBin: "Compost" },
  { name: "Newspapers", image: "/images/newspapers.png", correctBin: "Compost" },
  { name: "Parchment Paper", image: "/images/parchment-paper.png", correctBin: "Compost" },
  { name: "Paper Plates", image: "/images/paper-plates.png", correctBin: "Compost" },
];

const bins = [
  "Recycling Station",
  "Coffee Pod Box",
  "Snack Wrapper Box",
  "Writing Utensil Box",
  "Beverage Collection Bin",
  "Battery Bin",
  "Garbage",
  "Compost",
];

function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export default function WasteSortGame() {
  const [wasteItems, setWasteItems] = useState([]);
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setWasteItems(shuffleArray(originalWasteItems));
  }, []);

  const handleDrop = (bin) => {
    if (bin === wasteItems[current].correctBin) {
      setScore(score + 1);
      setFeedback({ type: "correct", message: "Correct!" });
    } else {
      setFeedback({
        type: "incorrect",
        message: `Oops! The correct bin is ${wasteItems[current].correctBin}.`,
      });
    }
    setTimeout(() => {
      setFeedback(null);
      setCurrent(current + 1);
    }, 1500);
  };

  if (wasteItems.length > 0 && current >= wasteItems.length) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>You finished the game!</h2>
        <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>Score: {score} / {wasteItems.length}</p>
        <p>Thanks for playing! 🎉</p>
      </div>
    );
  }

  const item = wasteItems[current];

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "1.5rem" }}>
        Waste Sorting Game
      </h1>

      <div style={{ textAlign: "center", border: "1px solid #ccc", padding: "1rem", marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Sort this item:</p>
        <img src={item.image} alt={item.name} style={{ height: "130px", objectFit: "contain", marginBottom: "1rem" }} />
        <p style={{ fontSize: "1.1rem" }}>{item.name}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
        {bins.map((bin) => (
          <button key={bin} onClick={() => handleDrop(bin)} style={{ padding: "0.75rem", fontSize: "1rem", backgroundColor: "#e0e0e0", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            {bin}
          </button>
        ))}
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: "1.5rem", textAlign: "center" }}
        >
          {feedback.type === "correct" ? (
            <p style={{ color: "green", fontSize: "1.1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle size={20} /> {feedback.message}
            </p>
          ) : (
            <p style={{ color: "red", fontSize: "1.1rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
              <XCircle size={20} /> {feedback.message}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
