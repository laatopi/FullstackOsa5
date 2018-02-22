const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const actionFor = {
    anecdoteVote(id) {
        return {
            type: 'VOTE_ANECDOTE',
            data: { id }
        }
    },
    anecdoteCreation(content) {
        return {
            type: 'NEW_ANECDOTE',
            data: {
                content,
                id: generateId(),
                votes: 0
            }
        }
    }
}

export default actionFor