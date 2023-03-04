CREATE TABLE "users" (
  "user_id" serial PRIMARY KEY NOT NULL,
  "email" varchar(50) NOT NULL,
  "display_name" varchar(50)
);

CREATE TABLE "collected_plants" (
  "plant_id" serial PRIMARY KEY NOT NULL,
  "user_id" int NOT NULL,
  "type_id" int,
  "image_link" varchar(200) NOT NULL,
  "confidence_score" float,
  "longitude" decimal,
  "latitude" decimal
);

CREATE TABLE "plant_types" (
  "type_id" serial PRIMARY KEY NOT NULL,
  "type_name" varchar(100) NOT NULL
);

ALTER TABLE "collected_plants" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "collected_plants" ADD FOREIGN KEY ("type_id") REFERENCES "plant_types" ("type_id");
