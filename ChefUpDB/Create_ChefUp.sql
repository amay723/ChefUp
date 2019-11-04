

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
id mediumint NOT NULL AUTO_INCREMENT, Rname varchar(50), category varchar(25), total_ingredients text, tools text, info tinytext, difficulty tinyint, Rtime tinyint, icon MEDIUMTEXT,
unique(Rname),
PRIMARY KEY(id)
);

CREATE table Gifs(
id mediumint Not NULL AUTO_INCREMENT, url MEDIUMTEXT,
PRIMARY KEY(id)
);

CREATE table Steps(
id mediumint NOT NULL AUTO_INCREMENT, ingredients text, tools text, content tinytext, Sorder int, gifid mediumint NOT NULL, seconds smallint,
PRIMARY KEY(id),
FOREIGN KEY(gifid) REFERENCES Gifs(id)
);

-- Do we want allergies and dietary stuff to start out as ENUMs? -- 
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

CREATE table Recipe_Allergies(
Recipeid mediumint Not NULL, Allergyid mediumint Not NULL,
FOREIGN KEY(Recipeid) REFERENCES Recipe(id), FOREIGN KEY(Allergyid) REFERENCES Allergy(id)
);

CREATE table Recipe_Diets(
Recipeid mediumint Not NULL, Dietid mediumint Not NULL,
FOREIGN KEY(Recipeid) REFERENCES Recipe(id), FOREIGN KEY(Dietid) REFERENCES Diet(id)
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
id mediumint Not NULL AUTO_INCREMENT, Recipeid mediumint Not NULL, Foodid mediumint Not NULL, size float, unit varchar(15),
PRIMARY KEY(id),
FOREIGN KEY(Recipeid) REFERENCES Recipe(id), FOREIGN KEY(Foodid) REFERENCES Food(id)
);

-- Test Burrito Recipe -- 
INSERT Into Recipe (Rname, category, total_ingredients, tools, info, difficulty, Rtime, icon)
VALUES("Greg's Mouth Melting Bean Burrito", "Burrito", "Refried beans, Cheese, Taco Sauce, Tortilla", "Medium pot, spoon, can opener", "Greg's simple burritos", 1, 15, "https://cdn.discordapp.com/attachments/575621658082148352/575624691012730891/kebab.png");

-- Adding food for test recipe -- 
INSERT Into Food (Fname, category)
VALUES("tortilla", "carbohydrate");

INSERT Into Food (Fname, category)
VALUES("refried beans", "protein");

INSERT Into Food (Fname, category)
VALUES("mexican cheese blend", "dairy");

INSERT Into Food (Fname, category)
VALUES("taco sauce", "sauce");

-- connecting ingredients to recipe -- 
INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(1, 1);

INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(1, 2);

INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(1, 3);

INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(1, 4);

INSERT Into Tools(Tname, info)
VALUES("can opener", "A small device used to open cans, can either be electronic or manual");

INSERT Into Tools(Tname, info)
VALUES("spoon", "A small device used to pick up food or stir");

INSERT Into Tools(Tname, info)
VALUES("medium pot", "A medium device that goes on a stovetop");

INSERT Into Tools(Tname, info)
VALUES("stove", "Stoves come in several varities, they are used with pots and pans to cook food");

INSERT Into Tools(Tname, info)
VALUES("plate", "Food is put on plates to consume");

INSERT Into Tools(Tname, info)
VALUES("none", "");

INSERT Into Food (Fname, category)
VALUES("gluten-free all-purpose flour", "carbohydrate");

INSERT Into Food (Fname, category)
VALUES("ground flaxseed", "carbohydrate");

INSERT Into Food (Fname, category)
VALUES("baking powder", "carbohydrate");

INSERT Into Food (Fname, category)
VALUES("ground cinnamon", "spice");

INSERT Into Food (Fname, category)
VALUES("salt", "spice");

INSERT Into Food (Fname, category)
VALUES("maple syrup", "sweet");

INSERT Into Food (Fname, category)
VALUES("vanilla", "sweet");

INSERT Into Food (Fname, category)
VALUES("unsweetened applesauce", "fruit");

INSERT Into Food (Fname, category)
VALUES("almond milk", "imitation");

INSERT Into Food (Fname, category)
VALUES("batter", "combination");

INSERT Into Food (Fname, category)
VALUES("pancake", "carbohydrate");

INSERT Into Food (Fname, category)
VALUES("none", "-");

INSERT Into Tools(Tname, info)
VALUES("knife", "You can cut food with it");

INSERT Into Tools(Tname, info)
VALUES("griddle", "Like a flat stove");

INSERT Into Tools(Tname, info)
VALUES("medium mixing bowl", "Food is mixed in this");

INSERT Into Tools(Tname, info)
VALUES("medium pan", "Useful for cooking a lot of food on the stove");

INSERT Into Tools(Tname, info)
VALUES("spatula", "Cooking utensil used with pans usually");

INSERT Into Tools(Tname, info)
VALUES("non-stick spray", "Nothing is worse than having food stuck to your other tools");

INSERT Into Food (Fname, category)
VALUES("brussel sprouts", "vegetable");

INSERT Into Tools(Tname, info)
VALUES("cutting board", "You do not want to mark up your kitchen by cutting on the counter");

INSERT Into Tools(Tname, info)
VALUES("medium skilet", "Its like a flat pan you cook stuff on");

INSERT Into Tools(Tname, info)
VALUES("tongs", "Help you pick up things without using your fingers");

INSERT Into Food (Fname, category)
VALUES("water", "just water");

INSERT Into Food (Fname, category)
VALUES("k-cup", "coffee grounds");

INSERT Into Food (Fname, category)
VALUES("coffee", "just coffee");

INSERT Into Tools(Tname, info)
VALUES("keurig", "Uses k-cups in order to create coffee");

INSERT Into Tools(Tname, info)
VALUES("mug", "You put liquid in it");

-- Connecting tools to recipe -- 
INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(1, 1);

INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(1, 2);

INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(1, 3);

INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(1, 4);

INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(1, 5);

INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(1, 6);

-- Null gif --
INSERT Into Gifs(url)
VALUES("BLANK");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575612216812765186/ChefUpGMMB1.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575612283082899471/ChefUpGMMB2.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575612339747946497/ChefUpGMMB3.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575612391824293889/ChefUpGMMB4.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575612448497860618/ChefUpGMMB5.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575612494274363412/ChefUpGMMB6.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575612549509152770/ChefUpGMMB7.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575612604928622602/ChefUpGMMB8.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575612669701259264/ChefUpGMMB9.gif");

-- Creating Steps -- 
INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("refried beans", "can opener", "Open the can(s) of refried beans with the can opener", 1, 2, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("none", "stove", "Turn stove on medium", 2, 3, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("refried beans", "medium pot", "Put the refried beans into the medium pot", 3, 4, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("taco sauce", "medium pot", "Pour taco sauce into the pot", 4, 5, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("none", "stove, spatula", "place medium pot on it on stove, and begin to mix. constantly stir for about 5 minutes", 5, 6, 300);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("tortilla", "plate", "Put a tortilla(s) on the plate", 6, 7, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("tortilla, refried beans", "spatula", "Place about 1/4 cup of refried beans down the middle of the tortilla", 7, 8, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("tortilla, refried beans, cheese", "none", "Sprinkle cheese on the refried beans", 8, 9, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("tortilla, refried beans, cheese", "none", "Roll up the tortilla and enjoy", 9, 10, 0);

-- Ammounts of food -- 
INSERT Into Food_Ammounts(Recipeid, Foodid, size, unit)
VALUES(1, 3, 1, "tablespoon");

INSERT Into Food_Ammounts(Recipeid, Foodid, size, unit)
VALUES(1, 2, 1, "can");

INSERT Into Food_Ammounts(Recipeid, Foodid, size, unit)
VALUES(1, 1, 2, " ");

INSERT Into Food_Ammounts(Recipeid, Foodid, size, unit)
VALUES(1, 4, 0.25, "cup");

select * from Food;

-- Adding the tools to the steps -- 
INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(1, 1);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(2, 4);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(3, 3);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(4, 3);

SELECT * FROm Steps;

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(5, 4);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(5, 11);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(6, 5);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(7, 11);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(8, 6);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(9, 6);

-- Putting Food per step -- 
INSERT Into Food_Steps(Stepid, Foodid)
VALUES(1, 2);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(2, 16);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(3, 2);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(4, 4);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(5, 16);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(6, 1);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(7, 1);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(7, 2);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(8, 1);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(8, 2);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(8, 3);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(9, 1);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(9, 2);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(9, 3);

-- Adding the Steps to the recipe --
INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(1, 1);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(1, 2);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(1, 3);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(1, 4);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(1, 5);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(1, 6);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(1, 7);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(1, 8);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(1, 9);

-- Filling our Recipe Names -- 
INSERT Into Recipe (Rname, category, total_ingredients, tools, info, difficulty, Rtime, icon)
VALUES("Bisquick Pancakes", "Pancakes", "Bisquick, eggs, milk", "mixxing bowl, spoon, griddle, spatula", "Just buy premade pancake mix", 1, 10, "https://cdn.discordapp.com/attachments/575621658082148352/575624709979373599/pancakes.png");
INSERT Into Recipe (Rname, category, total_ingredients, tools, info, difficulty, Rtime, icon)
VALUES("Meaty Bean Burrito", "Burrito", "Refried beans, Cheese, taco sauce, tortilla, ground beef", "Medium pot, spoon, can opener", "Meaty simple burritos", 1, 25, "https://cdn.discordapp.com/attachments/575621658082148352/575624691012730891/kebab.png");
INSERT Into Recipe (Rname, category, total_ingredients, tools, info, difficulty, Rtime, icon)
VALUES("Bland Brussel Sprouts", "Vegetables", "Brussel Sprouts", "knife, cutting board, spatula, medium pan", "just toss em on there and cook em", 1, 15, "https://cdn.discordapp.com/attachments/575621658082148352/575624757253373968/salad.png");
INSERT Into Recipe (Rname, category, total_ingredients, tools, info, difficulty, Rtime, icon)
VALUES("Tofu Fried Rice", "Rice", "Tofu, Egg, Brown Rice, Soy Sauce, Spinach, Peas", " spatula, medium pan, rice cooker, knife, cutting board", "If you like rice, but like tofu", 2, 35, "https://cdn.discordapp.com/attachments/575621658082148352/575624729596002334/rice.png");
INSERT Into Recipe (Rname, category, total_ingredients, tools, info, difficulty, Rtime, icon)
VALUES("Cheese Stuffed Meatballs", "Meatballs", "Ground Beef, Bread Crumbs, Mozzarella Cheese, onion powder, garlic powder, red pepper flakes", " big bowl, sheet pan, oven, non-stick spray, cutting board, knife", "let it rest they can burn ya", 3, 65, "https://cdn.discordapp.com/attachments/575621658082148352/575624743068237825/meat.png");

-- Making the Gluten-Free Vegan Pancakes recipe --
INSERT Into Recipe (Rname, category, total_ingredients, tools, info, difficulty, Rtime, icon)
VALUES("Allergy-Friendly Pancakes", "Pancakes", "gluten-free all-purpose flour, ground flaxseed, baking powder, ground cinnamon, salt, maple syrup, vanilla, unsweetened applesauce, almond milk", " medium mixing bowl, griddle, spoon, non-stick spray, spatula", "Pancakes that can be good to anyone", 3, 10, "https://cdn.discordapp.com/attachments/575621658082148352/575624709979373599/pancakes.png");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575622306727198720/ChefUpNAFP1.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575622418673041408/ChefUpNAFP2.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575622453217329162/ChefUpNAFP3.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575622496397819904/ChefUpNAFP4.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575622540647464970/ChefUpNAFP5.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575622591771967488/ChefUpNAFP6.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575622653289824257/ChefUpNALF7.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575622720234979328/ChefUpNALF8.gif");

INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575622774987554816/ChefUpNALF9.gif");

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("none", "non-stick spray, griddle", "Spray the griddle, you can also use a medium pan instead of a griddle.", 1, 11, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("none", "griddle", "Turn griddle or stove on medium heat.", 2, 12, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("gluten-free all-purpose flour, ground flaxseed, baking powder, cinnamon, and salt", "medium mixing bowl, spoon", "Mix gluten-free all-purpose flour, ground flaxseed, baking powder, ground cinnamon, and salt in a bowl.", 3, 13, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("maple syrup, vanilla, unsweetened applesauce, almond milk", "medium mixing bowl, spoon", "Mix maple syrup, vanilla, unsweetened applesauce, and almond milk in a separate bowl.", 4, 14, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("maple syrup, vanilla, unsweetened applesauce, almond milk, gluten-free all-purpose flour, ground flaxseed, baking powder, cinnamon, and salt", "medium mixing bowl, spoon", "Slowly mix the liquid ingredients into the dry ingredients.  Do about 1/4 cup at a time.  Stir and make sure there are no clumps.  This creates the pancake batter.", 5, 15, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("batter", "spoon, griddle", "Pour about 1/4 cup of batter for each pancake onto the griddle", 6, 16, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("batter", "griddle, spatula", "Cook for a minute and a half until they bubble around the edges. Then flip with a spatula", 7, 17, 90);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("batter", "griddle, spatula", "Cook for a minute and a half then remove from the griddle with a spatula", 8, 18, 90);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("pancake", "plate", "Put pancake(s) onto plate and serve", 9, 19, 0);

INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(7, 5);

INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(7, 6);

INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(7, 7);

INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(7, 8);

INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(7, 9);

INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(7, 10);

INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(7, 11);

INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(7, 12);

INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(7, 13);

INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(7, 14);

INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(7, 15);

INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(7, 8);

INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(7, 9);

INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(7, 10);

INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(7, 11);

INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(7, 12);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(7, 10);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(7, 11);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(7, 12);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(7, 13);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(7, 14);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(7, 15);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(7, 16);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(7, 17);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(7, 18);

SELECT * FROM Food;

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(10, 16);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(11, 16);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(12, 5);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(12, 6);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(12, 7);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(12, 8);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(12, 9);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(13, 10);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(13, 11);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(13, 12);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(13, 13);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(14, 10);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(14, 11);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(14, 12);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(14, 13);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(15, 14);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(16, 14);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(17, 14);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(18, 15);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(10, 12);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(10, 8);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(11, 8);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(12, 9);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(12, 2);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(13, 9);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(13, 2);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(14, 9);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(14, 2);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(15, 2);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(15, 8);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(16, 8);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(16, 11);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(17, 8);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(17, 11);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(18, 5);

INSERT Into Food_Ammounts(Recipeid, Foodid, size, unit)
VALUES(7, 5, 0.5, "cups");

INSERT Into Food_Ammounts(Recipeid, Foodid, size, unit)
VALUES(7, 6, 0.5, "tablespoons");

INSERT Into Food_Ammounts(Recipeid, Foodid, size, unit)
VALUES(7, 7, 1, "teaspoons");

INSERT Into Food_Ammounts(Recipeid, Foodid, size, unit)
VALUES(7, 8, 1, "teaspoons");

INSERT Into Food_Ammounts(Recipeid, Foodid, size, unit)
VALUES(7, 9, 0.125, "teaspoons");

INSERT Into Food_Ammounts(Recipeid, Foodid, size, unit)
VALUES(7, 10, 1, "tablespoons");

INSERT Into Food_Ammounts(Recipeid, Foodid, size, unit)
VALUES(7, 11, 0.5, "teaspoons");

INSERT Into Food_Ammounts(Recipeid, Foodid, size, unit)
VALUES(7, 12, 0.125, "tablespoons");

INSERT Into Food_Ammounts(Recipeid, Foodid, size, unit)
VALUES(7, 13, 0.5, "cups");

INSERT INTO Diet(Dname, info)
VALUES("None", "This food doesn't meet any current implemented dietary restrictions");

INSERT INTO Diet(Dname, info)
VALUES("Vegan", "No products produced by animals may be consumed");

INSERT INTO Diet(Dname, info)
VALUES("Gluten-free", "No consuming of products that contain gluten");

INSERT INTO Diet(Dname, info)
VALUES("Lacto-Ovo Vegetarian", "Vegetarians who consume dairy and eggs");

INSERT INTO Diet(Dname, info)
VALUES("Lacto Vegetarian", "Vegetarians who consume dairy, but not eggs");

INSERT INTO Diet(Dname, info)
VALUES("Ovo Vegetarian", "Vegetarians who consume eggs, but notdairy");

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(3, 1);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(6, 1);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(4, 2);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(7, 2);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(4, 3);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(7, 3);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(1, 4);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(2, 4);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(4, 4);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(5, 4);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(7, 4);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(1, 5);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(4, 5);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(7, 5);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(4, 6);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(5, 6);

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(7, 6);

-- Bland Brussel Sprouts --
-- 20 -- 
INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575596957565976597/ChefUpBB1.gif");

-- 21 --
INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575596997193498624/ChefUpBB2.gif");

-- 22 --
INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575597054886281248/ChefUpBB3O.gif");

-- 23 --
INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575597099446566913/ChefUpBB4O.gif");

-- 24 --
INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575597159202684948/ChefUpBB5O.gif");

-- 25 --
INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575597215481856011/ChefUpBB6.gif");

-- Starts at 20 for gifid -- 
INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("brussel sprouts", "cutting board, knife", "Cut the brussel sprouts in half", 1, 20, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("none", "stove", "turn stove on medium", 2, 21, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("brussel sprouts", "stove, medium skillet", "put a medium skillet on the stove and place the brussel sprouts on it", 3, 22, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("brussel sprouts", "stove, medium skillet", "let brussel sprouts cook for about 6 minutes", 4, 23, 360);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("brussel sprouts", "stove, medium skillet, tongs", "flip all the brussel sprouts over and cook for 5 more minutes", 5, 24, 300);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("brussel sprouts", "stove, medium skillet, tongs", "serve, by putting on a plate", 6, 25, 0);

INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(4, 17);

-- cutting board -- 
INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(4, 13);

-- medium skillet --
INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(4, 14);

-- stove --
INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(4, 4);

-- knife --
INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(4, 7);

-- tongs --
INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(4, 15);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(19, 17);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(20, 16);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(21, 17);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(22, 17);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(23, 17);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(24, 17);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(19, 13);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(19, 7);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(20, 4);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(21, 4);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(21, 14);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(22, 4);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(22, 14);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(23, 4);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(23, 14);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(23, 15);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(24, 4);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(24, 14);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(24, 15);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(4, 19);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(4, 20);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(4, 21);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(4, 22);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(4, 23);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(4, 24);

INSERT Into Food_Ammounts(Recipeid, Foodid, size, unit)
VALUES(4, 17, 4, "sprouts");

INSERT Into Recipe (Rname, category, total_ingredients, tools, info, difficulty, Rtime, icon)
VALUES("Coffee with a Keurig", "Coffee", "water, k-cup", "keurig, mug", "Coffee, but easier", 1, 3, "https://cdn.discordapp.com/attachments/575621658082148352/575624668971794432/coffee-maker.png");

-- 26 --
INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575602754500821012/ChefUpK1.gif");

-- 27 --
INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575602818358968330/ChefUpK2O.gif");

-- 28 --
INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575602854140837888/ChefUpK3.gif");

-- 29 --
INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575602901507112990/ChefUpK4.gif");

-- 30 --
INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575602967080599552/ChefUpK5.gif");

-- 31 --
INSERT INTO Gifs(url)
VALUES("https://cdn.discordapp.com/attachments/575596237957496856/575603011057876992/ChefUpK6.gif");

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("none", "keurig", "turn on the keurig", 1, 26, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("water", "mug", "fill a mug with water", 2, 27, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("water", "mug, keurig", "pour the water into the top of the keurig", 3, 28, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("k-cup", "keurig", "put the k-cup into the k-cup holder", 4, 29, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("none", "keurig", "let the water drain, close the lid, and hit BREW", 5, 30, 0);

INSERT Into Steps(ingredients, tools, content, Sorder, gifid, seconds)
VALUES("coffee", "keurig, mug", "wait for the coffee to finish pouring out, and enjoy", 6, 31, 0);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(8, 25);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(8, 26);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(8, 27);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(8, 28);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(8, 29);

INSERT Into Recipe_Steps(Recipeid, Stepid)
VALUES(8, 30);

-- water -- 
INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(8, 18);

-- k-cup -- 
INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(8, 19);

-- coffee -- 
INSERT Into Recipe_Food(Recipeid, Foodid)
VALUES(8, 20);

-- keurig -- 
INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(8, 16);

-- mug -- 
INSERT Into Recipe_Tools(Recipeid, Toolsid)
VALUES(8, 17);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(25, 16);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(26, 18);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(27, 18);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(28, 19);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(29, 16);

INSERT Into Food_Steps(Stepid, Foodid)
VALUES(30, 20);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(25, 16);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(26, 17);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(27, 17);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(27, 16);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(28, 16);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(29, 16);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(30, 16);

INSERT Into Tools_Steps(Stepid, Toolsid)
VALUES(30, 17);

INSERT Into Food_Ammounts(Recipeid, Foodid, size, unit)
VALUES(8, 19, 1, " ");

-- NEED DIETS FOR EVERY recipe 8+ 
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(8, 2); 

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(8, 3); 

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(8, 4); 

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(8, 5); 

INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(8, 6);

INSERT Into Recipe (Rname, category, total_ingredients, tools, info, difficulty, Rtime, icon)
VALUES("Eggy Breakfast Burrito", "Burrito", "eggs, tortilla, cheese, milk, store-bought salsa", "spatula, medium skillet, stove, plate", "Nothing but egg", 2, 15, "https://cdn.discordapp.com/attachments/575621658082148352/575624691012730891/kebab.png");
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(9, 4);

INSERT Into Recipe (Rname, category, total_ingredients, tools, info, difficulty, Rtime, icon)
VALUES("Just Spinach Salad", "Salad", "spinach", "bowl", "Its just spinach", 1, 1, "https://cdn.discordapp.com/attachments/575621658082148352/575944776508112907/Fullsalad.png");
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(10, 2);
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(10, 3);
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(10, 4);
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(10, 5);
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(10, 6);

INSERT Into Recipe (Rname, category, total_ingredients, tools, info, difficulty, Rtime, icon)
VALUES("Mama T's Homemade Fries", "French Fries", "potatoes, garlic powder, onion powder, olive oil, water", "cutting board, stove, medium pot, baking sheet, knife, oven, foil", "My mom tries to make french fries healthy", 3, 35, "https://cdn.discordapp.com/attachments/575621658082148352/575944788851949579/fries.png");
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(11, 2);
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(11, 3);
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(11, 4);
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(11, 5);
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(11, 6);

INSERT Into Recipe (Rname, category, total_ingredients, tools, info, difficulty, Rtime, icon)
VALUES("Spicy Red Pepper Spaghetti", "Pasta", "spaghetti, crushed red pepper flakes, tomato sauce. water", "medium pot, colander, spoon", "Someone really likes crushed red pepper", 2, 20, "https://cdn.discordapp.com/attachments/575621658082148352/575944820183400455/spaguetti.png");
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(12, 2);
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(12, 4);
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(12, 5);
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(12, 6);

INSERT Into Recipe (Rname, category, total_ingredients, tools, info, difficulty, Rtime, icon)
VALUES("Buttery Corn", "Corn", "corn, butter, water", "medium pot, tongs, knife", "Boiling corn!", 1, 15, "https://cdn.discordapp.com/attachments/575621658082148352/575944807105560576/corn.png");
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(13, 2);
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(13, 3);
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(13, 4);
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(13, 5);
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(13, 6);

INSERT Into Recipe (Rname, category, total_ingredients, tools, info, difficulty, Rtime, icon)
VALUES("Chili Cheese Frozen Fries", "French Fries", "frozen store bought french fries, store bought chili, cheese", "baking sheet, can opener", "The easiest chili cheese fries you can make", 1, 45, "https://cdn.discordapp.com/attachments/575621658082148352/575944788851949579/fries.png");
INSERT INTO Recipe_Diets(Recipeid, Dietid)
VALUES(14, 1);