axios = require('axios')
exports.getAll = async function (req, res, next) {
    try {
        axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=851fa49cfa794814a97a4869fd4bcf69')
            .then(function (response) {
                // handle success
                console.log(response.data.articles[1].content);
                var content = response.data.articles[1].content
                return res.status(200).json({ status: 200, content: content, message: "Order Placed", error: null })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    } catch (err) {
        throw err
    }
}