import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const db = sql("meals.db");
export const GetMeals = async () => {
  new Promise((resolve) => setTimeout(resolve, 20000));

  return db.prepare("select * from meals").all();
};

export const getMeal = (slug) => {
  return db.prepare("SELECT * FROM meals WHERE slug= ?").get(slug);
};

export const saveMeal = async (meal) => {
  meal.slug = slugify(meal.title, { lower: true });
  meal.summary = xss(meal.summary);
  meal.instructions = xss(meal.instructions);
  meal.creator = xss(meal.creator);
  meal.creator_email = xss(meal.creator_email);

  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;
  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket:process.env.AWS_S3_BUCKET,
    Key: filename,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = filename;

  db.prepare(
    `
    INSERT INTO meals (title,summary,instructions,creator,creator_email,image,slug) 
    VALUES(@title, @summary, @instructions,@creator,@creator_email,@image,@slug)
    `
  ).run(meal);
};
