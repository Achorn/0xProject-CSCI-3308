#!/usr/bin/python
# -*- coding: utf-8 -*-

import re
import psycopg2

if __name__ == "__main__":

    fileObj = open("RecipesFinal.csv" , "r")
    print "Name of the file: ", fileObj.name, "\n"
    cleaningCrew = ('"', '½', '¼', "tsp.", "tbsp.", "divided", "about", "lb.",
     "skin-on", "plus", "scrubbed", "cups", "small", "piece", "more", "tied", "-", "freshly",
     "peeled", "master", "cup", "coarsely", "chopped", "flaky", "for", "serving", "and", "or",
     "and/or", "thighs", "red", "covered", "chilled", "pint", "halved", "preferably",
     "day-old", "coarsely", "torn", "slices", "room temperature", "large", "medium", "⅓", "plain",
     "finely", "grated", "black", "ripe", "some", "cut", "into", "wedges", "thinly", "sliced",
     "oz.", "cored", "very", "planks", "thick", "patted", "dry", "drizzling", "pan", "optional",
     "drained", "broken", "package", "finely", "trimmed", "deveined", "¾", "–", "ange", "/")

    with fileObj as f:
        data = f.readlines()


    try:
        connection = psycopg2.connect(user = "fjstinar",
                                      password = "3eefumeFa!",
                                      host = "localhost",
                                      dbname = "recipedb")

        connection.autocommit = True
        cursor = connection.cursor()
        print( connection.get_dsn_parameters(), "\n")

        cursor.execute("SELECT version();")
        record = cursor.fetchone()
        print("You are connected to - ", record, "\n")


        for j in data:
            count = 0
            recipe = j.split(",")
            recipeName = ""
            ingredients = []
            ingredientsString = "("
            for i in recipe:
                start = i.find('(')
                end = i.find(')')
                if start != -1 and end != -1:
                    i = i[start+1:end]
                i = i.lower()
                i = re.sub('\d', '', i)
                for cleaner in cleaningCrew:
                    i = i.replace(cleaner, "")
                i = i.strip()
                if count != 0:
                    if i.isspace() == False:
                        ingredients.append(i)
                if count == 0:
                    recipeName = i
                count = count + 1
            for i in ingredients:
                ingredientsString = ingredientsString + i + ','
            ingredientsString = ingredientsString + ')'
            data = [recipeName, ingredientsString]
            #print data
            query = ("INSERT INTO recipes (rname, ingredients) VALUES (%s, %s)")
            #print recipeName
            cursor.execute(query, data)
            x = cursor.execute("SELECT * FROM recipes;")
            print x
                #print i

    except (Exception, psycopg2.Error) as error:
        print ("Error while connecting to PostgreSQL", error)
    print 'inside main'
