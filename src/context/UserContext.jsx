import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from '../firebase'
import { onValue, ref } from "firebase/database";
export let UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [toggleAddCat, setToggleAddCat] = useState(false);
  const [toggleAddItems, setToggleAddItems] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    })

    return () => {
      listen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  useEffect(() => {
    const databaseRef = ref(db, 'Ninongs/category');

    onValue(databaseRef, (snapshot) => {
      setCategories([])
      const data = snapshot.val();
      if (data !== null) {
        const categoriesArray = Object.values(data);
        setCategories((prevCategories) => {
          const uniqueCategories = [...prevCategories, ...categoriesArray];
          return uniqueCategories;
        });
      }
    });
  }, []);


  return (
    <UserContext.Provider value={{
      authUser,
      setAuthUser,
      toggleAddCat,
      setToggleAddCat,
      categories,
      setCategories,
      toggleAddItems,
      setToggleAddItems
    }}>
      {children}
    </UserContext.Provider>
  )
}


