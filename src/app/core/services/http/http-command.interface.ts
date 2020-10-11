export interface HttpCommand { 
    apiUrl: string; 
    httpMethod: "POST" | "PUT" | "DELETE"; 
    httpBody: any; 
    cancelMessage?: string; 
};