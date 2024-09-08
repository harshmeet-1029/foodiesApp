import Link from "next/link";
import classes from "./CSS/page.module.css";
import MealsGrid from "@/components/meals/means-grid";
import { GetMeals } from "@/lib/get-meals";
import { Suspense } from "react";
import MealsLoadingPage from "./loader/loading-out";

export const metadata = {
  title: "All Meals",
  description: "Delicious meals, shared by a food-loving community.",
};

const Meal = async () => {
  const data = await GetMeals();

  return <MealsGrid meals={data} />;
};
const MealsPage = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created
          <span className={classes.highlight}> by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. it is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<MealsLoadingPage />}>
          <Meal />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
