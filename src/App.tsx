import Card from './Card';

const names = ['One', 'Two', 'Three', 'Four', 'Five'];
const cards = names.map((item, index) => {
  return { name: item, zIndex: names.length - index };
});

function App() {
  return (
    <div className="flex flex-1">
      <div className="flex-1 grid">
        {cards.map((card) => (
          <Card zIndex={card.zIndex} forename={card.name} />
        ))}
      </div>
    </div>
  );
}

export default App;
