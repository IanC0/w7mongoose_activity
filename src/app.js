require("./db/connection");
const mongoose = require("mongoose");
const yargs = require("yargs");
const { addMovie, listMovie, deleteMovie, updateMovie, searchMovie, filterMovie } = require("./movie/methods");

const app = async (yargsObj) => {
    try {
        if (yargsObj.add) {
            //add movie function that takes yargsObj terminal input
            await addMovie({
                title: yargsObj.title,
                actor: yargsObj.actor,
                year: yargsObj.year
            });
            console.log(`Successfully added ${yargsObj.title}`)
        } else if (yargsObj.list) {
            //list movies from database
            await listMovie()
        } else if (yargsObj.update) {
            //update movies with filterObj and updateObj
            await updateMovie(yargsObj)
            console.log("Movie successfully updated")
        } else if (yargsObj.delete) {
            //delete movie with filterObj
            await deleteMovie({title: yargsObj.title})            
        } else if (yargsObj.searchTitle) {
            //search using regex
            await searchMovie(yargsObj)
        } else if (yargsObj.filter) {
            //filter by rating 
            await filterMovie(yargsObj)
        
         
        } else {
            console.log("Incorrect command")
        }
        await mongoose.disconnect()
    } catch (error) {
        console.log(error);
        await mongoose.disconnect()
    }
}

app(yargs.argv)