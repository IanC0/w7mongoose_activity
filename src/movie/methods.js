const { modelName } = require("./model");
const Movie = require("./model");

exports.addMovie = async (movieObj) => {
    try {
        await Movie.create(movieObj);
    } catch (error) {
        console.log(error);
    }
}

exports.listMovie = async () => {
    try {
        const search = await Movie.find({});
        console.log(search)
    } catch (error) {
        console.log(error)
    }
}

exports.updateMovie = async(movieObj) => {
    try {
         await Movie.findOneAndUpdate({title: movieObj.title}, {
             title: movieObj.newTitle, 
             actor: movieObj.newActor, 
             year: movieObj.newYear,
             rating: movieObj.newRating})
    } catch (error) {
        console.log(error)
    }
}

exports.deleteMovie = async (movieObj) => {
    try {
        await Movie.deleteOne({title: movieObj.title})
        console.log(`${movieObj.title} has been deleted`)
    } catch (error) {
        console.log(error)
    }           
}

exports.searchMovie = async (movieObj) => {
    try {
        const results = await Movie.find({title: {$regex: movieObj.searchTitle, $options: 'g,i'}})
        console.log(results)
    } catch (error) {
        console.log(error)
    }
}

exports.filterMovie = async (movieObj) => {
    try {
        const results = await Movie.find({rating: movieObj.rating})
        console.log("results are " + results)
    } catch (error) {
        console.log(error)
    }
}