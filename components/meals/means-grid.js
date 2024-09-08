import MealItem from "./meal-item";
import classes from "./css/meals-grid.module.css";
const MealsGrid = ({ meals }) => {
  meals.map((data) => {
    data;
  });
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
};

export default MealsGrid;
