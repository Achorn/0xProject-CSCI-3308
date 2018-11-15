#include <iostream>
#include <sstream>
#include <fstream>
#include <vector>
#include <string>
#include <sql.h>


int main(){

  std::ifstream inputFile("Recipes.csv");
  std::vector<std::string> temp;
  std::vector<std::string> fullRecipes;
  std::string line;
  char * sql;

  //Loop that inputs recipes into the database
  while(getline(inputFile, line)){
    std::string tempString = "";
    for(int i = 0; i < line.length(); i++){
      if(line[i] == ','){
        fullRecipes.push_back(tempString);
        tempString = "";
      } else{
        tempString += line[i];
      }
    }

    int recipeArraySize = fullRecipes.size()-1;
    std::string ingredients[recipeArraySize];

    //Puts ingredients into separate ingredients array
    //This prepares to ingredients to be input into the db
    for(int i = 0 ; i < recipeArraySize; i++){
      ingredients[i] = fullRecipes[i+1];
    }




    fullRecipes.clear();
  }
  return 0;
}
