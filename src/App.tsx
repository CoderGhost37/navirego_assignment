import { useState, useEffect } from 'react';
import Card from './components/card';

const App = () => {
  const [checkedBoxes, setCheckedBoxes] = useState(Array(7).fill(false));
  const [activeCards, setActiveCards] = useState<number[]>([]);
  const [cardData, setCardData] = useState(Array(7).fill(''));

  const toggleCheckbox = (index: number) => {
    const updatedBoxes = [...checkedBoxes];
    updatedBoxes[index] = !updatedBoxes[index];
    setCheckedBoxes(updatedBoxes);

    if (updatedBoxes[index]) {
      setActiveCards(prev => [...prev, index]);
    } else {
      setActiveCards(prev => prev.filter(idx => idx !== index));
      setCardData(prevData => {
        const updatedData = [...prevData];
        updatedData[index] = '';
        return updatedData;
      });
    }
  };

  useEffect(() => {
    const fetchData = async (index: number) => {
      try {
        const res = await fetch(`https://navirego-interview.vercel.app/api/letters/${index}`);
        const data = await res.json();

        if (!data || !data.letter) {
          return;
        }

        const newLetter = data.letter;

        setCardData(prevData => {
          const updatedData = [...prevData];
          updatedData[index] = (updatedData[index] + newLetter).slice(-30);
          return updatedData;
        });
      } catch (error) {
        alert(`Error fetching data for checkbox ${index}:`);
      }
    };

    const intervals = checkedBoxes.map((isChecked, index) => {
      if (isChecked) {
        return setInterval(() => fetchData(index), 2000);
      }
      return null;
    });

    return () => {
      intervals.filter(interval => interval !== null).forEach(interval => clearInterval(interval as Timer));
    };
  }, [checkedBoxes]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-200 py-4 px-4 sm:px-8">
      <h1 className="text-2xl font-bold mb-4">Navirego Assignment</h1>
      <div className="flex gap-4 mb-8 mt-4">
        {checkedBoxes.map((isChecked, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              name={`checkbox-${index}`}
              checked={isChecked}
              onChange={() => toggleCheckbox(index)}
              className="mr-2"
            />
            <label className='flex items-center'>
              <span className='hidden md:block mr-1 md:text-sm lg:text-base'>Checkbox</span> {index + 1}
            </label>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {activeCards.map((index) => (
          <div key={index} className="flex items-center justify-center">
            <Card index={index} content={cardData[index]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
