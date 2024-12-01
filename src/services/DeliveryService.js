import { db } from "lib/firebase"; // Firebase bağlantısı
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const deliveryCollection = collection(db, "orders");

export const DeliveryService = {
    getAllDeliveries: async () => {
        const snapshot = await getDocs(collection(db, "orders")); // `orders` koleksiyonundan veri çekiyoruz
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      },
  updateDeliveryStatus: async (id, status) => {
    const orderDoc = doc(db, "orders", id); 
    await updateDoc(orderDoc, { orderStatus: status });
  },
};
