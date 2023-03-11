CREATE TABLE "users" (
  "user_id" serial PRIMARY KEY NOT NULL,
  "email" varchar(50) NOT NULL,
  "display_name" varchar(50)
);

CREATE TABLE "observations" (
  "observation_id" serial PRIMARY KEY NOT NULL,
  "user_id" int NOT NULL,
  "plant_type_id" int,
  "date_created" date NOT NULL,
  "image_url" varchar(200) NOT NULL,
  "confidence_score" float,
  "longitude" decimal,
  "latitude" decimal,
  "description" varchar(500)
);

CREATE TABLE "plant_types" (
  "plant_type_id" serial PRIMARY KEY NOT NULL,
  "plant_name" varchar(100) NOT NULL
);

ALTER TABLE "observations" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "observations" ADD FOREIGN KEY ("plant_type_id") REFERENCES "plant_types" ("plant_type_id");
