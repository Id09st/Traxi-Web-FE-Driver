import { useEffect, useState } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../utils/firebase';

export const ItemList = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const itemsRef = ref(database, 'All Ride Requests');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();

      const itemList = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setItems(itemList);
    });

    return () => {
      off(itemsRef);
    };
  }, []);

  console.log('Đây nè', items);

  return (
    <div>
      <h2>Danh sách mục</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
