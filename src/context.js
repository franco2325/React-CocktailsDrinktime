import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const url2 = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i='

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('a')
  const [cocktails, setCocktails] = useState([])
  const [ingredients, setIngredients] = useState([])

  const fetchDrinks = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${search}`)
      const data = await response.json()

      const response2 = await fetch(`${url2}${search}`)
      const data2 = await response2.json()

      const { drinks } = data
      const { ingredients } = data2

      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })
        setCocktails(newCocktails)
      } else {
        setCocktails([])
      }
      if (ingredients) {
        const newIngredients = ingredients.map((item) => {
          const {
            idIngredient,
            strIngredient,
            strDescription,
            strType,
            strAlcohol,
            strABV,
          } = item
          return {
            id: idIngredient,
            name: strIngredient,
            image: `https://www.thecocktaildb.com/images/ingredients/${search}.png`,
            info: strDescription,
            type: strType,
            alcohol: strAlcohol,
            abv: strABV,
          }
        })
        setIngredients(newIngredients)
      } else {
        setIngredients([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDrinks()
  }, [search])

  return (
    <AppContext.Provider
      value={{
        loading,
        setSearch,
        cocktails,
        ingredients,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
