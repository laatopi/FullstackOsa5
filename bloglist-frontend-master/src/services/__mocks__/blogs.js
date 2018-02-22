let token = null

const blogs = [
    {
        _id: "5a899116a364382d8156e64d",
        title: "Vienin seikkailut",
        author: "Martti",
        url: "ww.höbö.fi",
        likes: 1,
        user: {
            _id: "5a897c30a364382d8156e64a",
            username: "reima",
            name: "jakob"
        },
    },
    {
        _id: "5a899183a364382d8156e64e",
        title: "Reikäjuusto",
        author: "taneli",
        url: "www.Jebou.com",
        likes: 0,
        user: {
            _id: "5a897c30a364382d8156e64a",
            username: "reima",
            name: "jakob"
        },
    },
    {
        _id: "5a89961ca364382d8156e650",
        title: "janna",
        author: "maura",
        url: "sveitsi",
        likes: 8,
        user: {
            _id: "5a897c30a364382d8156e64a",
            username: "reima",
            name: "jakob"
        },
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs }