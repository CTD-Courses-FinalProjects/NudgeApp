const notFound = (req, res) => {
    const url = req.url;
    res.status(404).redirect('/not-found' + `?page=${url}`)
}

module.exports = notFound
