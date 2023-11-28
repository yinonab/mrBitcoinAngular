export interface Contact {
    name: string,
    email: string,
    phone: string,
    coins: number,
    moves?: Transactions[]
    _id: string,
}
export interface ContactFilter {
    term: string
}
export interface Transactions {
    from: string;
    to: string;
    coins: number;
    at: Date
}