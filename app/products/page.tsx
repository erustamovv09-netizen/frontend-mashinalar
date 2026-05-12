// Har bir mashina aylanayotgan (map) joyda:
{items.map((item) => (
  <div key={item.id} className="border p-4">
    <h3>{item.name}</h3>
    {/* ... boshqa ma'lumotlar ... */}
    
    {/* SHU YERGA TUGMANI QO'SHAMIZ */}
    <ClientEditButton carId={item.id} />
  </div>
))}