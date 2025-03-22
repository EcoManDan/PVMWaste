import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold mb-4">You finished the game!</h2>
        <p className="text-lg mb-4">Score: {score} / {wasteItems.length}</p>
        <p>Thanks for playing! 🎉</p>
      </div>
    );
  }

  const item = wasteItems[current];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Waste Sorting Game</h1>
      <Card className="mb-6 text-center">
        <CardContent className="p-6">
          <p className="text-xl font-semibold mb-4">Sort this item:</p>
          <img
            src={item.image}
            alt={item.name}
            className="mx-auto h-32 object-contain mb-4"
          />
          <p className="text-lg">{item.name}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {bins.map((bin) => (
          <Button key={bin} onClick={() => handleDrop(bin)}>{bin}</Button>
        ))}
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          {feedback.type === "correct" ? (
            <p className="text-green-600 text-lg flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" /> {feedback.message}
            </p>
          ) : (
            <p className="text-red-600 text-lg flex items-center justify-center gap-2">
              <XCircle className="w-5 h-5" /> {feedback.message}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
