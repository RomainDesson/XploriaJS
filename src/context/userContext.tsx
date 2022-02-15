import React, { createContext } from "react";

export const SET_USER = "SET_USER";

type Action =
    | { type: "SET_USER"; payload: UserType }
    | { type: "ADD_WOOD"; payload: number }
    | { type: "ADD_MINERALS"; payload: number }
    | { type: "ADD_FOOD"; payload: number }
    | { type: "IMPROVE_LUMBERING"; payload: number };
type Dispatch = (action: Action) => void;
type State = { user: UserType };
type CountProviderProps = { children: React.ReactNode };

type RoleType = {
    description: string;
    id: number;
    name: string;
    type: string;
};

export type UserType = {
    blocked: boolean | null;
    confirmed: boolean;
    created_at: string;
    email: string;
    id: number;
    provider: string;
    role: RoleType;
    updated_at: string;
    username: string;
    wood: number;
    lumberingSpeed: number;
    minerals: number;
    miningSpeed: number;
    food: number;
    farmingSpeed: number;
};

export const initialState: UserType = {
    blocked: null,
    confirmed: false,
    created_at: "",
    email: "",
    id: 0,
    provider: "",
    role: {
        description: "",
        id: 0,
        name: "",
        type: "",
    },
    updated_at: "",
    username: "",
    wood: 0,
    lumberingSpeed: 1,
    minerals: 0,
    miningSpeed: 1,
    food: 0,
    farmingSpeed: 1,
};

export const UserContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

export const userReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case SET_USER:
            return {
                user: action.payload,
            };
        case "ADD_WOOD":
            return {
                user: {
                    ...state.user,
                    wood: state.user.wood + action.payload,
                },
            };
        case "IMPROVE_LUMBERING":
            return {
                user: {
                    ...state.user,
                    lumberingSpeed: action.payload,
                    wood: state.user.wood - 50,
                },
            };
        case "ADD_MINERALS":
            return {
                user: {
                    ...state.user,
                    minerals: state.user.minerals + action.payload,
                },
            };
        case "ADD_FOOD":
            return {
                user: {
                    ...state.user,
                    food: state.user.food + action.payload,
                },
            };
        default:
            return state;
    }
};

export const UserProvider = ({ children }: CountProviderProps) => {
    const [state, dispatch] = React.useReducer(userReducer, { user: initialState });

    const value = { state, dispatch };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
