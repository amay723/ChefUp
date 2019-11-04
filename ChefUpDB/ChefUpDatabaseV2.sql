SET SQL_SAFE_UPDATES = 0;

-- Tables -- 
CREATE table UAccount(
id mediumint NOT NULL AUTO_INCREMENT, UAname varchar(20), email varchar(30), password varchar(20),
unique(UAname), unique(email),
PRIMARY KEY(id)
);

CREATE table Restrictions(
id mediumint NOT NULL AUTO_INCREMENT, diets varchar(50), allergies varchar(50), preference varchar(50),
PRIMARY KEY(id)
);

CREATE table Recipe(
id mediumint NOT NULL AUTO_INCREMENT, Rname varchar(50), category varchar(25), total_ingredients text, tools text, info tinytext, difficulty tinyint, Rtime tinyint,
unique(Rname),
PRIMARY KEY(id)
);

CREATE table Steps(
id mediumint NOT NULL AUTO_INCREMENT, ingredients text, tools text, content tinytext, Sorder int, gifid mediumint NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(gifid) REFERENCES Gifs(id)
);

CREATE table Food(
id mediumint NOT NULL AUTO_INCREMENT, Fname varchar(50), category varchar(25),
unique(Fname),
PRIMARY KEY(id)
);

CREATE table Allergy(
id mediumint Not NULL AUTO_INCREMENT, Aname varchar(25), info tinytext,
PRIMARY KEY(id)
);

CREATE table Diet(
id mediumint Not NULL AUTO_INCREMENT, Dname varchar(25), info tinytext,
PRIMARY KEY(id)
);

CREATE table Tools(
id mediumint Not NULL AUTO_INCREMENT, Tname varchar(25), info tinytext,
PRIMARY KEY(id)
);

CREATE table Gifs(
id mediumint Not NULL AUTO_INCREMENT, url BLOB,
PRIMARY KEY(id)
);

-- Linking Tables -- 
CREATE table Recipe_Steps(
Recipeid mediumint Not NULL, Stepid mediumint Not NULL,
FOREIGN KEY(Recipeid) REFERENCES Recipe(id), FOREIGN KEY(Stepid) REFERENCES Steps(id)
);

CREATE table Tools_Steps(
Stepid mediumint Not NULL, Toolsid mediumint Not NULL,
FOREIGN KEY(Stepid) REFERENCES Steps(id), FOREIGN KEY(Toolsid) REFERENCES Tools(id)
);

CREATE table Food_Steps(
Stepid mediumint Not NULL, Foodid mediumint Not NULL,
FOREIGN KEY(Stepid) REFERENCES Steps(id), FOREIGN KEY(Foodid) REFERENCES Food(id)
);

CREATE table Food_Allergies(
Foodid mediumint Not NULL, Allergyid mediumint Not NULL,
FOREIGN KEY(Foodid) REFERENCES Food(id), FOREIGN KEY(Allergyid) REFERENCES Allergy(id)
);

CREATE table Food_Diets(
Foodid mediumint Not NULL, Dietid mediumint Not NULL,
FOREIGN KEY(Foodid) REFERENCES Food(id), FOREIGN KEY(Dietid) REFERENCES Diet(id)
);

CREATE table Recipe_Food(
Recipeid mediumint Not NULL, Foodid mediumint Not NULL,
FOREIGN KEY(Recipeid) REFERENCES Recipe(id), FOREIGN KEY(Foodid) REFERENCES Food(id)
);

CREATE table Recipe_Tools(
Recipeid mediumint Not NULL, Toolsid mediumint Not NULL,
FOREIGN KEY(Recipeid) REFERENCES Recipe(id), FOREIGN KEY(Toolsid) REFERENCES Tools(id)
);

CREATE table Food_Ammounts(
id mediumint Not NULL AUTO_INCREMENT, Recipeid mediumint Not NULL, Foodid mediumint Not NULL, Ammount varchar(15),
PRIMARY KEY(id),
FOREIGN KEY(Recipeid) REFERENCES Recipe(id), FOREIGN KEY(Foodid) REFERENCES Tools(id)
);

-- Drop table commands --
drop table food;

show tables;

-- Views to see the information --
CREATE VIEW test AS 
SELECT ingredients, tools
FROM Steps 
WHERE id = 1;

SELECT * FROM test;

DROP VIEW Demo;

SELECT Food.Fname, 
FROM Steps
LEFT JOIN Food_Steps ON Steps.id = Food_Steps.Stepid
LEFT JOIN Food ON Food_Steps.Foodid = Food.id;

CREATE VIEW test AS 
SELECT Recipe.Rname, Food.Fname, Tools.Tname
FROM Recipe
LEFT JOIN Recipe_Food ON Recipe.id = Recipe_Food.Recipeid
LEFT JOIN Food ON Recipe_Food.Foodid = Food.id
LEFT JOIN Recipe_Tools ON Recipe.id = Recipe_Tools.Recipeid
LEFT JOIN Tools ON Recipe_Tools.Toolsid = Tools.id;

SELECT RName, TName FROM test
GROUP BY Tname;

SELECT * FROM Recipe;

CREATE VIEW Demo AS
SELECT Rname as Recipe_Name, category as Category, total_ingredients AS Ingredients, tools as Tools, difficulty as Difficulty, Rtime as Cook_Time
FROM Recipe
WHERE id > 1;

Select * FROM Demo;

CREATE VIEW Show_Steps AS
SELECT Recipe.id AS Recipe_ID, Steps.id AS Step_ID, Recipe.Rname AS Recipe_Name, Steps.ingredients, Steps.tools, Steps.content, Steps.Sorder, Gifs.url AS gif_URL, Steps.seconds
From Steps
LEFT JOIN Recipe_Steps ON Steps.id = Recipe_Steps.Stepid
LEFT JOIN Recipe on Recipe_Steps.Recipeid = Recipe.id
LEFT JOIN Gifs on Steps.gifid = Gifs.id;

SELECT * FROM Show_Steps;

DROP view Show_Steps;

CREATE VIEW ingredients AS
SELECT Food_Ammounts.Recipeid AS Recipe_ID, Food_Ammounts.id AS Ingredient_ID, Food_Ammounts.size AS size, Food_Ammounts.unit AS unit, Food.Fname AS food
From Food_Ammounts
LEFT JOIN Food ON Food_Ammounts.Foodid = Food.id;

CREATE VIEW recipe_test AS
SELECT Recipe.id, Recipe.Rname, Recipe.category, Recipe.total_ingredients, Recipe.tools, Recipe.info, Recipe.difficulty, Recipe.Rtime, Diet.Dname, Recipe.icon
From Recipe
LEFT JOIN Recipe_Diets ON Recipe.id= Recipe_Diets.Recipeid
LEFT JOIN Diet ON Recipe_Diets.Dietid = Diet.id;

SELECT * FROM recipe_test;

DROP VIEW recipe_test;

SELECT * FROM Recipe;

SELECT * FROM ingredients;

DROP VIEW ingredients;

DROP VIEW Show_Steps;

SELECT * FROM Food_Steps;
DELETE FROM Food_Steps WHERE Stepid = 10;

CREATE VIEW recipe_test AS
SELECT Recipe.id, Recipe.Rname, Recipe.category, Recipe.total_ingredients, Recipe.tools, Recipe.info, Recipe.difficulty, Recipe.Rtime, Diet.Dname, Recipe.icon
From Recipe
LEFT JOIN Recipe_Diets ON Recipe.id= Recipe_Diets.Recipeid
LEFT JOIN Diet ON Recipe_Diets.Dietid = Diet.id;

CREATE VIEW recipe_test_steps AS
SELECT Recipe.id, Recipe.Rname, Recipe.category, Recipe.total_ingredients, Recipe.tools, Recipe.info, Recipe.difficulty, Recipe.Rtime, Recipe.icon, Recipe_Steps.Stepid,
CASE
	WHEN Recipe_Steps.Stepid = NULL THEN Recipe_Steps.Stepid = 0
END
FROM Recipe
LEFT JOIN Recipe_Steps ON Recipe.id= Recipe_Steps.Recipeid
GROUP BY Recipe.Rname;


SELECT * FROM recipe_test_steps;

DROP VIEW recipe_test_steps;