export interface SearchBarConfig{
    searchCallback: (val: string) => void, 
    initialValue?: string,
    placeholder: string
}