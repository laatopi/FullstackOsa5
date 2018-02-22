import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0,
        altogether: 0
    }

    const goodAction = { type: 'GOOD' }
    const okAction = { type: 'OK' }
    const badAction = { type: 'BAD' }

    it('should return a proper initial state when called with undefined state', () => {
        const state = {}
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = counterReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })

    it('good is incremented', () => {
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, goodAction)
        expect(newState).toEqual({
            good: 1,
            ok: 0,
            bad: 0,
            altogether: 1
        })
    })

    it('ok is incremented', () => {
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, okAction)
        expect(newState).toEqual({
            good: 0,
            ok: 1,
            bad: 0,
            altogether: 1,
        })
    })

    it('bad is incremented', () => {
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, badAction)
        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 1,
            altogether: 1
        })
    })

})