import { SaleData } from "@/types";

//공통된 부분을 함수로 설정하여 call하는 방식으로 수정 
async function fetchData(url:string) {
    try {
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('fetch 오류');
        }

        const data = await response.json();

        return data.documents;
        
    } catch (error){
        console.log(error);
        return [];
    }
}


export async function fetchSales(q?:string):Promise<SaleData[]> {

    let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/sales`;
    if (q) {
        apiUrl += `?q=${q}`;
    }
    return fetchData(apiUrl);
    // try {
        
    //     const response = await fetch(apiUrl);
    //     if (!response.ok) {
    //         throw new Error('fetch 오류');
    //     }

    //     const data = await response.json();

    //     return data.documents;
        
    // } catch (error){
    //     console.log(error);
    //     return [];
    // }
    
}

export async function fetchRecentSales(): Promise<SaleData[]> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/sales/recent`;
    return await fetchData(apiUrl);
    // try {
        
    //     const response = await fetch(apiUrl);
    //     if (!response.ok) {
    //         throw new Error('fetch 오류');
    //     }

    //     const data = await response.json();

    //     return data.documents;
        
    // } catch (error){
    //     console.log(error);
    //     return [];
    // }
}

export async function fetchSaleById(id: number): Promise<SaleData[]> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/sales/${id}`;
    return fetchData(apiUrl);
    // try {
        
    //     const response = await fetch(apiUrl);
    //     if (!response.ok) {
    //         throw new Error('fetch 오류');
    //     }

    //     const data = await response.json();

    //     return data.documents;
        
    // } catch (error){
    //     console.log(error);
    //     return [];
    // }
}
