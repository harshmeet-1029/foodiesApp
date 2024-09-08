import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/lib/get-meals";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }) => {
  const meal = getMeal(params.meal);
  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
};

const MealDetailsPage = ({ params }) => {
  const meal = getMeal(params.meal);
  if (!meal) {
    notFound();
  }
  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
};

export default MealDetailsPage;
