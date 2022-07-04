import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i='

const SingleIngredient = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [ingredient, setIngredient] = useState(null)

  useEffect(() => {
    setLoading(true)
    async function getIngredient() {
      try {
        const response = await fetch(`${url}${id}`)
        const data = await response.json()
        if (data.ingredients) {
          const {
            idingredient: id,
            strIngredient: name,
            strDescription: description,
            strAlcohol: info,
          } = data.ingredients[0]
          const newIngredient = {
            id,
            name,
            description,
            info,
          }
          setIngredient(newIngredient)
        } else {
          setIngredient(null)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    getIngredient()
  }, [id])

  if (loading) {
    return <Loading />
  }
  if (!ingredient) {
    return <h2 className='section-title'>No ingredient founded.</h2>
  }
  const { id, name, description, info } = ingredient
  return (
    <section className='section cocktail-section'>
      <Link className='btn btn-primary' to='/'>
        Back Home
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <div className='drink-info'>
          <p>
            <span className='drink-data'>Name:</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>Category:</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>Info:</span>
            {description}
          </p>

          <p>
            <span className='drink-data'>Ingredients:</span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}> {item} </span> : null
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleIngredient
