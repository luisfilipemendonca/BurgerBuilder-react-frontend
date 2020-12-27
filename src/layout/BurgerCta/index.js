import ingredients from "../../constants/ingredients";

import IngredientCounter from "../../components/IngredientCounter";
import TitleSecondary from "../../components/TitleSecondary";

const BurgerCta = ({
  addIngredientHandler,
  removeIngredientHandler,
  order,
  resetOrderHandler,
}) => {
  return (
    <section className="section burger-cta">
      <header className="burger-cta__header">
        <TitleSecondary title="Add Ingredients" />
      </header>
      <div className="burger-cta__content">
        {ingredients.map((ingredient) => (
          <IngredientCounter
            key={ingredient.name}
            ingredient={ingredient.name}
            quantity={ingredient.quantity}
            addIngredientHandler={addIngredientHandler}
            removeIngredientHandler={removeIngredientHandler}
            minusDisabled={!order.some((ing) => ing.name === ingredient.name)}
            plusDisabled={
              order.filter((ing) => ing.name === ingredient.name).length >= 5
            }
          />
        ))}
        <button onClick={resetOrderHandler}>Reset Burger</button>
      </div>
    </section>
  );
};

export default BurgerCta;
