import { Dispatch, SetStateAction, useState } from "react"
type IResponse<T> = [
    T,
    Dispatch<SetStateAction<T>>
]
function usePersistedState<T>(key: string, initialState: T): IResponse<T> {
    const [state, setState] = useState(initialState)

    return [state, setState]
}

export default usePersistedState
