import { GET_BAGRUTS } from "../actions/bagruts/types";

const initialState = {
    bagruts: [],
    psychometry: [
        {
            SubjectID: 1,
            SubjectName: "כללי"
        },
        {
            SubjectID: 2,
            SubjectName: "כמותי"
        },
        {
            SubjectID: 3,
            SubjectName: "מילולי"
        },
        {
            SubjectID: 4,
            SubjectName: "אנגלית"
        },

    ],
    SCOOPS: {
        BAGRUT: 'Bagrut',
        PSYCHOMETRY: 'Psychometry',
    }
}

export default (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case GET_BAGRUTS:
            return {
                ...state,
                bagruts: payload.items
            }

        default:
            return state;
    }
}